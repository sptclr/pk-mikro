import { apiRequest } from "@/utils/helper";
import { NextRequest } from "next/server";

const handler = async (req: NextRequest) => {
  const url = `${process.env.AUTH_ENDPOINT}/address/create`;
  return await apiRequest(url, req);
};

export default handler;
