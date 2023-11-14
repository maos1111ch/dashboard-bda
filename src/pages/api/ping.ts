import { NextApiResponse, NextApiRequest } from "next";
export default (request: NextApiRequest, response: NextApiResponse) => {
  return response.json({ message: "pong" });
};
