const {  getCards,createCards, deleteCard, likeCard, dislikeCard} = require('../controllers/cards');

const router = require("express").Router();
//Получение всех карточек из базы данных
router.get('/cards', getCards);
//Создание новой карточки
router.post('/cards', createCards);
//Удаление карточки
router.delete('/cards/:cardId', deleteCard);
//Добавление лайка карточке
router.put('/cards/:cardId/likes', likeCard);
//Удаление лайка с карточки
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
