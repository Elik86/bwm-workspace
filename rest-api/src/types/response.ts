export type Response<T> = {
  code: number;
  data: T;
  error?: string;
};
