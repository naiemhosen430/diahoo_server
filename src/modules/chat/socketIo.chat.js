import chatmodel from "./chat.model.js";

const sendMessage = (io) => {
  io.on("connection", (client) => {
    client.on("messageText", (message) => {
      const { mstContent, ownerId, sendtime, status, msgid } = message;
      const msgObj = {
        mstContent,
        ownerId,
        sendtime,
        status,
      };
      console.log(msgObj);
      chatmodel
        .updateOne(
          { _id: msgid },
          {
            $push: {
              messages: msgObj,
            },
          }
        )
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });

      chatmodel
        .findOne({ _id: msgid })
        .then((updatedMessage) => {
          if (updatedMessage) {
            io.emit("updatedMessage", updatedMessage);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
};
export default sendMessage;
