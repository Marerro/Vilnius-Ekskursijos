const router = require('express');
const authController = require('../controllers/authController');

const authRouter = router();

authRouter.post('/signup', authController.signup);

module.exports = authRouter;