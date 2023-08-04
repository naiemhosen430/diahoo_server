import UserModel from "./user.model.js"

export const createUserService = async (userinfo) => {
    const result = await UserModel.create(userinfo)
    return result
}

export const loginUserService = async (req) => {
    const result = await UserModel.findOne({email:req.body.email})
    return result
}

export const findMeService = async (ruseridq) => {
    const result = await UserModel.findOne({_id: ruseridq})
    return result
}