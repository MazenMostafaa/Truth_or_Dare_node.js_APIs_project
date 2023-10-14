import { Router } from "express";
const router = Router()
import * as uc from './user.controllers.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
import { isAuth } from "../../Middlewares/auth.js";

router.post('/signUp', asyncHandler(uc.signUp))
router.get('/signIn', asyncHandler(uc.signIn))
router.patch('/updateUser', isAuth(), asyncHandler(uc.updateUser))
router.get('/getUserData/:_id', asyncHandler(uc.getUserData))


export default router