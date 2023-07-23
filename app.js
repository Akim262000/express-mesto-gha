const express = require("express");
const mongoose = require("mongoose");
const auth = require('./middlewares/auth')
const { createUser, login } = require("./controllers/users");
const { ERROR_NOT_FOUND } = require("./utils/utils");

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useCreateIndex: true,
  useUnifiedTopology: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use("/", require("./routes/users"));
app.use("/", require("./routes/cards"));

app.use(auth);

app.use((_req, res) =>
  res.status(ERROR_NOT_FOUND).send({ message: "Страница не найдена" })
);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
