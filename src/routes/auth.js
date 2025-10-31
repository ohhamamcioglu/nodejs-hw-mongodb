import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  refreshUserSessionController,
  logoutUserController,
  sendResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';

const router = Router();

router.post('/auth/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
router.post('/auth/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post('/auth/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/auth/logout', ctrlWrapper(logoutUserController));
router.post('/auth/send-reset-email', ctrlWrapper(sendResetEmailController));
router.post('/auth/reset-pwd', ctrlWrapper(resetPasswordController));

export default router;