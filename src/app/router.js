import express from "express";
import userRouter from "../modules/user/user.router.js";
const router = express.Router()

router.get('/', (req,res) => {
    
console.log(req.signedCookies.diahoologinaccess)

    res.json('hello world')
})

// user router
router.use('/api/v1/user', userRouter)

export default router