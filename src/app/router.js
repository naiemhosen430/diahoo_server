import express from "express";
import userRouter from "../modules/user/user.router.js";
import postRouter from "../modules/post/post.router.js";
import chatRouter from "../modules/chat/chat.router.js";
import searchRouter from "../modules/search/search.router.js";
import ntfRouter from "../modules/Notification/ntf.Router.js";
import authRouter from "../modules/auth/auth.router.js";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("diahoo serber is runing");

  res.json("Diahoo server is runing");
});

// user router
router.use("/api/v1/auth", authRouter);
// router.use("/api/v1/user", userRouter);
router.use("/api/v1/post", postRouter);
router.use("/api/v1/chat", chatRouter);
router.use("/api/v1/search", searchRouter);
router.use("/api/v1/ntf", ntfRouter);

export default router;
