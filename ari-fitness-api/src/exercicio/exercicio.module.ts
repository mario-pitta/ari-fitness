import { Module } from '@nestjs/common';
import { ExercicioController } from './exercicio.controller';
import { DataBaseModule } from 'src/datasource/database.module';
import { ExercicioService } from './exercicio.service';

@Module({
  controllers: [ExercicioController],
  providers: [ExercicioService],
  imports: [DataBaseModule],
})
export class ExercicioModule {}
