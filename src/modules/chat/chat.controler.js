import chatmodel from "./chat.model.js";
import {
  getMyConversionService,
  getSinglePersonChatService,
} from "./chat.service.js";

export const getSinglePersonChatControler = async (req, res) => {
  try {
    if (
      req.params.myid === "undefined" ||
      req.params.friendid === "undefined"
    ) {
      return res.status(400).json({
        statusCode: 400,
        message: "Bad Request: Missing myid or friendid",
      });
    }

    if (!req.params.myid || !req.params.friendid) {
      return res.status(400).json({
        statusCode: 400,
        message: "Bad Request: Missing myid or friendid",
      });
    }

    const myfriend = await UserModel.findOne({ _id: req.params.friendid });
    const mySelf = await UserModel.findOne({ _id: req.params.myid });

    if (!myfriend || !mySelf) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
    }

    const chatCheck = await chatmodel.findOne({
      $and: [
        {
          $or: [
            { "chatIds.0.0": req.params.myid },
            { "chatIds.0.1": req.params.myid },
          ],
        },
        {
          $or: [
            { "chatIds.0.0": req.params.friendid },
            { "chatIds.0.1": req.params.friendid },
          ],
        },
      ],
    });

    if (chatCheck) {
      res.status(200).json({
        statusCode: 200,
        message: "success",
        data: chatCheck,
      });
    } else {
      const data = await getSinglePersonChatService(req);

      res.status(200).json({
        statusCode: 200,
        message: "success",
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMyConviersion = async (req, res) => {
  try {
    if (!req.params.myid) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await getMyConversionService(req.params.myid);

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
