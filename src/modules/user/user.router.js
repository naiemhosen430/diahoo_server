import express from "express";
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

userRouter.route("/sendrequest/:id").post(sendRequestControler);

userRouter.route("/cencelrequest/:id").post(cencelRequestControler);

userRouter.route("/confirmrequest/:id").post(confirmRequestControler);

userRouter.route("/deleterequest/:id").post(deleteRequestControler);

userRouter.route("/unfriend/:id").post(unfriendControler);

userRouter.route("/block/:id").post(blockControler);

export default userRouter;
