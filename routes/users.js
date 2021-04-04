const router = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getUser,
} = require('../controllers/users');
const { validateId, validateUserProfile, validateUserAvatar } = require('../middlewares/validatons');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:id', validateId, getUserById);
router.patch('/me', validateUserProfile, updateProfile);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
