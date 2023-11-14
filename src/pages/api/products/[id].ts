import { NextApiResponse, NextApiRequest } from "next";
export default (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "GET":
      response.json({
        success: false,
        message: "getting unique products",
        data: null,
      });
      break;
    case "PUT":
      response.json({
        success: false,
        message: "updating unique products",
        data: null,
      });
      break;
    case "DELETE":
      response.json({
        success: false,
        message: "deleting unique products",
        data: null,
      });
      break;
    default:
      response
        .status(400)
        .json({ success: false, message: "method invalid.", data: null });
      break;
  }
  response.json("products");
};
