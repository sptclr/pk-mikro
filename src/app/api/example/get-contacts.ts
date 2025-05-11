import { apiRequest, appendParam } from "@/utils/helper";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  let url = `${process.env.AUTH_ENDPOINT}/contact/gets`;

  url = appendParam(url, "sort", "created_at:desc", true);
  if (searchParams.get("skip"))
    url = appendParam(url, "skip", searchParams.get("skip") as string);
  if (searchParams.get("take"))
    url = appendParam(url, "take", searchParams.get("take") as string);
  if (searchParams.get("contact_types"))
    url = appendParam(
      url,
      "contact_types",
      searchParams.get("contact_types") as string
    );
  if (searchParams.get("name"))
    url = appendParam(url, "name", searchParams.get("name") as string);

  return await apiRequest(url, req); // Mungkin perlu sesuaikan juga apiRequest kamu
};
