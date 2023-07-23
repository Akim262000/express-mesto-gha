const router = require("express").Router();

const {
  getUsers,
  getUser,
  renovateUser,
  renovateUserAvatar,
  getCurrentUser,
} = require("../controllers/users");

//Получение данных о всех пользователях
router.get("/users", getUsers);

//Получение данных о конкретном пользователе
router.get("/users/:userId", getUser);

//Получение информации о текущем пользователе
router.get("/users/me", getCurrentUser);

//Обновление данных пользователя
router.patch("/users/me", renovateUser);

//Обновление аватара пользователя
router.patch("/users/me/avatar", renovateUserAvatar);

module.exports = router;
