export interface SuccessResponse<TData = unknown> {
  success: {
    data: TData;
  };
}
