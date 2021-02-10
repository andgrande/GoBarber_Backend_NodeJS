import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function AnthenticationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // here value is retrieved from authorization section of request
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError('Request missing Token.');
  }

  const [, token] = authToken.split(' ');

  try {
    const { secret } = authConfig.jwt;
    const decodedToken = verify(token, secret);

    // here one value is taken and a type applied based on the interface created
    const { sub } = decodedToken as ITokenPayload;

    // here info is set to be present in other routes
    request.user = {
      id: sub,
    };

    next();
  } catch (err) {
    throw Error('Invalid token.');
  }
}
