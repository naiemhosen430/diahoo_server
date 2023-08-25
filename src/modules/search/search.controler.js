import { searchService } from "./serach.service.js";

export const searchControler = async (req, res) => {
  try {
    if (!req.params.text) {
      return res.status(498).json({
        statusCode: 498,
        message: "Something went wrong",
      });
    }

    const data = await searchService(req.params.text);

    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
};
