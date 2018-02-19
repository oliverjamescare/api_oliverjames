const express = require('express');
const path = require('path');
const router = express.Router();

//controllers
const UsersController = require('../app/controllers/UsersController');
const AuthController = require('../app/controllers/AuthController');
const ContactController = require('../app/controllers/ContactController');
const CarersController = require('../app/controllers/CarersController');
const CareHomeControler = require('../app/controllers/CareHomeController');
const JobsController = require('../app/controllers/JobsController');

//middlewares
const authenticate = require('../app/middlewares/authenticate');
const security = require('../app/middlewares/security');

//Auth
router.post('/register', AuthController.register);
router.post('/care-home/waiting-list', AuthController.addUserToCareHomeWaitingList);
router.post('/login', AuthController.login);
router.post('/password/remind', AuthController.remindPassword);
router.put('/password/remind/change', AuthController.remindPasswordChange);

//User
router.get('/user/uniqueness', UsersController.checkUniqueness);
router.put('/user/confirm-email', UsersController.confirmEmail);
router.get('/user/profile', authenticate, UsersController.profile);
router.put('/user/password', authenticate, UsersController.changePassword);
router.put('/user/email', authenticate, UsersController.changeEmail);
router.post('/user/email/verification', authenticate, UsersController.resendEmailVerification);
router.put('/user/profile-image', authenticate, security(["CARER_UPDATE"]), UsersController.updateProfileImage);
router.put('/user/carer', authenticate, security(["CARER_UPDATE"]), UsersController.updateCarerDetails);

//Contact
router.post('/contact', ContactController.sendContactMessage);

//Carer
router.get('/carers/nearby', CarersController.checkCarersNearArea);
router.get('/carer/availability', authenticate, security(["CARER_READ"]), CarersController.getAvailabilityCalendar);
router.put('/carer/availability', authenticate, security(["CARER_UPDATE"]), CarersController.updateAvailability);
router.get('/carer/calendar', authenticate, security(["CARER_READ"]), CarersController.getCalendar);

//Care Home
router.get('/care-home/calendar', authenticate, security(["CARE_HOME_READ"]), CareHomeControler.getCalendar);
router.get('/care-home/carers/search', authenticate, security(["CARE_HOME_READ"]), CareHomeControler.getCarersSearch);

//Jobs
router.post('/jobs', authenticate, security(["CARE_HOME_SAVE"]), JobsController.addJobs);
router.get('/jobs/carers', authenticate, security(["CARE_HOME_READ"]), JobsController.checkCarersToContact);
router.get('/jobs', JobsController.getJobs);
router.get('/carer/jobs', authenticate, security(["CARER_READ"]), JobsController.getCarerAvailableJobs);
router.get('/carer/my-jobs', authenticate, security(["CARER_READ"]), JobsController.getMyJobs);
router.get('/jobs/:id', authenticate, JobsController.getJobDetails);
router.put('/jobs/:id/accept', authenticate, security(["CARER_UPDATE"]), JobsController.acceptJob);
router.put('/jobs/:id/withdraw', authenticate, security(["CARER_UPDATE"]), JobsController.withdrawJob);
router.put('/jobs/:id/decline', authenticate, security(["CARER_UPDATE"]), JobsController.declineJob);


//router.get('/user/profile', UsersController.profile);
// router.put('/user/profile', UsersController.updateProfile);
// router.put('/user/email', UsersController.restoreEmail);
// router.put('/user/password', UsersController.changePassword);
// router.get('/admin/users', UsersController.getAllUsers);
// router.put('/admin/users/:userId', UsersController.updateUser);

//documentation
router.get('/documentation', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../public/api', 'index.html'));
});

module.exports = router;
