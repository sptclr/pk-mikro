import { apiRequest } from "@/utils/helper";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const url = `${process.env.BE_PKMIKRO}/enum/priorityType`;

  return apiRequest(url, req);
}
