import express from 'express';
import userController from '../Controller/userController';
import subscriptionController from '../Controller/subscriptionController';
import applyController from '../Controller/applyController';
import leadController from '../Controller/leadController';
import auth from '../middleware/auth';
import razorpayController from '../Controller/razorpayController';
import batchController from '../Controller/batchController';
import studyController from '../Controller/studyController';
import submissionController from '../Controller/submissionController';
import Submission from '../model/Submission';
const router = express.Router();


router.post('/signup', userController.signup); 
router.post('/login', userController.login); 
router.post('/forgetpassword', userController.forgetpassword);
router.get('/reset-password', userController.resetpassword);
router.put('/confirm-password/:token' ,   userController.confirmpassword); 
router.get('/profile/', auth,userController.userpofile); 
router.get('/editrecordform/' ,auth , userController.editrecordform); 
router.put('/editprofile/' , auth , userController.editprofile); 
router.post('/create-subscription', auth,  subscriptionController.createNewSubs); 
// router.post('/existing-id', userController.existingid); 
router.post('/image-upload/', auth, userController.imageupload); 
router.get('/listusers/',userController.listusers); 


router.post('/apply-user', applyController.apply); 
router.get('/get-users', applyController.index); 
router.get('/download', applyController.download); 



router.post('/feedback-data', leadController.feedbackdata); 
router.get('/order', auth, razorpayController.order); 

router.post('/paymentverification', razorpayController.paymentverification); 


router.post('/add-batch', batchController.storebatch); 
router.put('/assignbatch/:id' , batchController.assignbatch); 
router.get('/getbatch', batchController.getbatch); 
router.get('/get/', batchController.get); 
router.get('/getbtch/:id', batchController.getbtch); 

router.post('/addassignments', studyController.addassignments); 
router.get('/get_assignments/:batch', studyController.get_assignments);

router.get('/downloadassignment/:batch', studyController.download_assignment); 
router.post('/updatedassignment/' ,auth, submissionController.updatedassignment); 
router.get('/submission/',auth, submissionController.submission); 
router.get('/checksubmission/',auth, submissionController.checksubmission)

export default router;