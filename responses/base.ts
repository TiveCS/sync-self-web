export type ApiErrorResponse = {
  error: string;
};

export type ApiBaseResponse<TData> = TData | ApiErrorResponse;

export function isErrorResponse<TData>(
  response: ApiBaseResponse<TData>
): response is ApiErrorResponse {
  return (response as ApiErrorResponse).error !== undefined;
}
