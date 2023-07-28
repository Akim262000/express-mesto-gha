const router = require("express").Router();

const {
  getUsers,
  getUser,
  renovateUser,
  renovateUserAvatar,
  getCurrentUser,
} = require("../controllers/users");

const {
  userValidation,
  renovateUserValidation,
  renovateUserAvatarValidation,
} = require("../middlewares/validations");

//Получение данных о всех пользователях
router.get("/users", getUsers);

//Получение данных о конкретном пользователе
router.get("/users/:userId", userValidation, getUser);

//Получение информации о текущем пользователе
router.get("/users/me", getCurrentUser);

//Обновление данных пользователя
router.patch("/users/me", renovateUserValidation, renovateUser);

//Обновление аватара пользователя
router.patch(
  "/users/me/avatar",
  renovateUserAvatarValidation,
  renovateUserAvatar
);

module.exports = router;
