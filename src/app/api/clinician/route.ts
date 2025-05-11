import { apiRequest } from "@/utils/helper";
import { NextRequest } from "next/server";

export function POST(req: NextRequest) {
  const url = `${process.env.BE_PKMIKRO}/emaster/clinician`;

  return apiRequest(url, req);
}
