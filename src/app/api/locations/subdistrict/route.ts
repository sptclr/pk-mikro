import { apiRequest, appendParam } from "@/utils/helper";
import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  let url = `${process.env.BE_PKMIKRO}/subdistrict/getSubDistrict`;

  if (searchParams.get("district_id"))
    url = appendParam(
      url,
      "district_id",
      searchParams.get("district_id") as string,
      true
    );
  if (searchParams.get("name"))
    url = appendParam(url, "name", searchParams.get("name") as string);
  return apiRequest(url, req);
}
