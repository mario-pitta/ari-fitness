/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { DataBaseModule } from 'src/datasource/database.module';
import { CategoriaService } from './categoria.service';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService],
  imports: [DataBaseModule],
})
export class CategoriaModule {}
