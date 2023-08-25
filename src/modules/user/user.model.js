import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    fullname: {
      type: "String",
      required: "true",
      validate: [
        {
          validator: (value) => validator.isLength(value, { min: 3, max: 50 }),
          message: "Name must be between 3 and 50 characters.",
        },
      ],
      default: "",
    },
    coverphoto: {
      type: "String",
      required: true,
      default: "default.jpeg",
    },
    profilephoto: {
      type: "String",
      required: true,
      default: "default.jpeg",
    },
    tittle: {
      type: "string",
      minLength: 0,
      required: true,
      maxLength: 300,
      default: "not set",
    },
    age: {
      type: "Number",
      required: true,
      min: 12,
      max: 100,
      default: 12,
    },
    gender: {
      type: "String",
      required: true,
      enum: ["male", "female", "not set"],
      default: "not set",
    },
    hometwon: {
      type: "string",
      required: true,
      minLength: 0,
      maxLength: 50,
      default: "not set",
    },
    friendrequests: {
      required: true,
      type: "Array",
      default: [],
    },
    sendrequests: {
      required: true,
      type: "Array",
      default: [],
    },
    friends: {
      required: true,
      type: "Array",
      default: [],
    },
    homecity: {
      type: "string",
      required: true,
      minLength: 0,
      maxLength: 50,
      default: "not set",
    },
    birthday: {
      type: "string",
      required: true,
      minLength: 0,
      maxLength: 50,
      default: "not set",
    },
    online_status: {
      type: "number",
    },
    email: {
      type: "String",
      required: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email format.",
      },
    },
    password: {
      type: "String",
      required: true,
    },
    verificationCode: {
      type: "Number",
    },
    note: {
      type: "Array",
    },
    position: {
      type: "string",
      required: true,
      minLength: 0,
      maxLength: 50,
      default: "not set",
    },
    relationshipstatus: {
      type: "string",
      required: true,
      minLength: 0,
      maxLength: 50,
      default: "Single",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("user", userSchema);
export default UserModel;
