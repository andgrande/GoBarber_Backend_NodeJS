import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  // eslint-disable-next-line class-methods-use-this
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    // const appointmentsRepository = new AppointmentsRepository();
    // const createAppointmentService = new CreateAppointmentService(
    //   appointmentsRepository,
    // );

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      provider_id,
      user_id,
      date: parsedDate,
    });

    return response.status(200).json(appointment);
  }
}
