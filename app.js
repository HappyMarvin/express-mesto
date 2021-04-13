const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { validateSignUpBody, validateSignInBody } = require('./middlewares/validatons');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(requestLogger);

app.post('/signin', validateSignInBody, login);
app.post('/signup', validateSignUpBody, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', (req, res) => {
  res.status(404).send({ message: 'Неверный адрес запроса' });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {

});
