import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
// import AuthenticateSessionService from '@modules/users/services/AuthenticateSessionService';
// import { container } from 'tsyringe';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
