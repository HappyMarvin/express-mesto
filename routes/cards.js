const router = require('express').Router();
const { validateId, validateCardBody } = require('../middlewares/validatons');
const {
  getCards, createCard, deleteCard, addLike, removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:id', validateId, deleteCard);
router.post('/', validateCardBody, createCard);
router.put('/:id/likes', validateId, addLike);
router.delete('/:id/likes', validateId, removeLike);

module.exports = router;
