import type { ClickSendApiResponse } from "./utils";

export type SmsMessage = {
  from: string | null;
  to: string;
  body: string;
  custom_string?: string;
};

export type ClickSendMessageResponse = {
  direction: string;
  date: number;
  to: string;
  body: string;
  from: string;
  schedule: number;
  message_id: string;
  message_parts: number;
  message_price: number;
  custom_string: string;
  user_id: number;
  subaccount_id: number;
  country: string;
  carrier: string;
  status: string;
};

export type SendSmsResponse = ClickSendApiResponse<{
  total_price: number;
  total_count: number;
  queued_count: number;
  messages: ClickSendMessageResponse[];
  _currency: {
    currency_name_short: string;
    currency_prefix_d: string;
    currency_prefix_c: string;
    currency_name_long: string;
  };
}>;

export type CalculateSmsPriceResponse = ClickSendApiResponse<{
  total_price: number;
  total_count: number;
  queued_count: number;
  messages: ClickSendMessageResponse[];
}>;
