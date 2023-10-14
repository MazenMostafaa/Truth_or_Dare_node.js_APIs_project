import { Router } from "express";
import { asyncHandler } from '../../utils/asyncHandler.js'
import * as mc from './message.controllers.js'
import { isAuth } from "../../Middlewares/auth.js";
const router = Router()


router.post('/sendMsg', asyncHandler(mc.sendMsg))
router.get('/getUserMsgs', isAuth(), asyncHandler(mc.getUserMsgs))
router.delete('/deleteMsg/:msgId', isAuth(), asyncHandler(mc.deleteMsg))

export default router