import express from 'express';
import helpController from '../Controller/helpController';
import subscriptionController from '../Controller/subscriptionController';
import userController from '../Controller/userController';
import leadController from '../Controller/leadController';
const router = express.Router();


router.post('/signup', helpController.signup); 
router.post('/login', helpController.login); 
router.post('/forgetpassword', helpController.forgetpassword);
router.get('/reset-password', helpController.resetpassword);
router.put('/confirm-password/:token' ,   helpController.confirmpassword); 
router.get('/profile/', helpController.userpofile); 

router.get('/edit-profile/:id' , helpController.editrecordform); 
router.put('/editprofile/:id' , helpController.editprofile); 
router.post('/create-subscription', subscriptionController.createNewSubs); 
router.post('/existing-id', helpController.existingid); 



router.post('/apply-user', userController.apply); 
router.get('/get-users', userController.index); 



router.post('/feedback-data', leadController.feedbackdata); 
export default router;