import { Schema, model } from "mongoose";

const chatschema = new Schema(
  {
    chatIds: {
      type: "array",
      default: [],
    },
    messages: {
      type: "array",
      default: [],
    },
    type: {
      type: "String",
      required: true,
      enum: ["chat", "group"],
      default: "chat",
    },
  },
  {
    timestamps: true,
  }
);

const chatmodel = new model("chat", chatschema);
export default chatmodel;
