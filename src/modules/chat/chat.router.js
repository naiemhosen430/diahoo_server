import express from "express";
import { authentication } from "./../../utils/Authentication.js";
import {
  getMyConviersion,
  getSinglePersonChatControler,
} from "./chat.controler.js";
const chatRouter = express.Router();

chatRouter.route("/person/:myid/:friendid").get(getSinglePersonChatControler);

chatRouter.route("/myconversion").get(authentication, getMyConviersion);

export default chatRouter;
