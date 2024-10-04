export * from "./sms";
export * from "./account";

export type PaginationOptions = {
  page?: number;
  limit?: number;
};

export type TransferCreditOptions = {
  client_user_id: number;
  balance: number;
  currency: string;
};
