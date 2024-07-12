import postmodel from "./post.model.js";
import {
  createPostService,
  disLikeService,
  geMyPostService,
  getAllPostService,
  likeService,
  submitCommentService,
} from "./post.service.js";

export const createPostControler = async (req, res) => {
  try {
    const checkUser = await UserModel.findOne({ _id: req.params.id });

    if (!checkUser) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const postObject = {
      postcontent: req.body.tittle,
      video: req.body.youtubeurl,
      picture: "",
      postownerid: req.params.id,
    };

    const data = await createPostService(postObject);

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPostControler = async (req, res) => {
  try {
    const data = await getAllPostService();

    if (!data) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "success",
      total: data.lenghth,
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const submitCommentControler = async (req, res) => {
  try {
    if (!req.params.postid) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    if (!req.body.commentText) {
      return res.status(498).json({
        statusCode: 498,
        message: "type Something",
      });
    }

    const post = await postmodel.findOne({ _id: req.params.postid });

    if (!post) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await submitCommentService(
      req.user.userId,
      req.params.postid,
      req.body.commentText
    );
    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likeControler = async (req, res) => {
  try {
    if (!req.params.postid) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await likeService(req);

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const disLikeControler = async (req, res) => {
  try {
    if (!req.params.likerid && !req.params.postid && !req.params.postownerid) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await disLikeService(req);

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(RegExp);
  }
};

export const getMyPostControler = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await geMyPostService(req);

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
