import express from "express"
import { LogIn, passwordResetRequest, resetPassword, UserProfile, UserSingUp} from "../controllers/user.js";
import { verifyEmail } from "../controllers/emailVerify.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();



router.post('/signup', UserSingUp);
router.post('/login', LogIn);
router.get('/verify-email', verifyEmail);
router.post('/request-password-reset',passwordResetRequest);
router.post('/reset-password',resetPassword);
router.get('/user/profile',isAuthenticatedUser,UserProfile);




export default router;