const express = require('express');
const router = express.Router();

//controllers
const AuthController = require('../app/controllers/admin/AuthController');

//Auth
router.post('/login', AuthController.login);
module.exports = router;
