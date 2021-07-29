const Movie = require('../models/movie');
const BadReqErr = require('../errors/bad-req-err');
const ForbiddenErr = require('../errors/forbidden-err');
const NotFoundErr = require('../errors/not-found-err');

const getMovies = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const movies = await Movie.find({ owner });

    return res.send(movies);
  } catch (err) { return next(err); }
};

const addMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const movie = new Movie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });

    await movie.save();
    return res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') { return next(new BadReqErr('Переданы некорректные данные для добавления фильма')); }

    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const _id = req.params.movieId;
    const movie = await Movie.findById(_id);
    if (!movie) { return next(new NotFoundErr('Фильм с указанным _id не найден')); }
    if (String(movie.owner) !== owner) { return next(new ForbiddenErr('Фильм добавлен не вами')); }

    const movieDelete = await Movie.findByIdAndDelete(_id);
    return res.send(movieDelete);
  } catch (err) {
    if (err.name === 'CastError') { return next(new BadReqErr('Передан некорректный _id фильма')); }

    return next(err);
  }
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
