/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';
import * as XLSX from 'xlsx';
import md5 = require('md5');

@Injectable()
export class ImportExportService {
    constructor(private database: DataBaseService) { }

    async getMappings(empresaId: string) {
        const { data: planos } = await this.database.supabase
            .from('planos')
            .select('id, descricao')
            .eq('empresa_id', empresaId)

        const { data: horarios } = await this.database.supabase
            .from('horarios')
            .select('id, hora_inicio, hora_fim')
            .eq('empresa_id', empresaId)

        return { planos: planos || [], horarios: horarios || [] };
    }

    async batchCreate(students: any[], empresaId: string) {
        const success = [];
        const errors = [];

        for (const student of students) {
            try {
                // 1. Check if user already exists by CPF
                const { data: existingUser } = await this.database.supabase
                    .from('usuario')
                    .select('id, flagAdmin, tipo_usuario')
                    .eq('cpf', student.cpf)
                    .single();

                const commonData = {
                    nome: student.nome,
                    whatsapp: student.whatsapp,
                    data_nascimento: student.data_nascimento,
                    genero: student.genero,
                    plano: student.plano,
                    horario_id: student.horario_id,
                    vencimento: student.vencimento,
                    peso: student.peso,
                    fumante: student.fumante,
                    dac: student.dac,
                    diabete: student.diabete,
                    avc: student.avc,
                    relato_dor: student.relato_dor,
                    fl_pratica_atividade_fisica: student.fl_pratica_atividade_fisica,
                    tipo_alimentacao: student.tipo_alimentacao,
                    objetivo: student.objetivo,
                    empresa_id: empresaId,
                    fl_ativo: true,
                };

                if (existingUser) {
                    // 2. Update existing user
                    // Protect ADM status: if existing user is ADM, we don't overwrite these flags
                    const updateData = { ...commonData };

                    const { error: updateError } = await this.database.supabase
                        .from('usuario')
                        .update(updateData)
                        .eq('id', existingUser.id);

                    if (updateError) {
                        errors.push({ row: student.nome, reason: updateError.message });
                    } else {
                        success.push({ nome: student.nome });
                    }
                } else {
                    // 3. Insert new student
                    const newData = {
                        ...commonData,
                        cpf: student.cpf,
                        flagAdmin: false,
                        tipo_usuario: 5, // Aluno
                        senha: student.senha || md5('123456'),
                        created_at: new Date(),
                    };

                    const { error: insertError } = await this.database.supabase
                        .from('usuario')
                        .insert(newData);

                    if (insertError) {
                        errors.push({ row: student.nome, reason: insertError.message });
                    } else {
                        success.push({ nome: student.nome });
                    }
                }
            } catch (e) {
                errors.push({ row: student.nome || 'Erro desconhecido', reason: e.message });
            }
        }

        return { success, errors };
    }

    async importStudents(buffer: Buffer, empresaId: string) {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const success: any[] = [];
        const errors: any[] = [];


        console.log('data = ', data)

        // Fetch mappings
        const { data: planos } = await this.database.supabase
            .from('planos')
            .select('id, descricao');

        const { data: horarios } = await this.database.supabase
            .from('horarios')
            .select('id, hora_inicio, hora_fim');

        const planoList = planos || [];
        const horarioList = horarios || [];

        for (const row of data as any[]) {
            try {
                const rowErrors = this.validateRow(row);
                if (rowErrors.length > 0) {
                    errors.push({ row: row.nome || 'Sem nome', reason: rowErrors.join(', ') });
                    continue;
                }

                const planoId = planoList.find(p => p.descricao?.toLowerCase() === row.plano?.toString().toLowerCase())?.id;
                const horarioId = horarioList.find(h => h.hora_inicio === row.horario?.toString())?.id;

                if (row.plano && !planoId) {
                    errors.push({ row: row.nome, reason: `Plano "${row.plano}" não encontrado.` });
                    continue;
                }

                if (row.horario && !horarioId) {
                    errors.push({ row: row.nome, reason: `Horário "${row.horario}" não encontrado. Formato esperado: HH:mm` });
                    continue;
                }

                const usuarioData = {
                    nome: row.nome,
                    cpf: row.cpf?.toString().replace(/\D/g, ''),
                    whatsapp: row.whatsapp?.toString().replace(/\D/g, ''),
                    empresa_id: empresaId,
                    plano: planoId,
                    horario_id: horarioId,
                    data_nascimento: row.data_nascimento ? new Date(row.data_nascimento) : null,
                    genero: row.genero || 'M',
                    fl_ativo: true,
                    flagAdmin: false,
                    tipo_usuario: 5, // Aluno
                    senha: md5('123456'),
                    created_at: new Date(),
                };

                const { error } = await this.database.supabase
                    .from('usuario')
                    .insert(usuarioData);

                if (error) {
                    errors.push({ row: row.nome, reason: error.message });
                } else {
                    success.push({ nome: row.nome });
                }
            } catch (e) {
                errors.push({ row: row.nome || 'Erro desconhecido', reason: e.message });
            }
        }

        return { success, errors };
    }

    async exportStudents(empresaId: string) {
        const { data: students, error } = await this.database.supabase
            .from('usuario')
            .select(`
        nome,
        cpf,
        whatsapp,
        data_nascimento,
        genero,
        planos (descricao),
        horarios (hora_inicio)
      `)
            .eq('empresa_id', empresaId)
            .eq('tipo_usuario', 5);

        if (error) throw error;

        const exportData = (students || []).map((s: any) => ({
            Nome: s.nome,
            CPF: s.cpf,
            WhatsApp: s.whatsapp,
            'Data de Nascimento': s.data_nascimento,
            Gênero: s.genero,
            Plano: s.planos?.descricao,
            Horário: s.horarios?.hora_inicio,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Alunos');

        return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }) as Buffer;
    }

    private validateRow(row: any): string[] {
        const errors = [];
        if (!row.nome) errors.push('Nome é obrigatório');
        if (!row.cpf) errors.push('CPF é obrigatório');
        return errors;
    }
}
