import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { DataBaseModule } from 'src/datasource/database.module';
import { ImportExportService } from './import-export.service';
import { ImportExportController } from './import-export.controller';

@Module({
    controllers: [UsuarioController, ImportExportController],
    providers: [UsuarioService, ImportExportService],
    imports: [DataBaseModule],
    exports: [UsuarioService, ImportExportService],
})
export class UsuarioModule { };