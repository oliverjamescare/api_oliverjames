const express = require('express');
const path = require('path');
const router = express.Router();

//controllers
const UsersController = require('../app/controllers/api/UsersController');
const AuthController = require('../app/controllers/api/AuthController');
const ContactController = require('../app/controllers/api/ContactController');
const CarersController = require('../app/controllers/api/CarersController');
const CareHomeControler = require('../app/controllers/api/CareHomeController');
const JobsController = require('../app/controllers/api/JobsController');
const PaymentsController = require('../app/controllers/api/PaymentsController');

//middlewares
const authenticate = require('../app/middlewares/authenticate');
const security = require('../app/middlewares/security');

//Auth
router.post('/register', AuthController.register);
router.post('/care-home/waiting-list', AuthController.addUserToCareHomeWaitingList);
router.post('/login', AuthController.login);
router.post('/password/remind', AuthController.remindPassword);
router.put('/password/remind/change', AuthController.remindPasswordChange);
router.get('/address/search', AuthController.searchAddresses);
router.get('/address/search/:id', AuthController.getAddress);

//User
router.get('/user/uniqueness', UsersController.checkUniqueness);
router.put('/user/confirm-email', UsersController.confirmEmail);
router.get('/user/profile', authenticate, UsersController.profile);
router.put('/user/password', authenticate, UsersController.changePassword);
router.put('/user/email', authenticate, UsersController.changeEmail);
router.post('/user/email/verification', authenticate, UsersController.resendEmailVerification);
router.put('/user/profile-image', authenticate, security(["CARER_FULL"]), UsersController.updateProfileImage);
router.put('/user/care-home', authenticate, security(["CARE_HOME_FULL"]), UsersController.updateCareHomeDetails);
router.put('/user/carer', authenticate, security(["CARER_FULL"]), UsersController.updateCarerDetails);
router.put('/user/notifications/token', authenticate, UsersController.updateNotificationTokens);

//Contact
router.post('/contact', ContactController.sendContactMessage);

//Carer
router.get('/carers/nearby', CarersController.checkCarersNearArea);
router.get('/carer/availability', authenticate, security(["CARER_FULL"]), CarersController.getAvailabilityCalendar);
router.put('/carer/availability', authenticate, security(["CARER_FULL"]), CarersController.updateAvailability);
router.get('/carer/calendar', authenticate, security(["CARER_FULL"]), CarersController.getCalendar);
router.get('/carer/calendar/monthly', authenticate, security(["CARER_FULL"]), CarersController.getMonthlyCalendar);
router.get('/carer/jobs', authenticate, security(["CARER_FULL"]), CarersController.getCarerAvailableJobs);
router.get('/carer/my-jobs', authenticate, security(["CARER_FULL"]), CarersController.getCarerMyJobs);
router.get('/carer/notifications', authenticate, security(["CARER_FULL"]), CarersController.getNotificationsSettings);
router.put('/carer/notifications', authenticate, security(["CARER_FULL"]), CarersController.updateNotificationsSettings);
router.get('/carer/home', authenticate, security(["CARER_FULL"]), CarersController.getHomeScreenDetails);
router.get('/carer/notifications/list', authenticate, security(["CARER_FULL"]), CarersController.getNotifications);
router.get('/carer/submitted-jobs', authenticate, security(["CARER_FULL"]), CarersController.getSubmittedJobs);

//Care Home
router.get('/care-home/calendar', authenticate, security(["CARE_HOME_FULL"]), CareHomeControler.getCalendar);
router.get('/care-home/carers/search', authenticate, security(["CARE_HOME_FULL"]), CareHomeControler.getCarersSearch);
router.get('/care-home/my-jobs', authenticate, security(["CARE_HOME_FULL"]), CareHomeControler.getCareHomeMyJobs);
router.post('/care-home/carers/:id/block', authenticate, security(["CARE_HOME_FULL"]), CareHomeControler.blockCarer);
router.delete('/care-home/carers/:id/block', authenticate, security(["CARE_HOME_FULL"]), CareHomeControler.unblockCarer);
router.get('/care-home/past-jobs', authenticate, security(["CARE_HOME_FULL"]), CareHomeControler.getPastJobs);
router.get('/care-home/past-jobs/:id', authenticate, security(["CARE_HOME_FULL"]), CareHomeControler.getPastJob);
router.get('/care-home/pending-reviews', authenticate, security(["CARE_HOME_FULL"]), CareHomeControler.getJobsToReview);
router.get('/care-home/jobs', authenticate, security(["CARE_HOME_FULL"]), CareHomeControler.getBookedJobs);

//Jobs
router.post('/jobs', authenticate, security(["CARE_HOME_FULL"]), JobsController.addJobs);
router.get('/jobs/carers', authenticate, security(["CARE_HOME_FULL"]), JobsController.checkCarersToContact);
router.get('/jobs/:group/notifications/carers', authenticate, security(["CARE_HOME_FULL"]), JobsController.getJobNotificationsCarers);
router.put('/jobs/:group/notifications/carers/:id', authenticate, security(["CARE_HOME_FULL"]), JobsController.removeJobNotificationCarer);

router.get('/jobs/:id', authenticate, JobsController.getJobDetails);
router.put('/jobs/:id/accept', authenticate, security(["CARER_FULL"]), JobsController.acceptJob);
router.put('/jobs/:id/withdraw', authenticate, security(["CARER_FULL"]), JobsController.withdrawJob);
router.put('/jobs/:id/decline', authenticate, security(["CARER_FULL"]), JobsController.declineJob);
router.post('/jobs/:id/summary', authenticate, security(["CARER_FULL"]), JobsController.sendSummarySheet);
router.get('/jobs/:id/income', authenticate, security(["CARER_FULL"]), JobsController.getProjectedIncome);
router.put('/jobs/:id', authenticate, security(["CARE_HOME_FULL"]), JobsController.updateJob);
router.put('/jobs/:id/cancel', authenticate, security(["CARE_HOME_FULL"]), JobsController.cancelJob);
router.get('/jobs/:id/other-jobs', authenticate, security(["CARER_FULL"]), JobsController.getCareHomeOtherJobs);
router.post('/jobs/:id/carer/review', authenticate, security(["CARE_HOME_FULL"]), JobsController.reviewJob);
router.post('/jobs/:id/challenge', authenticate, security(["CARE_HOME_FULL"]), JobsController.challengeJob);
router.put('/jobs/:id/request-carer-change', authenticate, security(["CARE_HOME_FULL"]), JobsController.requestCarerChange);


//Payments
router.put('/payments/card', authenticate, security(["CARE_HOME_FULL"]), PaymentsController.updateCard);
router.put('/payments/bank', authenticate, security(["CARER_FULL"]), PaymentsController.updateBankDetails);
router.put('/payments/identity', authenticate, security(["CARER_FULL"]), PaymentsController.updateIdentityProof);

//documentation
router.get('/documentation', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../public/api', 'index.html'));
});

module.exports = router;
