import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';

import upload from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(upload.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

routes.use(errors());

routes.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.errorCode).json({
        error: error.errorCode,
        message: error.errorMessage,
      });
    }

    console.error(error);

    return response.status(500).json({
      error: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('----------------------');
  console.log('Server Up and Running!');
  console.log('----------------------');
});
