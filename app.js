const express = require("express");
const mongoose = require("mongoose");
const auth = require('./middlewares/auth')
const { createUser, login } = require("./controllers/users");
const { signIn, signUp } = require("./middlewares/validations");
const {ERROR_INTERNAL_SERVER} = require("./utils/utils")

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

app.use("/", require("./routes/users"));
app.use("/", require("./routes/cards"));

app.use(auth);

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err.stack || err);
  const status = err.statusCode || ERROR_INTERNAL_SERVER;
  const message = err.message || 'На сервере произошла ошибка.';

  res.status(status).send({
    err,
    message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
