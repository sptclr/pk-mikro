/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { fetcherPost } from "@/lib/fetcher";
import { mutate } from "swr";

/**
 * Hook untuk mengirim data ke endpoint POST
 */
export function useSubmitHook<T = any>(
  endpoint: string,
  options?: {
    onSuccess?: (response: T) => void;
    onError?: (error: any) => void;
  }
) {
  const { onSuccess, onError } = options || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<any>(null);
  const [response, setResponse] = useState<T | null>(null);

  const submit = async (body: Record<string, any>) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result: any = await fetcherPost(endpoint, body);
      setResponse(result);
      onSuccess?.(result);
      // optionally mutate SWR cache if needed
      mutate(endpoint);
      return result;
    } catch (err) {
      setError(err);
      onError?.(err);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submit,
    isSubmitting,
    error,
    response,
  };
}
