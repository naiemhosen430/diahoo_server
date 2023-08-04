import postmodel from "./post.model.js"

export const createPostService = async (req) => {
    const result = await postmodel.create(req)
    return result
}

export const getAllPostService = async () => {
    const result = await postmodel.find()
    return result
}