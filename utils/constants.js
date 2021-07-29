const MONGODB_URL = 'mongodb://localhost:27017/bitfilmsdb';
const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const ERR_CODE_BAD_REQ = 400;
const ERR_CODE_UN_AUTH = 401;
const ERR_CODE_FORBIDDEN = 403;
const ERR_CODE_NOT_FOUND = 404;
const ERR_CODE_CONFLICT = 409;
const ERR_CODE_INT_SER = 500;

const SECRET_CODE = '$2b$12$CmlwbfGcHhRkZZQGC5ymEerYSgHdPgIL4Chvg.GMdw8G3V1DeGFfq';

const ALLOWED_CORS = [
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  MONGODB_URL,
  MONGODB_OPTIONS,
  ERR_CODE_BAD_REQ,
  ERR_CODE_UN_AUTH,
  ERR_CODE_FORBIDDEN,
  ERR_CODE_NOT_FOUND,
  ERR_CODE_CONFLICT,
  ERR_CODE_INT_SER,
  SECRET_CODE,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
