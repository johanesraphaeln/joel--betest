const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = require('./routes');
const v1 = `/api/v1/users`;

const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/handle-error');

app.use(v1, usersRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
