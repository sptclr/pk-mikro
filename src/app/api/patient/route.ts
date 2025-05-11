import { apiRequest } from "@/utils/helper";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const url = `${process.env.BE_PKMIKRO}/patient/gets`;
  return apiRequest(url, req);
}

export function POST(req: NextRequest) {
  const url = `${process.env.BE_PKMIKRO}/patient/create`;
  return apiRequest(url, req);
}
