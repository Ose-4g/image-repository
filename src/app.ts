import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import errorMiddleWare from './errors/errorHandler';
import morgan from 'morgan';

// import router

//add middlewares
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

import router from './routes/index';

// make app use routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Welcome to My image repository',
    documentation: 'https://',
  });
});

//unhandled routes
app.use('*', (req: Request, res: Response) => {
  return res.status(404).json({
    message: 'Specified route does not exist on this server',
  });
});

//error handling
app.use(errorMiddleWare);

export default app;
