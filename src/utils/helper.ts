/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";
import { keySession } from "@/lib/constants";

export const appendParam = (
  url: string,
  paramName?: string,
  value?: any,
  first?: boolean,
  noParam?: string
): string => {
  if (noParam) {
    return `${url}`;
  }
  return `${url}${first ? "?" : "&"}${paramName}=${value}`;
};

export const apiRequest = async (
  url: string,
  req: NextRequest
): Promise<NextResponse> => {
  const cookieStore = cookies(); // Ambil cookies dari request
  const session = (await cookieStore).get(keySession)?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  };

  if (session) {
    const token = JSON.parse(session).token;
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    switch (req.method) {
      case "GET": {
        const response = await axios.get(url, { headers });
        return NextResponse.json(response.data);
      }
      case "POST": {
        const body = await req.json();
        const response = await axios.post(url, body, { headers });
        return NextResponse.json(response.data);
      }
      case "PATCH": {
        const body = await req.json();
        const response = await axios.patch(url, body, { headers });
        return NextResponse.json(response.data);
      }
      case "DELETE": {
        delete headers["Content-Type"];
        const response = await axios.delete(url, { headers });
        return NextResponse.json(response.data);
      }
      default:
        return NextResponse.json(
          { message: `Unsupported request method: ${req.method}` },
          { status: 405 }
        );
    }
  } catch (err: any) {
    return NextResponse.json(
      err?.response?.data || { message: "API request failed" },
      { status: 500 }
    );
  }
};
