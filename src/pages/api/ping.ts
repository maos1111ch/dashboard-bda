import { connection } from "@/utils/database";
import { NextApiResponse, NextApiRequest } from "next";
export default async (request: NextApiRequest, response: NextApiResponse) => {
  const test = await connection.query("SELECT NOW()");
  console.log(test)
  return response.json({ message: "pong" });
};
