import express from 'express'
import { createUserController, findMeControler, getSingleUserControler, loginUserController, updatyeMeControler } from './user.controler.js'

const userRouter = express.Router()

userRouter.route('/create')
.post(createUserController)

userRouter.route('/login')
.post(loginUserController)

userRouter.route('/:id')
.get(getSingleUserControler)

userRouter.route('/me/:id')
.get(findMeControler)

userRouter.route('/me/edit/:id')
.put(updatyeMeControler)



export default userRouter