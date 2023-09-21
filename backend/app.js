const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorCentre = require('./middlewares/errorCentre');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('connected to db');
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorCentre);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
