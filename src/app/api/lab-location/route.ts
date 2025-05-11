import { apiRequest } from "@/utils/helper";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const url = `${process.env.BE_PKMIKRO}/lab_location/get`;
  return apiRequest(url, req);
}
