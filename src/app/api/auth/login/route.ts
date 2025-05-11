import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import { LoginRequestBody, LoginResponse } from "@/types/Auth";

export async function POST(request: Request) {
  const body: LoginRequestBody = await request.json();
  const { username, email, password } = body;

  const url = `${process.env.BE_PKMIKRO}/auth/login`;
  try {
    const response = await axios.post<LoginResponse>(
      url,
      { username, email, password },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    return NextResponse.json(
      err.response?.data || { message: "API request failed" },
      { status: err.response?.status || 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: "Method GET tidak diizinkan. Gunakan POST." },
    { status: 405 }
  );
}
