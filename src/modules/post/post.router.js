import express from "express";
import {
  createPostControler,
  disLikeControler,
  getAllPostControler,
  getMyPostControler,
  likeControler,
  submitCommentControler,
} from "./post.controler.js";
import upload from "../../utils/uploadSingleIm,age.js";
import { authentication } from "./../../utils/Authentication.js";

const postRouter = express.Router();

postRouter.route("/").get(getAllPostControler);

postRouter.route("/user/:id").get(getMyPostControler);

postRouter
  .route("/create/:id")
  .post(createPostControler, upload.array("file", 10));

postRouter
  .route("/comment/submit/:postid")
  .put(authentication, submitCommentControler);

postRouter.route("/like/:postid").put(authentication, likeControler);

postRouter.route("/dislike/:postid").put(authentication, disLikeControler);

export default postRouter;
