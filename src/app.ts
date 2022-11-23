require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import validateEnv from './utils/validateEnv';
import { AppDataSource } from './utils/data-source';
import userRouter from './routes/urer.routes';
import AppError from './utils/app-error';

AppDataSource.initialize()
    .then(async () => {
        // VALIDATE ENV
        validateEnv();

        const app = express();

        // MIDDLEWARE
        app.use(express.json());

        // ROUTES
        app.use('/api/users', userRouter);

        // UNHANDLED ROUTE
        app.all('*', (req: Request, res: Response, next: NextFunction) => {
            next(new AppError(404, `Route ${req.originalUrl} not found`));
        });

        // GLOBAL ERROR HANDLER
        app.use(
            (error: AppError, req: Request, res: Response, next: NextFunction) => {
                error.status = error.status || 'error';
                error.statusCode = error.statusCode || 500;

                res.status(error.statusCode).json({
                    status: error.status,
                    message: error.message,
                });
            }
        );

        const port = config.get<number>('port') || 3001;
        app.listen(port, () =>
            console.log(`Server started on port: ${port}`));
    })
    .catch((error) => console.log(error));

