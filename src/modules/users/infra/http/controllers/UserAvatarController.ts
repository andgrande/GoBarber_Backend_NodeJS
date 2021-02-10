/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    // delete user.password;
    // const createdUser = {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   avatar: user.avatar,
    //   created_at: user.created_at,
    //   updated_at: user.updated_at,
    // };

    return response.json(classToClass(user));
  }
}
