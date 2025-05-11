import { apiRequest } from "@/utils/helper";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const url = `${process.env.AUTH_ENDPOINT}/contact/get/${id}`;

  const response = await apiRequest(url, req); // Pastikan apiRequest kamu bisa handle NextRequest

  return NextResponse.json(response);
};
