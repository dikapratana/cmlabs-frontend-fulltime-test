import { toQueryString } from "@/lib/api/query-string";

export class ApiClientError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor({ status, message, code, details }: ApiClientErrorShape) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function isJsonBody(body: ApiRequestOptions["body"]) {
  if (!body) {
    return false;
  }

  return (
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer)
  );
}

function buildRequestUrl(
  url: string,
  { baseUrl, params }: Pick<ApiRequestOptions, "baseUrl" | "params">,
) {
  const normalizedUrl = url.startsWith("http")
    ? url
    : `${baseUrl?.replace(/\/+$/, "") ?? ""}/${url.replace(/^\/+/, "")}`;

  return `${normalizedUrl}${toQueryString(params)}`;
}

async function getJsonPayload<T>(response: Response) {
  const payload = (await response.json()) as T;

  return payload;
}

async function request<T>(url: string, options: ApiRequestOptions = {}) {
  const { baseUrl, params, headers, body, ...rest } = options;
  const requestUrl = buildRequestUrl(url, { baseUrl, params });
  const shouldSerializeJson = isJsonBody(body);
  const requestHeaders = new Headers(headers);

  if (shouldSerializeJson) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(requestUrl, {
    ...rest,
    headers: requestHeaders,
    body: shouldSerializeJson
      ? JSON.stringify(body)
      : ((body ?? null) as BodyInit | null),
  });

  const payload = await getJsonPayload<ApiResponse<T>>(response);

  if (!response.ok || !payload.success) {
    throw new ApiClientError({
      status: response.status,
      message: payload.message,
      code: "code" in payload ? payload.code : undefined,
      details: "details" in payload ? payload.details : undefined,
    });
  }

  return payload as ApiSuccessResponse<T>;
}

async function requestJson<T>(url: string, options: ApiRequestOptions = {}) {
  const { baseUrl, params, headers, body, ...rest } = options;
  const requestUrl = buildRequestUrl(url, { baseUrl, params });
  const shouldSerializeJson = isJsonBody(body);
  const requestHeaders = new Headers(headers);

  if (shouldSerializeJson) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(requestUrl, {
    ...rest,
    headers: requestHeaders,
    body: shouldSerializeJson
      ? JSON.stringify(body)
      : ((body ?? null) as BodyInit | null),
  });

  if (!response.ok) {
    throw new ApiClientError({
      status: response.status,
      message: `Request failed with status ${response.status}.`,
    });
  }

  return getJsonPayload<T>(response);
}

export const apiClient = {
  get<T>(url: string, options?: Omit<ApiRequestOptions, "method" | "body">) {
    return request<T>(url, { ...options, method: "GET" });
  },
  getJson<T>(
    url: string,
    options?: Omit<ApiRequestOptions, "method" | "body">,
  ) {
    return requestJson<T>(url, { ...options, method: "GET" });
  },
  post<T>(url: string, options?: Omit<ApiRequestOptions, "method">) {
    return request<T>(url, { ...options, method: "POST" });
  },
  put<T>(url: string, options?: Omit<ApiRequestOptions, "method">) {
    return request<T>(url, { ...options, method: "PUT" });
  },
  patch<T>(url: string, options?: Omit<ApiRequestOptions, "method">) {
    return request<T>(url, { ...options, method: "PATCH" });
  },
  delete<T>(url: string, options?: Omit<ApiRequestOptions, "method">) {
    return request<T>(url, { ...options, method: "DELETE" });
  },
};
