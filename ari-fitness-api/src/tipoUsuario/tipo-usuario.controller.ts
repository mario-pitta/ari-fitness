/* eslint-disable prettier/prettier */

import { Controller, Get, Query, Res } from '@nestjs/common';
import { TipoUsuarioService } from './tipo-usuario.service';
import { Response } from 'express';
import { TipoUsuario } from './TipoUsuario.interface';

@Controller('tipo_usuario')
export class TipoUsuarioController {
  constructor(private service: TipoUsuarioService) {}

  @Get()
  findAll(@Res() res: Response, @Query() query: TipoUsuario | Partial<TipoUsuario>) {
    return this.service.findAll(query).then((_res) => {
        console.log("TipoUsuarioController o q achou?", _res)
      if (_res.error) res.status(500).send(_res.error);

      return res.send(_res.data);
    });
  }
}
