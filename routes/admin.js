const path = require('path');
const express = require('express');
const router = express.Router();

//controllers
const AuthController = require('../app/controllers/admin/AuthController');

//Auth
router.post('/login', AuthController.login);

//documentation
router.get('/documentation', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../public/admin', 'index.html'));
});

module.exports = router;
