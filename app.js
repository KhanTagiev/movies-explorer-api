const express = require('express');
const mongoose = require('mongoose');

const { MONGODB_URL, MONGODB_OPTIONS } = require('./utils/constants');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(MONGODB_URL, MONGODB_OPTIONS);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
