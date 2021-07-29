const jwt = require('jsonwebtoken');
const UnAuthErr = require('../errors/un-auth-err');
const { SECRET_CODE } = require('../utils/constants');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const payload = jwt.verify(token, SECRET_CODE);

    req.user = payload;
    return next();
  } catch (err) { return next(new UnAuthErr('Необходимо авторизоваться')); }
};
