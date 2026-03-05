/* eslint-disable prettier/prettier */
import { Controller, Post, Get, UseInterceptors, UploadedFile, Query, Res, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportExportService } from './import-export.service';
import { Response } from 'express';

@Controller('usuario')
export class ImportExportController {
    constructor(private importExportService: ImportExportService) { }

    @Post('import')
    @UseInterceptors(FileInterceptor('file'))
    async importStudents(
        @UploadedFile() file: Express.Multer.File,
        @Query('empresaId') empresaId: string,
    ) {
        return this.importExportService.importStudents(file.buffer, empresaId);
    }

    @Get('mappings')
    async getMappings(
        @Query('empresaId') empresaId: string,
    ) {
        return this.importExportService.getMappings(empresaId);
    }

    @Post('batch-create')
    async batchCreate(
        @Query('empresaId') empresaId: string,
        @Body() body: { students: any[] },
    ) {
        return this.importExportService.batchCreate(body.students, empresaId);
    }

    @Get('export')
    async exportStudents(
        @Query('empresaId') empresaId: string,
        @Res() res: Response,
    ) {
        const buffer = await this.importExportService.exportStudents(empresaId);

        res.set({
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition': 'attachment; filename="alunos.xlsx"',
            'Content-Length': buffer.length,
        });

        res.end(buffer);
    }
}
