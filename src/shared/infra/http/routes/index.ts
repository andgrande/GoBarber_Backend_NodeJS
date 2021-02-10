// src/routes/index.ts
import { NextFunction, Request, Response, Router } from 'express';
import 'express-async-errors';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

// import AppError from '@shared/errors/AppError';
// import { errors } from 'celebrate';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

// routes.use(errors());

// routes.use(
//   (error: Error, request: Request, response: Response, next: NextFunction) => {
//     console.log('A');

//     if (error instanceof AppError) {
//       console.log('X');
//       return response.status(error.errorCode).json({
//         error: error.errorCode,
//         message: error.errorMessage,
//       });
//     }

//     // console.error(error);

//     console.log('Y');
//     return response.status(500).json({
//       error: 'error',
//       message: 'Internal server error',
//     });
//   },
// );

export default routes;
