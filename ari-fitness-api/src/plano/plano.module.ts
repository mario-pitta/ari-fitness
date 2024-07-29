import { Module } from '@nestjs/common';
import { PlanoController } from './plano.controller';
import { PlanoService } from './plano.service';
import { DataBaseModule } from 'src/datasource/database.module';

@Module({
    controllers: [PlanoController],
    providers: [PlanoService],
    imports:[DataBaseModule]
})
export class PlanoModule {};