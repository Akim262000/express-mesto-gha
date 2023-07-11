const express = require("express");
const mongoose = require("mongoose");
const { ERROR_NOT_FOUND } = require("./utils/utils");

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useCreateIndex: true,
  useUnifiedTopology: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "64ad99c47af70d2a10ccdda4",
  };

  next();
});

app.use("/", require("./routes/users"));
app.use("/", require("./routes/cards"));

app.use((req, res) =>
  res.status(ERROR_NOT_FOUND).send({ message: "Страница не найдена" })
);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
