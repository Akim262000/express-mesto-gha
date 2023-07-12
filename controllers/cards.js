const Card = require("../models/card");
const {
  ERROR_NOT_FOUND,
  ERROR_OK,
  ERROR_CREATE,
  errorsHandler,
} = require("../utils/utils");

//Получение всех карточек из базы данных
function getCards(_req, res) {
  Card.find({})
    .then((cards) => res.status(ERROR_OK).send(cards))
    .catch((err) => errorsHandler(err, res));
}

//Создание новой карточки
function createCards(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(ERROR_CREATE).send(card))
    .catch((err) => errorsHandler(err, res));
}

//Удаление карточки
function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Карточка не найдена." });
      }
      return res.status(ERROR_OK).send(card);
    })
    .catch((err) => errorsHandler(err, res));
}

//Добавление лайка карточке
function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Карточка не найдена." });
      }
      return res.status(ERROR_OK).send(card);
    })
    .catch((err) => errorsHandler(err, res));
}

//Удаление лайка с карточки
function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Карточка не найдена." });
      }
      return res.status(ERROR_OK).send(card);
    })
    .catch((err) => errorsHandler(err, res));
}

module.exports = {
  getCards,
  createCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
