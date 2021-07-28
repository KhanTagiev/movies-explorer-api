const MONGODB_URL = 'mongodb://localhost:27017/bitfilmsdb';
const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const OK_CODE = 200;
const ERR_CODE_BAD_REQ = 400;
const ERR_CODE_UN_AUTH = 401;
const ERR_CODE_FORBIDDEN = 403;
const ERR_CODE_NOT_FOUND = 404;
const ERR_CODE_CONFLICT = 409;
const ERR_CODE_INT_SER = 500;

module.exports = {
  MONGODB_URL,
  MONGODB_OPTIONS,
  OK_CODE,
  ERR_CODE_BAD_REQ,
  ERR_CODE_UN_AUTH,
  ERR_CODE_FORBIDDEN,
  ERR_CODE_NOT_FOUND,
  ERR_CODE_CONFLICT,
  ERR_CODE_INT_SER,
};
