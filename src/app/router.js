import express from "express";
import userRouter from "../modules/user/user.router.js";
import postRouter from "../modules/post/post.router.js";
const router = express.Router()

router.get('/', (req,res) => {
    
console.log(req.signedCookies.diahoologinaccess)

    res.json('Diahoo server is runing')
})

// user router
router.use('/api/v1/user', userRouter)
router.use('/api/v1/post', postRouter)

export default router