import { apiRequest, appendParam } from "@/utils/helper";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  let url = `${process.env.BE_PKMIKRO}/district/getDistrict`;

  if (searchParams.get("city_id"))
    url = appendParam(
      url,
      "city_id",
      searchParams.get("city_id") as string,
      true
    );
  if (searchParams.get("name"))
    url = appendParam(url, "name", searchParams.get("name") as string);
  return apiRequest(url, req);
}
