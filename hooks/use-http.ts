import { useState, useCallback } from "react";

type RequestType = {
  url: string;
  headers?: { [key: string]: any };
  body?: any;
  method?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(async (requestConfig: RequestType) => {
    setIsLoading(true);
    setError(null);
    // check if body is empty and if not, check if it is prototype of FormData (used when uploading files) or not (for anything else).
    const body = requestConfig.body
      ? FormData.prototype.isPrototypeOf(requestConfig.body)
        ? requestConfig.body
        : JSON.stringify(requestConfig.body)
      : null;

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      setIsLoading(false);

      return data;
    } catch (err) {
      const errorMessage = getErrorMessage(err);

      setError(errorMessage);
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
