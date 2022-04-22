import { useState, useCallback, useEffect, useRef } from "react";

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
  const timerRef = useRef<NodeJS.Timeout>();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = timerRef.current;

    return () => clearTimeout(Number(timer));
  }, []);

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

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      setIsLoading(false);

      return data;
    } catch (err) {
      setShowError(true);

      const errorMessage = getErrorMessage(err);

      setError(errorMessage);

      const timer = setTimeout(() => setShowError(false), 4000);

      timerRef.current = timer;

      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    showError,
    sendRequest,
  };
};

export default useHttp;
