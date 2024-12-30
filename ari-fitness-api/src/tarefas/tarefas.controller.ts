/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Response } from 'express';
import { Body, Controller, Get, Post, Put, Query, Res } from '@nestjs/common';
import { TarefaService } from './tarefas.service';
import { Tarefa } from './Tarefa.interface';

@Controller('tarefas')
export class TarefaController {
  constructor(private TarefaService: TarefaService) {}

  /**
   * The function `findAll` retrieves all users and sends the data or an error response using the
   * Response object.
   * @param {Response} res - The `res` parameter in the code snippet is a decorator used in NestJS to
   * inject the Express Response object into the method. This allows you to send responses back to the
   * client using methods like `res.status()` and `res.send()`.
   * @returns The code snippet is returning a Promise that resolves to either an error response or a
   * success response. If there is an error in fetching all users from the `TarefaService`, it will
   * log the error and send a 500 status response with the error details. If the operation is
   * successful, it will send a response with the data of all users.
   */
  @Get()
  findAll(@Res() res: Response, @Query() filter: Partial<Tarefa> | Tarefa) {
    console.log('filter: ', filter);

    console.log('getting all Tarefas...');
    return this.TarefaService.findAll(filter).then((_res) => {
      if (_res.error) {
        console.error('erro no TarefaService/findAll', _res.error);
        res.status(500).send({
          status: 500,
          ..._res.error,
        });
      }

      return res.send(_res.data);
    });
  }

  @Get('/tipos')
  getTiposTarefa(
    @Res() res: Response,
    @Query() filter: {fl_ativo: boolean},
  ) {
    if(!!!filter.fl_ativo) return res.status(400).send({status: 400, message: 'Filtro não informado'}); 

    return this.TarefaService.getTiposTarefa(filter).then((_res) => {
 
      if (_res.error) {
        console.error('erro no TarefaService/getTiposTarefa', _res.error);
        res.status(500).send({
          status: 500,
          ..._res.error,
        });
      }

      return res.send(_res.data);
    });
  }

  /**
   * The function creates a new user using the data provided in the request body.
   * @param {Plano} body - The `create` function takes a parameter `body` of type `Plano`. This
   * parameter is decorated with `@Body()`, which indicates that the value of `body` will be extracted
   * from the request body of the incoming HTTP request. The function then calls the `create` method of
   * `Plano
   * @returns The `create` method is returning the result of calling the `create` method of the
   * `TarefaService` with the `body` parameter passed to it.
   */
  @Post()
  create(@Body() body: Tarefa, @Res() res: Response) {
    return this.TarefaService.create(body).then((_res) => {
      console.log('_res: ', _res);
      
      if (_res.error) {
        console.error('erro no TarefaService/update', _res.error);
        res.status(500).send({
          status: 500,
          ..._res.error,
        });
      }

      return res.send(_res.data);
    });
  
  }

  /**
   * The update function in TypeScript takes a partial Plano object as input and calls the
   * TarefaService to update the corresponding record.
   * @param body - The `update` function takes a parameter `body` which is of type `Partial<Plano>`.
   * This means that `body` is an object that can contain some or all of the properties of the
   * `Plano` type. The function then calls the `update` method of the `TarefaService
   * @returns The `update` method is returning the result of calling the `update` method of the
   * `TarefaService` with the `body` parameter passed to it.
   */
  @Put()
  update(@Body() body: Partial<Tarefa>, @Res() res: Response) {
    return this.TarefaService.update(body).then((_res) => {
      console.log('_res: ', _res);
      
      if (_res.error) {
        console.error('erro no TarefaService/update', _res.error);
        res.status(500).send({
          status: 500,
          ..._res.error,
        });
      }

      return res.send(_res.data);
    });
  }
}
