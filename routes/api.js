const express = require('express');
const path = require('path');
const router = express.Router();

//controllers
const UsersController = require('../app/controllers/UsersController');
const AuthController = require('../app/controllers/AuthController');


//middlewares
const authenticate = require('../app/middlewares/authenticate');

//Skipped
router.use(authenticate({skippedRoutes: 
    ['/documentation', '/register', '/login', '/password/remind', '/password/remind/change',
    "/user/email", "/user/confirm-email"
]}));

//Auth
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/password/remind', AuthController.remindPassword);
router.put('/password/remind/change', AuthController.remindPasswordChange);

//User
router.get('/user/profile', UsersController.profile);
router.put('/user/profile', UsersController.updateProfile);
router.put('/user/email', UsersController.restoreEmail);
router.put('/user/confirm-email', UsersController.confirmEmail);
router.put('/user/password', UsersController.changePassword);
router.get('/admin/users', UsersController.getAllUsers);
router.put('/admin/users/:userId', UsersController.updateUser);

//documentation
router.get('/documentation', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../public/api', 'index.html'));
});

module.exports = router;
