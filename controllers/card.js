const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  const cardId = req.params.cardId;

  Card.deleteOne({ _id: cardId })
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.addLike = (req, res) => {
  const cardId = req.params.cardId;

  Card.findByIdAndUpdate(cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },)
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.removeLike = (req, res) => {
  const cardId = req.params.cardId;

  Card.findByIdAndUpdate(cardId,
    { $pull: { likes: req.user._id } },
    { new: true },)
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: err.message }));
};