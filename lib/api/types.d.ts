type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

type ApiErrorResponse = {
  success: false;
  message: string;
  code?: string;
  details?: unknown;
};

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  baseUrl?: string;
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: BodyInit | Record<string, unknown> | null;
};

type ApiClientErrorShape = {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
};
