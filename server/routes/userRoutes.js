const express = require('express');
const { loginController, registerController, authController,applyDoctorController ,getAllNotificationController} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');



const router = express.Router();

router.post('/login',loginController);
router.post('/register',registerController);

router.post('/getUserData,authMiddleware,authController')

router.post('/applydoctor,authMiddleware,applyDoctorController')

router.post('/get-all-notification,authMiddleware,getAllNotificationController')



module.exports = router;