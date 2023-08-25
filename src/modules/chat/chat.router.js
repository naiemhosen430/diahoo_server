import express from "express";
import {
  getMyConviersion,
  getSinglePersonChatControler,
} from "./chat.controler.js";
const chatRouter = express.Router();

chatRouter.route("/person/:myid/:friendid").get(getSinglePersonChatControler);

chatRouter.route("/myconversion/:myid").get(getMyConviersion);

export default chatRouter;
