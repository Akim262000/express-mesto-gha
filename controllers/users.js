const User = require("../models/user");

const { ERROR_NOT_FOUND, errorsHandler } = require("../utils/utils");

//Получение данных о всех пользователях
function getUsers(req, res) {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => errorsHandler(err, res));
}

//Получение данных о конкретном пользователе
function getUser(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => errorsHandler(err, res));
}

//Создание пользователя
function createUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => errorsHandler(err, res));
}

//Обновление данных пользователя
function renovateUser(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => errorsHandler(err, res));
}

//Обновление аватара пользователя
function renovateUserAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => errorsHandler(err, res));
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  renovateUser,
  renovateUserAvatar,
};
