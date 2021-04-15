const router = require('express').Router();
const { validateId, validateCardBody } = require('../middlewares/validatons');
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:id', validateId, deleteCard);
router.post('/', validateCardBody, createCard);
router.put('/likes/:id', validateId, addLike);
router.delete('/likes/:id', validateId, removeLike);

module.exports = router;
