const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { MONGODB_URL, MONGODB_OPTIONS } = require('./utils/constants');
const {
  signUp,
  signIn,
  signOut,
} = require('./controllers/users');
const UserRouter = require('./routes/users');
const MovieRouter = require('./routes/movies');
const authMiddleware = require('./middlewares/auth');
const NotFoundErr = require('./errors/not-found-err');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(MONGODB_URL, MONGODB_OPTIONS);

app.use(express.json());
app.use(cookieParser());

app.use('/users/', authMiddleware, UserRouter);
app.use('/movies/', authMiddleware, MovieRouter);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), signUp);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), signIn);
app.post('/signout', signOut);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use((req, res, next) => {
  next(new NotFoundErr('Страница не найдена'));
});

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
