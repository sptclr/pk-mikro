import { apiRequest, appendParam } from "@/utils/helper";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  let url = `${process.env.BE_PKMIKRO}/province/getProvince`;
  const searchParams = req.nextUrl.searchParams;

  if (searchParams.get("name"))
    url = appendParam(url, "name", searchParams.get("name"), true);
  if (searchParams.get("id"))
    url = appendParam(url, "id", searchParams.get("id"));
  return apiRequest(url, req);
}
