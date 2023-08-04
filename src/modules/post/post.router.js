import express from 'express'
import { createPostControler, getAllPostControler } from './post.controler.js'
import upload from '../../utils/uploadSingleIm,age.js'



const postRouter = express.Router()

postRouter.route('/')
.get(getAllPostControler)

postRouter.route('/create/:id')
.post(createPostControler, upload.array('file', 10))



export default postRouter