const path = require('path');
const express = require('express');
const router = express.Router();

//controllers
const AuthController = require('../app/controllers/admin/AuthController');
const CarersController = require('../app/controllers/admin/CarersController');

//middlewares
const adminAuthenticate = require('../app/middlewares/admin-authenticate');

//Auth
router.post('/login', AuthController.login);

//Carers
router.get('/carers', adminAuthenticate, CarersController.getCarers);
router.get('/carers/:id', adminAuthenticate, CarersController.getCarer);
router.put('/carers/:id', adminAuthenticate, CarersController.updateCarer);
router.post('/carers/:id/:resource/upload', adminAuthenticate, CarersController.uploadCarerResource);
router.delete('/carers/:id/:resource/upload', adminAuthenticate, CarersController.deleteCarerResourceFile);

//documentation
router.get('/documentation', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../public/admin', 'index.html'));
});

module.exports = router;
