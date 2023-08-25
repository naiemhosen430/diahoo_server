import postmodel from "../post/post.model.js";
import UserModel from "../user/user.model.js";

export const searchService = async (text) => {
  const searchText = new RegExp(text, "i");

  const users = await UserModel.find({ fullname: { $regex: searchText } });
  const posts = await postmodel.find({ postcontent: { $regex: searchText } });

  const result = {
    users,
    posts,
  };
  return result;
};
