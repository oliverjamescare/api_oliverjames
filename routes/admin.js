const path = require('path');
const express = require('express');
const router = express.Router();

//controllers
const AuthController = require('../app/controllers/admin/AuthController');
const AdminController = require('../app/controllers/admin/AdminController');
const CareHomesController = require('../app/controllers/admin/CareHomesController');
const CarersController = require('../app/controllers/admin/CarersController');
const JobsController = require('../app/controllers/admin/JobsController');

//middlewares
const adminAuthenticate = require('../app/middlewares/admin-authenticate');

//Auth
router.post('/login', AuthController.login);

//Admin
router.get('/home', adminAuthenticate, AdminController.home);
router.get('/profile', adminAuthenticate, AdminController.getProfile);
router.put('/profile', adminAuthenticate, AdminController.updateProfile);
router.put('/password', adminAuthenticate, AdminController.changePassword);

router.get('/admins', adminAuthenticate, AdminController.getAdminsList);
router.post('/admins', adminAuthenticate, AdminController.addAdmin);
router.put('/admins/:id', adminAuthenticate, AdminController.updateAdmin);
router.put('/admins/:id/password', adminAuthenticate, AdminController.changeAdminPassword);
router.delete('/admins/:id', adminAuthenticate, AdminController.removeAdminAccount);

//Care homes
router.get('/care-homes', adminAuthenticate, CareHomesController.getCareHomes);
router.post('/care-homes', adminAuthenticate, CareHomesController.addCareHome);
router.get('/care-homes/waiting-list', adminAuthenticate, CareHomesController.getCareHomesWaitingList);
router.delete('/care-homes/waiting-list/:id', adminAuthenticate, CareHomesController.deleteCareHomesWaitingUser);
router.get('/care-homes/:id', adminAuthenticate, CareHomesController.getCareHome);
router.put('/care-homes/:id', adminAuthenticate, CareHomesController.updateCareHome);
router.post('/care-homes/:id/credits', adminAuthenticate, CareHomesController.addCredits);
router.post('/care-homes/:id/jobs', adminAuthenticate, JobsController.addJobs);

//Carers
router.get('/carers', adminAuthenticate, CarersController.getCarers);
router.post('/carers', adminAuthenticate, CarersController.addCarer);
router.get('/carers/:id', adminAuthenticate, CarersController.getCarer);
router.put('/carers/:id', adminAuthenticate, CarersController.updateCarer);
router.post('/carers/:id/:resource/upload', adminAuthenticate, CarersController.uploadCarerResource);
router.delete('/carers/:id/:resource/upload', adminAuthenticate, CarersController.deleteCarerResourceFile);
router.post('/carers/:id/deductions', adminAuthenticate, CarersController.addDeduction);

//Jobs
router.get('/jobs', adminAuthenticate, JobsController.getJobs);
router.get('/jobs/:id', adminAuthenticate, JobsController.getJob);
router.put('/jobs/:id/review', adminAuthenticate, JobsController.approveJobReview);
router.put('/jobs/:id/payment-retry', adminAuthenticate, JobsController.retryJobPayment);
router.put('/jobs/:id/challenge', adminAuthenticate, JobsController.resolveJobChallenge);
router.put('/jobs/:id', adminAuthenticate, JobsController.updateJob);
router.put('/jobs/:id/cancel', adminAuthenticate, JobsController.cancelJob);


//documentation
router.get('/documentation', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../public/admin', 'index.html'));
});

module.exports = router;
