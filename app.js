require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { MONGODB_URL, MONGODB_OPTIONS } = require('./utils/constants');
const rateLimiterMiddleware = require('./middlewares/rate-limiter');
const corsMiddleware = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const indexRouter = require('./routes/index');
const NotFoundErr = require('./errors/not-found-err');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(MONGODB_URL, MONGODB_OPTIONS);

app.use(helmet());
app.use(requestLogger);
app.use(rateLimiterMiddleware);
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());

app.use('/', indexRouter);

app.use((req, res, next) => {
  next(new NotFoundErr('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message, name } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
