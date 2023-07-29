import express from 'express'
import { createUserControler } from './user.controler.js'
const userRouter = express.Router()

userRouter.route('/create')
.post(createUserControler)

export default userRouter