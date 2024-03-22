export type ClickSendApiResponse<T> = {
  http_code: number;
  response_code: string;
  response_msg: string;
  data: T;
};
