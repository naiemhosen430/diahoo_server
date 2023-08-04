
import UserModel from "../user/user.model.js"
import { createPostService, getAllPostService } from "./post.service.js"

export const createPostControler = async (req,res) => {
    try {

        const checkUser = await UserModel.findOne({_id: req.params.id})

        if (!checkUser) {
            return res.status(498).json({
                statusCode: 498,
                message: 'Something went wrong'
            })
        }

        console.log(req.files)
        const postObject ={
            postcontent: req.body.tittle,
            video: req.body.youtubeurl,
            picture: '',
            postownerid: 'jsdfer'
        }
        
        console.log(postObject)
        console.log(req.params.id)

        const data = await createPostService(postObject)

        res.status(200).json({
            statusCode: 200,
            message: 'success',
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllPostControler = async (req,res) => {
    try {
        const data = await getAllPostService()

        if (!data) {
            return res.status(498).json({
                statusCode: 498,
                message: 'Something went wrong'
            })
        }
    
        res.status(200).json({
            statusCode: 200,
            message: 'success',
            total: data.lenghth,
            data: data
        })
    } catch (error) {
        console.log(error)
    }
}