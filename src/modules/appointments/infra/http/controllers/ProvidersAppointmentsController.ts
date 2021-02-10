import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';

import { classToClass } from 'class-transformer';

export default class AppointmentsController {
  // eslint-disable-next-line class-methods-use-this
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { year, month, day } = request.query;

    const listProvidersAppointments = container.resolve(
      ListProvidersAppointmentsService,
    );

    const appointments = await listProvidersAppointments.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    // IMPORTANT:
    // IT WAS INCLUDED CLASSTOCLASS EVEN THOUGH IT WAS NOT IN THE ORGINIAL CODE
    return response.status(200).json(classToClass(appointments));
  }
}
