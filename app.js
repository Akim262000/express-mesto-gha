const express = require("express");
const mongoose = require("mongoose");
const auth = require('./middlewares/auth')
const { errors } = require('celebrate');
const { createUser, login } = require("./controllers/users");
const { signIn, signUp } = require("./middlewares/validations");
const ErrorNotFound = require("./errors/ErrorNotFound");
const errorHandler = require("./middlewares/errorHandler");

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useCreateIndex: true,
  useUnifiedTopology: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', signIn, login);
app.post('/signup', signUp, createUser);

app.use(auth);
// роуты, которым нужна авторизация
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

// запрос к несуществующему роуту
app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Страница не найдена'));
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
