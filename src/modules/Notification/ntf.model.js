import { Schema, model } from "mongoose";

const ntfSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const NotificationModel = model("notification", ntfSchema);

export default NotificationModel;
