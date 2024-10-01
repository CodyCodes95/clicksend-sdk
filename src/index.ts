import type {
  CalculateSmsPriceResponse,
  SendSmsResponse,
  SmsMessage,
  AlphaTagsResponse,
  GetRechargePackagesResponse,
  PurchasePackageResponse,
  SenderNumbersResponse,
  ViewAccountDetailsResponse,
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
    },
    sms: {
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
  };
  return api;
};
