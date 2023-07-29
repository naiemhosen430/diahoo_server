import UserModel from "./user.model.js"

export const createUserService = async (userinfo) => {
    const result = await UserModel.create(userinfo)
    return result
}