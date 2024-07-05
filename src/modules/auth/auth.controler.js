import bcryptjs from "bcryptjs";
import UserModel from "./auth.model.js";
import {
  blockService,
  cencelRequestService,
  confirmRequestService,
  createUserService,
  deleteRequestService,
  findOneByIdFromUser,
  findOneByEmailFromUser,
  getSingleUserService,
  sendRequestService,
  unfriendService,
  updateMeService,
} from "./auth.service.js";
import { genarateToken } from "../../utils/genarateToken.js";

export const createUserController = async (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(req.body.fullname);
  console.log(req.body.email);
  console.log(req.body.gender);
  console.log(req.body.password);
  console.log(req.body.birthday);
  try {
    if (
      !req.body.fullname ||
      !req.body.email ||
      !req.body.gender ||
      !req.body.password ||
      !req.body.birthday
    ) {
      return res.status(409).json({
        statusCode: 409,
        message: "All cradencial required.",
      });
    }

    const checkUser = await UserModel.findOne({ email: req.body.email });
    if (checkUser) {
      return res.status(409).json({
        statusCode: 409,
        message: "This email is already in use",
      });
    }

    const hashPassword = bcryptjs.hashSync(req.body.password, 10);
    const userinfo = {
      fullname: req.body.fullname,
      email: req.body.email,
      email: req.body.birthday,
      email: req.body.gender,
      password: hashPassword,
    };

    const result = await createUserService(userinfo);

    if (!result) {
      return res.status(500).json({
        statusCode: 500,
        message: "Something went wrong",
      });
    }

    const tokenObj = {
      userId: result._id,
      role: result.role,
    };

    const token = await genarateToken(tokenObj);

    if (!token) {
      return res.status(500).json({
        statusCode: 500,
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "User created successfully",
      data: result,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(409).json({
        statusCode: 409,
        message: "All cradencial required.",
      });
    }

    const result = await findOneByEmailFromUser(req.body.email);

    if (!result) {
      return res.status(404).json({
        statusCode: 404,
        message: "No account found with this email",
      });
    }

    const checkPassword = await bcryptjs.compare(
      req.body.password,
      result.password
    );

    if (!checkPassword) {
      return res.status(401).json({
        statusCode: 401,
        message: "Password is incorrect",
      });
    }

    const tokenObj = {
      userId: result._id,
      role: result.role,
    };

    const token = await genarateToken(tokenObj);

    if (!token) {
      return res.status(500).json({
        statusCode: 500,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Login success",
      data: result,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export const findMeControler = async (req, res) => {
  try {
    const userd = req.params.id;

    if (!userd) {
      res.status(498).json({
        statusCode: 498,
        message: "Something wrong",
      });
    }

    const data = await findOneByIdFromUser(userd);

    if (!data) {
      res.status(498).json({
        statusCode: 498,
        message: "Something wrong",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleUserControler = async (req, res) => {
  try {
    const id = req.params.id;
    const myid = req.query.myid;
    const data = await getSingleUserService(id, myid);

    if (!data) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatyeMeControler = async (req, res) => {
  try {
    if (!req.body && !req.params.id) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await updateMeService(req);

    if (!data) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendRequestControler = async (req, res) => {
  try {
    if (!req.params.myid && !req.params.id) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const myself = await UserModel.findOne({ _id: req.params.myid });
    const checkRequestmyself = myself.friendrequests || [];
    const flatCheckRequestmyself = [].concat(...checkRequestmyself);
    let foundonmyself = false;
    flatCheckRequestmyself.forEach((id) => {
      if (id === req.params.id) {
        foundonmyself = true;
      }
    });

    const user = await UserModel.findOne({ _id: req.params.id });
    const checkRequest = user.friendrequests || [];
    const flatCheckRequest = [].concat(...checkRequest);
    let found = false;
    flatCheckRequest.forEach((id) => {
      if (id === req.params.myid) {
        found = true;
      }
    });

    if (foundonmyself) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }
    if (found) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await sendRequestService(req.params.id, req.params.myid);

    if (!data) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const cencelRequestControler = async (req, res) => {
  try {
    if (!req.params.myid && !req.params.id) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await cencelRequestService(req.params.id, req.params.myid);

    if (!data) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const confirmRequestControler = async (req, res) => {
  try {
    if (!req.params.myid && !req.params.id) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await confirmRequestService(req.params.id, req.params.myid);

    if (!data) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRequestControler = async (req, res) => {
  try {
    if (!req.params.myid && !req.params.id) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await deleteRequestService(req.params.id, req.params.myid);

    if (!data) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const unfriendControler = async (req, res) => {
  try {
    if (!req.params.myid && !req.params.id) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await unfriendService(req.params.id, req.params.myid);

    if (!data) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const blockControler = async (req, res) => {
  try {
    if (!req.params.myid && !req.params.id) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await blockService(req.params.id, req.params.myid);

    if (!data) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
