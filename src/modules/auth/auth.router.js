import express from "express";
import {
  createUserController,
  findMeControler,
  loginUserController,
  updatyeMeControler,
} from "./auth.controler.js";

const authRouter = express.Router();

authRouter.route("/register").post(createUserController);

authRouter.route("/login").post(loginUserController);

authRouter.route("/me").get(findMeControler);

authRouter.route("/update").put(updatyeMeControler);

export default authRouter;
