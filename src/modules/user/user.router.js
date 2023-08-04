import express from 'express'
import { createUserController, findMeControler, loginUserController } from './user.controler.js'

const userRouter = express.Router()

userRouter.route('/create')
.post(createUserController)

userRouter.route('/login')
.post(loginUserController)

userRouter.route('/me/:id')
.get(findMeControler)

export default userRouter