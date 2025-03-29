import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { DataBaseModule } from 'src/datasource/database.module';

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService],
    imports:[DataBaseModule],
    exports: [UsuarioService],
})
export class UsuarioModule {};