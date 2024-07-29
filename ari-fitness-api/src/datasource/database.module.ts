/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DataBaseController } from './database.controller';
import { DataBaseService } from './database.service';

@Module({
  imports: [],
  controllers: [DataBaseController],
  providers: [DataBaseService],
  exports: [DataBaseService]
})
export class DataBaseModule {}
