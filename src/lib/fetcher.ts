/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export async function fetcher<T>(url: string): Promise<T> {
  const res = await axios.get<T>(url);
  return res.data;
}
// Untuk POST
export async function fetcherPost<T, B = any>(
  url: string,
  body?: B
): Promise<T> {
  const res = await axios.post<T>(url, body);
  return res.data;
}
