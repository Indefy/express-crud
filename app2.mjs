import express from 'express';
import morgan from 'morgan';
import usersRouter from './usersRoutes.mjs';
import logger from './logger.mjs';
import { createLogger, transports, format } from 'winston';
import { readFile, writeFile } from 'fs/promises';

const { PORT, HOST } = process.env;

const app = express();

const usersFilePath = './data/users.json';

app.use(morgan('common', { stream: logger.stream }));
app.use(express.json());

// URL: https://*/users
app.use('/users', usersRouter);

// Send a custom 404 response
app.use((req, res) => {
    res.status(404);

    res.send('<h1>404 -Page Not Found</h1><p>Error,Please enter a diffrent supported route.</p>');
  });

app.listen(PORT, HOST,  ()=> {
    console.log(` listening on`,`http://${HOST}:${PORT}`);
});
