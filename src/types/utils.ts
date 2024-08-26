
export type ClickSendApiResponse<T> = {
  http_code: number;
  response_code: string;
  response_msg: string;
  data: T;
};

export type ClickSendPagedResponse<T> = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: null;
  prev_page_url: null;
  from: number;
  to: number;
  data: T[];
};
