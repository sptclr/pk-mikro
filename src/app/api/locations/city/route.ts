import { apiRequest, appendParam } from "@/utils/helper";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  let url = `${process.env.BE_PKMIKRO}/city/getCity`;

  if (searchParams.get("province_id"))
    url = appendParam(
      url,
      "province_id",
      searchParams.get("province_id") as string,
      true
    );
  if (searchParams.get("name"))
    url = appendParam(url, "name", searchParams.get("name") as string);
  return apiRequest(url, req);
}
