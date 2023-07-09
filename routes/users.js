const {  getUsers, getUser, createUser, toRenovateUser, toRenovateUserAvatar} = require('../controllers/users');

const router = require("express").Router();

//Получение данных о всех пользователях
router.get('/users', getUsers);

//Получение данных о конкретном пользователе
router.get('/:userId', getUser);

//Создание пользователя
router.post('/:userId', createUser);

//Обновление данных пользователя
router.patch('/me', toRenovateUser);

//Обновление аватара пользователя
router.patch('/me/avatar', toRenovateUserAvatar);

module.exports = router;