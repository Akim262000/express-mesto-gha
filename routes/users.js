const router = require("express").Router();

const {
  getUsers,
  getUser,
  createUser,
  renovateUser,
  renovateUserAvatar,
} = require("../controllers/users");

//Получение данных о всех пользователях
router.get("/users", getUsers);

//Получение данных о конкретном пользователе
router.get("/users/:userId", getUser);

//Создание пользователя
router.post("/users", createUser);

//Обновление данных пользователя
router.patch("/users/me", renovateUser);

//Обновление аватара пользователя
router.patch("/users/me/avatar", renovateUserAvatar);

module.exports = router;
