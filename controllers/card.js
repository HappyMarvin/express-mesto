const Card = require('../models/card');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError('Невозможно удалить чужую карточку'));
      } else {
        Card.deleteOne({ _id: cardId })
          .then((result) => res.send(result))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный идентификатор карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.addLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный идентификатор карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.removeLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный идентификатор карточки'));
      } else {
        next(err);
      }
    });
};
