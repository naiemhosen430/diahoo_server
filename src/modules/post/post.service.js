import postmodel from "./post.model.js"

export const createPostService = async (req) => {
    const result = await postmodel.create(req)
    return result
}

export const getAllPostService = async () => {
    const result = await postmodel.find()
    return result
}

export const submitCommentService = async (submiterid, postid, content) => {
    const comment = {
        commenterid: submiterid,
        commenttext: content,
        time: new Date()
    }

    const result = await postmodel.updateOne({_id : postid}, {
        $push: {
            comment : comment
        }
    })
    return result
}

export const likeService = async (req) => {
    const newlike = {
        postid: req.params.postid,
        likeduserid: req.params.likerid,
        postownerid: req.params.postownerid,
    }

    const result = await postmodel.updateOne({_id: req.params.postid},{
        $push : {
            like : newlike
        }
    })
    
    return result
}

export const disLikeService = async (req) => {

    const result = await postmodel.updateOne({_id: req.params.postid},{
        $pull : {like : {likeduserid : req.params.likerid}}}
    )
    
    return result
}

export const geMyPostService = async (req) => {
    const result = await postmodel.find({postownerid: req.params.mypost})
    return result.reverse()
}