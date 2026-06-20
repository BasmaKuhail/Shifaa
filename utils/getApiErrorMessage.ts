import axios from "axios";

type LaravelValidationResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = "حدث خطأ، يرجى إعادة المحاولة!"
): string => {
  if (!axios.isAxiosError<LaravelValidationResponse>(error)) {
    return fallback;
  }

  const data = error.response?.data;

  if (!data) {
    return fallback;
  }

  // Laravel validation errors
  if (data.errors) {
    const firstError = Object.values(data.errors)[0]?.[0];

    if (firstError) {
      return firstError;
    }
  }

  // Laravel general message
  if (data.message) {
    return data.message;
  }

  return fallback;
};