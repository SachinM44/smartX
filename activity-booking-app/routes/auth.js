const express = require('express');
const router = express.Router()
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')
const { validateZod, registerSchema, loginSchema } = require('../middleware/zodSchemas');

router.post('/register', validateZod(registerSchema), authController.register);


router.post('/login', validateZod(loginSchema), authController.login);

router.get('/me', auth, authController.getCurrentUser);

module.exports = router;
