const router = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar,
} = require('../controllers/user');
const { validateUserId } = require('../middlewares/validatons');

router.get('/', getUsers);
router.get('/:id', validateUserId, getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
