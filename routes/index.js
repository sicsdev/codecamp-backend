import express from 'express';
import helpController from '../Controller/helpController';
import subscriptionController from '../Controller/subscriptionController';
import userController from '../Controller/userController';
import leadController from '../Controller/leadController';
import auth from '../middleware/auth';
import razorpayController from '../Controller/razorpayController';
import batchController from '../Controller/batchController';
import studyController from '../Controller/studyController';
const router = express.Router();


router.post('/signup', helpController.signup); 
router.post('/login', helpController.login); 
router.post('/forgetpassword', helpController.forgetpassword);
router.get('/reset-password', helpController.resetpassword);
router.put('/confirm-password/:token' ,   helpController.confirmpassword); 
router.get('/profile/', auth,helpController.userpofile); 
router.get('/edit-profile/' ,auth , helpController.editrecordform); 
router.put('/editprofile/' , auth , helpController.editprofile); 
router.post('/create-subscription', auth,  subscriptionController.createNewSubs); 
// router.post('/existing-id', helpController.existingid); 
router.post('/image-upload/', auth, helpController.imageupload); 
router.get('/listusers/',helpController.listusers); 


router.post('/apply-user', userController.apply); 
router.get('/get-users', userController.index); 
router.get('/download', userController.download); 



router.post('/feedback-data', leadController.feedbackdata); 
router.get('/order', auth, razorpayController.order); 

router.post('/paymentverification', razorpayController.paymentverification); 


router.post('/add-batch', batchController.storebatch); 
router.put('/assignbatch/:id' , batchController.assignbatch); 
router.get('/getbatch', batchController.getbatch); 
router.get('/get/', batchController.get); 
router.post('/addassignments', studyController.addassignments); 




export default router;