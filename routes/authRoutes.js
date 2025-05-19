const express = require('express');
const router = express.Router();
const { validateRegister, validateLogin } = require('../middleware/authValidation');
const authController = require('../controllers/authController');

/**
	* @route POST /api/auth/register
	* @desc Register a new user
	* @access Public
	*/
router.post('/register', validateRegister, authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validateLogin, authController.login);

module.exports = router;