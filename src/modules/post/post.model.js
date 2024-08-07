import { Schema, model } from "mongoose";

const postscheama = new Schema(
  {
    postcontent: {
      type: "string",
      pattern: "^(?!.*(sex|Sex|SEX|porn|Porn|PORN|xxx|XXX)).{1,50}$",
      errorMessage:
        "Name must not contain sexual words and be 50 characters or less.",
      default: "",
    },
    picture: {
      required: false,
      type: "Array",
      default: "",
    },
    video: {
      required: false,
      type: "Array",
      default: "",
    },
    postownerid: {
      required: true,
      type: "string",
    },
    like: {
      required: true,
      type: "Array",
      default: [],
    },
    comment: {
      required: true,
      type: "Array",
      default: [],
    },
    blockfor: {
      required: true,
      type: "Array",
      default: [],
    },
    type: {
      required: true,
      type: "String",
      default: "post",
      enum: ["post", "video", "sv"],
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = new model("post", postscheama);
export default PostModel;
