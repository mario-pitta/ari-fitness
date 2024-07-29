/* eslint-disable prettier/prettier */


import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/datasource/database.service';
import { TipoUsuario } from './TipoUsuario.interface';

@Injectable()
export class TipoUsuarioService {

    constructor(private database: DataBaseService){}

    async findAll(filter: TipoUsuario | Partial<TipoUsuario> ) {
        console.log("vai no banco buscar tipo_usuario")
        
        return await this.database.supabase.from('tipo_usuario').select('*').match({...filter})
    }
}
