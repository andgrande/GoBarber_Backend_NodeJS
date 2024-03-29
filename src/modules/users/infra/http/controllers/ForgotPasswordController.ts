import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class forgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const forgotPasswordService = container.resolve(
      SendForgotPasswordEmailService,
    );

    await forgotPasswordService.execute({
      email,
    });

    return response.status(204).json();
  }
}
