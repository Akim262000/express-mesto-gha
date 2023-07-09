const Card = require('../models/card');

//Получение всех карточек из базы данных
function getCards(req, res)  {
  res.send(cards);
}

//Создание новой карточки
function createCards(req, res) {
  console.log('Card create:');
  console.log(req.body);
  res.status(201).send(req.body);
}

//Удаление карточки
function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.id)
  .then(card => res.send({ data: user }))
  .catch(err => res.status(404).send({ message: 'Карточка с указанным id не найдена' }));
};

//Добавление лайка карточке
function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
};

//Удаление лайка с карточки
function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
};

module.exports = {
  getCards,
  createCards,
  deleteCard,
  likeCard,
  dislikeCard
}
