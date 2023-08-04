import bcryptjs from 'bcryptjs'
import UserModel from './user.model.js'
import { createUserService, findMeService, loginUserService } from './user.service.js'
import { genarateToken } from '../../utils/genarateToken.js'


export const createUserController = async (req, res) => {
  try {
    const checkUser = await UserModel.findOne({ email: req.body.email })
    if (checkUser) {
      return res.status(409).json({
        statusCode: 409,
        message: 'This email is already in use',
      })
    }
    console.log(req.body.password, req.body.confirmpassword)

    if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Password and confirm password do not match',
      })
    }

    const hashPassword = bcryptjs.hashSync(req.body.password, 10)
    const userinfo = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashPassword,
    }

    const result = await createUserService(userinfo)

    if (!result) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Something went wrong',
      })
    }

    const tokenObj = {
      userId: result._id
    }

    const token = await genarateToken(tokenObj)

    if (!token) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Something went wrong',
      })
    }

    return res.status(200).json({
      statusCode: 200,
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

export const loginUserController = async (req, res) => {
  try {
    const result = await loginUserService(req)

    if (!result) {
      return res.status(404).json({
        statusCode: 404,
        message: 'No account found with this email',
      })
    }

    const checkPassword = await bcryptjs.compare(req.body.password, result.password)

    console.log(checkPassword)
    if (!checkPassword) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Password is incorrect',
      })
    }

    const tokenObj = {
      userId: result._id
    }

    const token = await genarateToken(tokenObj)

    if (!token) {
      return res.status(500).json({
        statusCode: 500,
        message: 'Something went wrong',
      })
    }

    res.status(200).json({
      statusCode: 200,
      message: 'Login success',
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

export const findMeControler = async (req,res) => {
  try {
    const userd = req.params.id

    if (!userd) {
      res.status(498).json({
        statusCode: 498,
        message: 'Something wrong',
      })
    }
    
    const data = await findMeService(userd)

    if (!data) {
      res.status(498).json({
        statusCode: 498,
        message: 'Something wrong',
      })
    }

    res.status(200).json({
      statusCode: 200,
      message: 'success',
      data: data
    })
  } catch (error) {
    console.log(error)
  }
}