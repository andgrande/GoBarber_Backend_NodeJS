import { Router } from 'express';
import multer from 'multer';
// import { container } from 'tsyringe';

// import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
// import CreateUserService from '@modules/users/services/CreateUserService';
// import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import uploadConfig from '@config/upload';
// import AppError from '@shared/errors/AppError';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware';

import UserRoutesController from '../controllers/UserRoutesController';
import UserAvatarControler from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const userRoutesController = new UserRoutesController();
const userAvatarController = new UserAvatarControler();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userRoutesController.create,
);

usersRouter.patch(
  '/avatar',
  AuthenticationMiddleware,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
