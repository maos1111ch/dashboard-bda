import { sql } from "@vercel/postgres";

import { NextApiResponse, NextApiRequest } from "next";
export default (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request;

  switch (method) {
    case "GET":
      response
        .status(200)
        .json({ success: false, message: "getting products", data: null });
      break;
    default:
      response
        .status(404)
        .json({ success: false, message: "method invalid.", data: null });
      break;
  }
  response.json("products");
};
