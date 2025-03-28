import type {
  CalculateSmsPriceResponse,
  SendSmsResponse,
  SmsMessage,
  AlphaTagsResponse,
  GetRechargePackagesResponse,
  PurchasePackageResponse,
  SenderNumbersResponse,
  ViewAccountDetailsResponse,
  ViewClientAccountsResponse,
  PaginationOptions,
  TransferCreditOptions,
  TransferCreditResponse,
} from "./types";
import ky from "ky";

type ClickSendApiAuth = {
  username: string;
  apiKey: string;
};

export const createClickSendApi = (config: ClickSendApiAuth) => {
  const authenticationString = `Basic ${btoa(`${config.username}:${config.apiKey}`)}`;
  const clickSendApi = ky.create({
    prefixUrl: "https://rest.clicksend.com/v3/",
    headers: {
      Authorization: authenticationString,
      "Content-Type": "application/json",
    },
  });
  const api = {
    account: {
      sender: {
        numbers: {
          list: async () => {
            const data = await clickSendApi
              .get<SenderNumbersResponse>("numbers")
              .json();
            return data;
          },
        },
        alphaTags: {
          list: async () => {
            const data = await clickSendApi
              .get<AlphaTagsResponse>("alpha-tags")
              .json();
            return data;
          },
          register: async (
            alphaTag: string,
            options?: {
              reason?: string;
            }
          ) => {
            const res = await clickSendApi.post<unknown>("alpha-tags", {
              json: { alpha_tag: alphaTag, ...options },
            });
            const data = await res.json();
            return data;
          },
        },
      },
      recharge: {
        getPackages: async () => {
          const res =
            await clickSendApi.get<GetRechargePackagesResponse>(
              "recharge/packages"
            );
          const data = await res.json();
          return data;
        },
        purchasePackage: async (packageId: number) => {
          const res = await clickSendApi.put<PurchasePackageResponse>(
            `recharge/purchase/${packageId}`
          );
          const data = await res.json();
          return data;
        },
      },
      management: {
        viewAccountDetails: async () => {
          const res =
            await clickSendApi.get<ViewAccountDetailsResponse>("account");
          const data = await res.json();
          return data;
        },
      },
      reseller: {
        viewClientAccounts: async (options?: PaginationOptions) => {
          const params = new URLSearchParams();
          if (options?.page) {
            params.append("page", options.page.toString());
          }
          if (options?.limit) {
            params.append("limit", options.limit.toString());
          }
          const res = await clickSendApi.get<ViewClientAccountsResponse>(
            `reseller/accounts?${params.toString()}`
          );
          const data = await res.json();
          return data;
        },
        transferCredit: async (options: TransferCreditOptions) => {
          const res = await clickSendApi.put<TransferCreditResponse>(
            "reseller/transfer-credit",
            {
              body: new URLSearchParams({
                client_user_id: options.client_user_id.toString(),
                balance: options.balance.toString(),
                currency: options.currency,
              }),
            }
          );
          const data = await res.json();
          return data;
        },
      },
    },
    sms: {
      calculateSmsPrice: async (messages: SmsMessage[]) => {
        const res = await clickSendApi.post<CalculateSmsPriceResponse>(
          "sms/price",
          {
            json: {
              messages: messages.map((message) => ({
                ...message,
                source: "sdk",
              })),
            },
          }
        );
        const data = await res.json();
        return data;
      },
      sendMessages: async (messages: SmsMessage[]) => {
        const res = await clickSendApi.post<SendSmsResponse>("sms/send", {
          json: {
            messages: messages.map((message) => ({
              ...message,
              source: "sdk",
            })),
          },
        });
        const data = await res.json();
        return data;
      },
    },
  };
  return api;
};
