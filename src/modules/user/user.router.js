import express from "express";
import { authentication } from "./../../utils/Authentication.js";
import {
  blockControler,
  cencelRequestControler,
  confirmRequestControler,
  deleteRequestControler,
  getSingleUserControler,
  sendRequestControler,
  unfriendControler,
  getAllUserControler,
} from "./user.controler.js";

const userRouter = express.Router();

userRouter.route("/").get(getAllUserControler);

userRouter.route("/:id").get(getSingleUserControler);

userRouter.route("/sendrequest/:id").post(authentication, sendRequestControler);

userRouter
  .route("/cencelrequest/:id")
  .post(authentication, cencelRequestControler);

userRouter
  .route("/confirmrequest/:id")
  .post(authentication, confirmRequestControler);

userRouter
  .route("/deleterequest/:id")
  .post(authentication, deleteRequestControler);

userRouter.route("/unfriend/:id").post(authentication, unfriendControler);

userRouter.route("/block/:id").post(authentication, blockControler);

export default userRouter;
