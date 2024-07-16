import axios from "axios";
import type {
  CalculateSmsPriceResponse,
  SendSmsResponse,
  SmsMessage,
} from "./types/sms";
import type {
  GetRechargePackagesResponse,
  PurchasePackageResponse,
  ViewAccountDetailsResponse,
} from "./types/account";

type ClickSendApiAuth = {
  username: string;
  apiKey: string;
};

export const createClickSendApi = (config: ClickSendApiAuth) => {
  const authenticationString = `Basic ${btoa(`${config.username}:${config.apiKey}`)}`;
  const clickSendApi = axios.create({
    baseURL: "https://rest.clicksend.com/v3/",
    headers: {
      Authorization: authenticationString,
      "Content-Type": "application/json",
    },
  });

  const api = {
    account: {
      recharge: {
        getPackages: async () => {
          const res =
            await clickSendApi.get<GetRechargePackagesResponse>(
              "recharge/packages"
            );
          return res.data;
        },
        purchasePackage: async (packageId: number) => {
          const res = await clickSendApi.put<PurchasePackageResponse>(
            `recharge/purchase/${packageId}`
          );
          return res.data;
        },
      },
      management: {
        viewAccountDetails: async () => {
          const res =
            await clickSendApi.get<ViewAccountDetailsResponse>("account");
          return res.data;
        },
      },
    },
    sms: {
      sendMessages: async (messages: SmsMessage[]) => {
        const res = await clickSendApi.post<SendSmsResponse>("sms/send", {
          messages: messages.map((message) => ({
            ...message,
            source: "sdk",
          })),
        });
        return res.data;
      },
    },
    calculateSmsPrice: async (messages: SmsMessage[]) => {
      const res = await clickSendApi.post<CalculateSmsPriceResponse>(
        "sms/price",
        {
          messages: messages.map((message) => ({
            ...message,
            source: "sdk",
          })),
        }
      );
      return res.data;
    },
    getInboundMessages: async () => {
      const res = await clickSendApi.get<unknown>("sms/inbound");
      return res.data;
    },
  };
  return api;
};
