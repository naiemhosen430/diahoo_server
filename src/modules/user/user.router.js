import express from "express";
import {
  blockControler,
  cencelRequestControler,
  confirmRequestControler,
  createUserController,
  deleteRequestControler,
  findMeControler,
  getSingleUserControler,
  loginUserController,
  sendRequestControler,
  unfriendControler,
  updatyeMeControler,
} from "./user.controler.js";

const userRouter = express.Router();

userRouter.route("/create").post(createUserController);

userRouter.route("/login").post(loginUserController);

userRouter.route("/public/:id").get(getSingleUserControler);

userRouter.route("/sendrequest/:id/:myid").post(sendRequestControler);

userRouter.route("/cencelrequest/:id/:myid").post(cencelRequestControler);

userRouter.route("/confirmrequest/:id/:myid").post(confirmRequestControler);

userRouter.route("/deleterequest/:id/:myid").post(deleteRequestControler);

userRouter.route("/unfriend/:id/:myid").post(unfriendControler);

userRouter.route("/block/:id/:myid").post(blockControler);

userRouter.route("/me/:id").get(findMeControler);

userRouter.route("/me/edit/:id").put(updatyeMeControler);

export default userRouter;
