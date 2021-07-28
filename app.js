const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');

const { MONGODB_URL, MONGODB_OPTIONS } = require('./utils/constants');
const {
  signUp,
} = require('./controllers/users');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(MONGODB_URL, MONGODB_OPTIONS);

app.use(express.json());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), signUp);

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
