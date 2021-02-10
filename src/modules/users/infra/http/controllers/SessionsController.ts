/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateSessionService from '@modules/users/services/AuthenticateSessionService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    console.log(email, password);

    // const usersRepository = new UsersRepository();
    // const authenticateSession = new AuthenticateSessionService(usersRepository);
    const authenticateSession = container.resolve(AuthenticateSessionService);

    const { user, token } = await authenticateSession.execute({
      email,
      password,
    });

    // delete user.password;
    // const authenticatedUser = {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   created_at: user.created_at,
    //   updated_at: user.updated_at,
    // };

    console.log(classToClass(user));
    return response.status(200).json({ user: classToClass(user), token });
  }
}
