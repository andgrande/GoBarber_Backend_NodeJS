/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UserRoutesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    // delete user.password;
    // const createdUser = {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   created_at: user.created_at,
    //   updated_at: user.updated_at,
    // };

    return response.status(200).json(classToClass(user));
  }
}
