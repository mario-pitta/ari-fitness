import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DataBaseModule } from 'src/datasource/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
