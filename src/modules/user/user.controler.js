import bcryptjs from 'bcryptjs'
import UserModel from './user.model.js'
import { createUserService } from './user.service.js'
import { genarateToken } from '../../utils/genarateToken.js'
import { accountAccessName } from '../../../secret.js'


export const createUserControler = async (req, res) => {
  try {
    const checkUser = await UserModel.findOne({ email: req.body.email })
    if (checkUser) {
      return res.status(409).json({
        statusCode: 409,
        message: 'This email is already in used',
      })
    }

    if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Password and confirm password do not match',
      })
    }

    const hashPassword = await bcryptjs.hashSync(req.body.password, 10)
    const userinfo = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashPassword,
    }

    const result = await createUserService(userinfo)

    if (!result) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Something went wrong',
      })
    }

    const tokenObj = {
      userId: result._id
    }

    const token = await genarateToken(tokenObj)

    return res.status(201).json({
      statusCode: 201,
      message: 'User created successfully',
      data: token
    })

    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    })
  }
}
