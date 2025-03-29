/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';
import { Empresa } from './empresa.interface';
import { StorageService } from 'src/datasource/storage.service';
import { PostgrestSingleResponse } from '@supabase/supabase-js';


@Injectable()
export class EmpresaService {
  constructor(
    private readonly databaseService: DataBaseService,
    private readonly storageService: StorageService,
  ) {}
  async getEmpresa(empresaId: string): Promise<PostgrestSingleResponse<Empresa>>{
    console.log('empresaId: ', empresaId);
    return await this.databaseService.supabase
      .from('empresa')
      .select(
        `
          *,
          horarios(*),
          planos(*)
        `,
      )
      .eq('id', empresaId)
      .single();
  }

  async createEmpresa(empresa: Empresa) {
    try {
      const logo = empresa.logo_url;
      const banner = empresa.banner_url;
      const enderecos = empresa.enderecos;
      const horarios = empresa.horarios;
      const planos = empresa.planos;

      delete empresa.logo_url;
      delete empresa.banner_url;
      delete empresa.enderecos;
      delete empresa.horarios;
      delete empresa.planos;

      return await this.databaseService.supabase
        .from('empresa')
        .insert(empresa)
        .then(async (res) => {
          if (res.error) {
            throw res.error;
          }

          if (!logo && !banner) {
            return res;
          }

          const empresaId =
            res.data && res.data[0] ? res.data[0]['id'] : undefined;

          if (!empresaId) {
            throw new Error('Empresa não encontrada');
          }

          if (logo) {
            empresa.logo_url = await this.storageService
              .uploadImage('empresalogo', 'logo_' + empresaId, logo)
              .then((res) => res?.fullPath);
          }

          if (banner) {
            empresa.banner_url = await this.storageService
              .uploadImage('empresabanner', 'banner_' + empresaId, banner)
              .then((res) => res?.fullPath);
          }

          // TODO criar tabela de endereco */
          // if (enderecos) {
          //   this.databaseService.supabase
          //     .from('enderecos')
          //     .insert(enderecos)
          // }

          if (horarios) {
            await this.databaseService.supabase.from('horarios').insert(
              horarios.map((horario) => ({
                ...horario,
                empresa_id: empresaId,
              })),
            );
          }

          if (planos) {
            await this.databaseService.supabase.from('planos').insert(
              planos.map((plano) => ({
                ...plano,
                empresa_id: empresaId,
              })),
            );
          }

          return this.databaseService.supabase
            .from('empresa')
            .update(empresa)
            .eq('id', empresaId);
        });
    } catch (error) {
      throw error;
    }
  }

  async updateEmpresa(empresa: Empresa) {
    const logo = empresa.logo_url;
    const banner = empresa.banner_url;
    const enderecos = empresa.enderecos;
    const horarios = empresa.horarios;
    const planos = empresa.planos;

    delete empresa.logo_url;
    delete empresa.banner_url;
    delete empresa.enderecos;
    delete empresa.horarios;
    delete empresa.planos;
    //delete oldFiles
    const deleteFile = async (bucketName: string, path: string) => {
      return await this.storageService.deleteFileFromBucket(bucketName, path);
    };

    try {
      if (logo && logo.indexOf('base64') > -1) {
        await deleteFile('empresalogo', 'logo_' + empresa.id);
        const logo_url = await this.storageService
          .uploadImage('empresalogo', 'logo_' + empresa.id, logo)
          .then((res) => res?.fullPath);

        empresa.logo_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${logo_url}`;
      }

      if (banner && banner.indexOf('base64') > -1) {
        await deleteFile('empresabanner', 'banner_' + empresa.id);
        const banner_url = await this.storageService
          .uploadImage('empresabanner', 'banner_' + empresa.id, banner)
          .then((res) => res?.fullPath);
        empresa.banner_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${banner_url}`;
      }

      // if (enderecos) {
      //   await this.databaseService.supabase
      //     .from('enderecos')
      //     .update(enderecos)
      //     .eq('empresa_id', empresa.id);
      // }

      if (horarios) {
        console.log('vai salvar os horarios');

        horarios.map((p) => {
          if (!p.id) delete p.id;

          p.empresa_id = empresa.id;
          return p;
        });

        await this.databaseService.supabase
          .from('horarios')
          .upsert(horarios)
          .then((res) => {
            if (res.error) {
              throw res.error;
            }

            return res;
          });
      }

      if (planos) {
        console.log('vai salvar os planos');

        const newPlans = planos.filter((p) => !p.id);
        if (newPlans.length > 0) {
          const { data, error } = await this.databaseService.supabase
            .from('planos')
            .insert(
              newPlans.map((plano) => {
                console.log('plano: ', plano);
                delete plano.id;
                plano.empresa_id = empresa.id;
                console.log('plano: ', plano);
                return plano;
              }),
            );
          if (error) {
            throw new Error(error.message);
          }
        }

        planos.forEach(async (plano) => {
          const { error } = await this.databaseService.supabase
            .from('planos')
            .update(plano)
            .eq('id', plano.id)
            .select();
          if (error) {
            throw new Error(error.message);
          }
        });
      }

      return await this.databaseService.supabase
        .from('empresa')
        .update(empresa)
        .eq('id', empresa.id)
        .select();
    } catch (error) {
      throw error;
    }
  }
}

