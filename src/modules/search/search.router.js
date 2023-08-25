import express from "express";
import { searchControler } from "./search.controler.js";
const searchRouter = express.Router();

searchRouter.route("/:text").get(searchControler);

export default searchRouter;
