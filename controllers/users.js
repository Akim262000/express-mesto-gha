const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const {
  ERROR_NOT_FOUND,
  ERROR_OK,
  ERROR_CREATE,
  errorsHandler,
} = require("../utils/utils");

//Получение данных о всех пользователях
function getUsers(_req, res) {
  User.find({})
    .then((users) => res.status(ERROR_OK).send(users))
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
      return res.status(ERROR_OK).send(user);
    })
    .catch((err) => errorsHandler(err, res));
}

//Создание пользователя
function createUser(req, res) {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      return User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
      });
    })
    .then((user) => {
      return res.status(ERROR_CREATE).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => errorsHandler(err, res));
}

function login(req, res) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret',{ expiresIn: '7d' });

      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      res.status(ERROR_UNAUTHORIZED).send({ message: err.message });
    });
}

function getCurrentUser(req, res, next) {
  const { _id } = req.user;
  User.findById(_id)
  .then((user) => {
    if(!user) {
      return Promise.reject(new Error('Пользователь не найден'));
    }

    return res.status(ERROR_OK).send(user);
  }).catch((err) => {
    next(err);
  });
}

//Обновление данных пользователя
function renovateUser(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(ERROR_OK).send(user))
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
    .then((user) => res.status(ERROR_OK).send(user))
    .catch((err) => errorsHandler(err, res));
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  getCurrentUser,
  renovateUser,
  renovateUserAvatar,
};
