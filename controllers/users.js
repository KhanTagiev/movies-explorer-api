const bcrypt = require('bcrypt');
const User = require('../models/user');

const BadReqErr = require('../errors/bad-req-err');
const ConflictErr = require('../errors/conflict-err');

const signUp = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();
    return res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err.name === 'ValidationError') { return next(new BadReqErr('Переданы некорректные данные для создания пользователя')); }
    if (err.name === 'MongoError' && err.code === 11000) { return next(new ConflictErr('Пользователь с таким Email уже существует')); }
    return next(err);
  }
};

module.exports = {
  signUp,
};
