import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
// import { parseISO } from 'date-fns';

// import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
// import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import AnthenticationMiddleware from '@modules/users/infra/http/middlewares/AuthenticationMiddleware';
// import AppError from '@shared/errors/AppError';
// import { container } from 'tsyringe';
import AppointmentsController from '../controllers/AppointmentsController';
import ProvidersAppointmentsController from '../controllers/ProvidersAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providersAppointments = new ProvidersAppointmentsController();

appointmentsRouter.use(AnthenticationMiddleware);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find(); // should return all

//   return response.status(200).json({ appointments });
// });

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.string().isoDate(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get('/me', providersAppointments.index);

export default appointmentsRouter;
