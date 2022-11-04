import express from 'express';
import helpController from '../Controller/helpController';
const router = express.Router();


router.post('/signup', helpController.signup); 
router.post('/login', helpController.login); 
router.post('/forgetpassword', helpController.forgetpassword);
router.get('/reset-password', helpController.resetpassword);
router.put('/confirm-password/:token' ,   helpController.confirmpassword); 
export default router;