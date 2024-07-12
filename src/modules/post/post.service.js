import PostModel from "./post.model.js";

export const createPostService = async (req) => {
  const result = await PostModel.create(req);
  return result;
};

export const getAllPostService = async () => {
  const result = await PostModel.aggregate([{ $sample: { size: 5 } }]);
  return result;
};

export const submitCommentService = async (submiterid, postid, content) => {
  const comment = {
    commenterid: submiterid,
    commenttext: content,
    time: new Date(),
  };

  const result = await PostModel.updateOne(
    { _id: postid },
    {
      $push: {
        comment: comment,
      },
    }
  );
  return result;
};

export const likeService = async (req) => {
  const userd = req.user.userId;

  const newlike = {
    time: new Date(),
    likeduserid: userd,
  };

  const result = await PostModel.updateOne(
    { _id: req.params.postid },
    {
      $push: {
        like: newlike,
      },
    }
  );

  return result;
};

export const disLikeService = async (req) => {
  const userd = req.user.userId;

  const result = await PostModel.updateOne(
    { _id: req.params.postid },
    {
      $pull: { like: { likeduserid: userd } },
    }
  );

  return result;
};

export const geMyPostService = async (req) => {
  const result = await PostModel.find({ postownerid: req.params.id });
  return result.reverse();
};
