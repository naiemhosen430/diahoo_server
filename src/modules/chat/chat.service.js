import chatmodel from "./chat.model.js";

export const getSinglePersonChatService = async (req) => {
  const idsObject = [req.params.myid, req.params.friendid];
  const newChat = new chatmodel();
  await newChat.save();
  await chatmodel.updateOne(
    { _id: newChat._id },
    {
      $push: {
        chatIds: idsObject,
        messages: {
          ownerId: req.params.myid,
          mstContent: "Chat has started",
          sendtime: new Date(),
          status: "",
        },
      },
    }
  );
  const result = await chatmodel.findOne({ _id: newChat._id });

  return result;
};

export const getMyConversionService = async (myIdForChat) => {
  const data = await chatmodel.find({
    $or: [{ "chatIds.0.0": myIdForChat }, { "chatIds.0.1": myIdForChat }],
  });

  return data;
};
