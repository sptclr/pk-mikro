import { apiRequest } from "@/utils/helper";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const url = `${process.env.AUTH_ENDPOINT}/address/update/${id}`;

  return await apiRequest(url, req); // Pastikan apiRequest support NextRequest
};
