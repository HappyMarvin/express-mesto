const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/card');

router.get('/', getCards);
router.delete('/:cardId', deleteCard);
router.post('/', createCard);

module.exports = router;