export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta?: IPaginationMeta;
}

export interface IApiErrorResponse {
  success: boolean;
  message: string;
  data: null;
}
