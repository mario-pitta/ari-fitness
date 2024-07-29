/* eslint-disable prettier/prettier */

import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Get('login')
  async login(
    @Query() query: { cpf: string; dataNascimento: string },
    @Res() res: Response,
  ) {
    console.log(query);
    return await this.auth
      .login(query.cpf, query.dataNascimento)
      .then((_res) => {
        if (_res.error)
          return res.status(400).send({ status: 500, ..._res.error }); //throw new Error(_res.error.message);

        console.log('vai retornar ok?: ', _res);
        return res.send(_res.data);
      });
  }
}