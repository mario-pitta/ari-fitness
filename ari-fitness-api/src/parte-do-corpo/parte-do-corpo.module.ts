/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ParteDoCorpoController } from './parte-do-corpo.controller';
import { DataBaseModule } from 'src/datasource/database.module';
import { ParteDoCorpoService } from './parte-do-corpo.service';

@Module({
  controllers: [ParteDoCorpoController],
  providers: [ParteDoCorpoService],
  imports: [DataBaseModule],
})
export class ParteDoCorpoModule {}
