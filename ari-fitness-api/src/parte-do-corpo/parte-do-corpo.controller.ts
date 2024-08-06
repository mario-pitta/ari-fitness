/* eslint-disable prettier/prettier */
import { Response } from 'express';
import { ParteDoCorpo } from './parte-do-corpo.interface';
import { ParteDoCorpoService } from './parte-do-corpo.service';
import { Body, Controller, Get, Post, Put, Query, Res } from '@nestjs/common';

const controller = 'parte_do_corpo';
@Controller(controller)
export class ParteDoCorpoController {
  constructor(private parteDoCorpoService: ParteDoCorpoService) {}

  /**
   * The function `findAll` retrieves all users and sends the data or an error response using the
   * Response object.
   * @param {Response} res - The `res` parameter in the code snippet is a decorator used in NestJS to
   * inject the Express Response object into the method. This allows you to send responses back to the
   * client using methods like `res.status()` and `res.send()`.
   * @returns The code snippet is returning a Promise that resolves to either an error response or a
   * success response. If there is an error in fetching all users from the `usuarioService`, it will
   * log the error and send a 500 status response with the error details. If the operation is
   * successful, it will send a response with the data of all users.
   */
  @Get()
  findAll(
    @Res() res: Response,
    @Query() filter: Partial<ParteDoCorpo> | ParteDoCorpo,
  ) {
    console.log('getting all ...', controller);
    return this.parteDoCorpoService.findAll(filter).then((_res) => {
      if (_res.error) {
        console.error('erro noParteDoCorpo/findAll', _res.error);
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
   * @param {Usuario} body - The `create` function takes a parameter `body` of type `Usuario`. This
   * parameter is decorated with `@Body()`, which indicates that the value of `body` will be extracted
   * from the request body of the incoming HTTP request. The function then calls the `create` method of
   * `usuario
   * @returns The `create` method is returning the result of calling the `create` method of the
   * `usuarioService` with the `body` parameter passed to it.
   */
  @Post()
  create(@Body() body: ParteDoCorpo, @Res() res: Response) {
    return this.parteDoCorpoService
      .create({
        ...body,
        nome: body.nome.toLocaleLowerCase(),
      })
      .then((_res) => {
        if (_res.error) {
          console.error('erro noParteDoCorpo/findAll', _res.error);
          res.status(500).send({
            status: 500,
            ..._res.error,
          });
        }

        return res.send(_res.data);
      });
  }

  /**
   * The update function in TypeScript takes a partialParteDoCorpo object as input and calls the
   *ParteDoCorpoService to update the corresponding record.
   * @param body - The `update` function takes a parameter `body` which is of type `Partial<Usuario>`.
   * This means that `body` is an object that can contain some or all of the properties of the
   * `Usuario` type. The function then calls the `update` method of the `usuarioService
   * @returns The `update` method is returning the result of calling the `update` method of the
   * `usuarioService` with the `body` parameter passed to it.
   */
  @Put()
  update(@Body() body: Partial<ParteDoCorpo>) {
    return this.parteDoCorpoService.update(body);
  }
}
