const router = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/user');
const { validateId, validateUserProfile, validateUserAvatar } = require('../middlewares/validatons');

router.get('/', getUsers);
router.get('/:id', validateId, getUserById);
router.patch('/me', validateUserProfile, updateProfile);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
