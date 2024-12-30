/* eslint-disable prettier/prettier */

import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Get('login')
  async login(
    @Query() query: { cpf: string; senha: string },
    @Res() res: Response,
  ) {
    console.log(query);
    return await this.auth
      .login(query.cpf, query.senha)
      .then((_res) => {
        if (_res.error)
          return res.status(400).send({ status: 500, ..._res.error }); //throw new Error(_res.error.message);

        if(!_res.data.length)
          return res.status(401).send({status: 401, message: "Usuario/Senha inválidos"})
        console.log('vai retornar ok?: ', _res);
        return res.send(_res.data[0]);
      });
  }
}
