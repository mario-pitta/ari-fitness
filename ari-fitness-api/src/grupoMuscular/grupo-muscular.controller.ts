/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Put, Query, Res } from '@nestjs/common';
import { GrupoMuscularService } from './grupo-muscular.service';
import { Response } from 'express';
import { GrupoMuscular } from './GrupoMuscular.interface';

@Controller('grupo_muscular')
export class GrupoMuscularController {
  constructor(private grupoMuscularService: GrupoMuscularService) {}

  @Get()
  findAll(@Query() query: GrupoMuscular, @Res() res: Response) {
    return this.grupoMuscularService.findAll(query).then((_res) => {
      if (_res.error)
        res.status(500).send({
          status: 500,
          ..._res.error,
        });

      return res.send(_res.data);
    });
  }


  @Post()
  create(@Body() body: GrupoMuscular, @Res() res: Response){
    return this.grupoMuscularService.create(body).then((_res) => {
        if (_res.error)
          res.status(500).send({
            status: 500,
            ..._res.error,
          });
  
        return res.send(_res.data);
      })
  }
  @Put()
  update(@Body() body: GrupoMuscular, @Res() res: Response){
    return this.grupoMuscularService.update(body).then((_res) => {
        if (_res.error)
          res.status(500).send({
            status: 500,
            ..._res.error,
          });
  
        return res.send(_res.data);
      })
  }

}
