/* eslint-disable prettier/prettier */
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';

const rootDir = __dirname;
const publicDir = '/public';
const indexPath = 'index.html';
const _indexPath = path.join(rootDir, publicDir, indexPath)
console.log(_indexPath)

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render(_indexPath)
  async getHello() {
    console.log("chegou no root para renderizar o index......");
    return;
  }
}
