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

//Care homes
router.get('/carehomes', adminAuthenticate, CareHomesController.getCareHomes);
router.get('/carehomes/:id', adminAuthenticate, CareHomesController.getCareHome);
router.post('/carehomes/', adminAuthenticate, CareHomesController.addCarer);
router.put('/carehomes/:id', adminAuthenticate, CareHomesController.updateCareHome);

//Carers
router.get('/carers', adminAuthenticate, CarersController.getCarers);
router.post('/carers', adminAuthenticate, CarersController.addCarer);
router.get('/carers/:id', adminAuthenticate, CarersController.getCarer);
router.put('/carers/:id', adminAuthenticate, CarersController.updateCarer);
router.post('/carers/:id/:resource/upload', adminAuthenticate, CarersController.uploadCarerResource);
router.delete('/carers/:id/:resource/upload', adminAuthenticate, CarersController.deleteCarerResourceFile);

//Jobs
router.get('/jobs', adminAuthenticate, JobsController.getJobs);
router.get('/jobs/:id', adminAuthenticate, JobsController.getJob);
router.put('/jobs/:id/review', adminAuthenticate, JobsController.approveJobReview);
router.put('/jobs/:id/payment-retry', adminAuthenticate, JobsController.retryJobPayment);
router.put('/jobs/:id/challenge', adminAuthenticate, JobsController.resolveJobChallenge);
router.put('/jobs/:id', adminAuthenticate, JobsController.updateJob);
router.put('/jobs/:id/cancel', adminAuthenticate, JobsController.cancelJob);


//Jobs
router.post('/care-homes/:id/jobs', adminAuthenticate, JobsController.addJobs);


//documentation
router.get('/documentation', (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../public/admin', 'index.html'));
});

module.exports = router;
