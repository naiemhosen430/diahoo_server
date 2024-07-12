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

const postRouter = express.Router();

postRouter.route("/").get(getAllPostControler);

postRouter.route("/:id").get(getMyPostControler);

postRouter
  .route("/create/:id")
  .post(createPostControler, upload.array("file", 10));

postRouter.route("/comment/submit/:id/:postid").post(submitCommentControler);

postRouter.route("/like/:likerid/:postid/:postownerid").post(likeControler);

postRouter
  .route("/dislike/:likerid/:postid/:psostownerid")
  .post(disLikeControler);

export default postRouter;
