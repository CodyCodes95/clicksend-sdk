import type { ClickSendApiResponse, ClickSendPagedResponse } from "./utils";

export type GetRechargePackagesResponse = ClickSendApiResponse<{
  packages: {
    package_id: number;
    package_price: string;
    sms_price: number;
    sms_quantity: number;
    voice_mobile_price: number;
    voice_mobile_quantity: number;
    voice_landline_price: number;
    voice_landline_quantity: number;
    fax_price: number;
    fax_quantity: number;
    email_price: number;
    email_quantity: number;
    post_letter_black_price: number;
    post_letter_colour_price: number;
    post_page_black_price: number;
    post_page_colour_price: number;
    post_letter_black_quantity: number;
    post_letter_colour_quantity: number;
    post_direct_mail_dl_price: number;
    post_direct_mail_a5_price: number;
    post_direct_mail_min_quantity: number;
    postcard_price: number;
    postcard_quantity: number;
  }[];
  _currency: {
    currency_name_short: string;
    currency_prefix_d: string;
    currency_prefix_c: string;
    currency_name_long: string;
  };
}>;

export type PurchasePackageResponse = ClickSendApiResponse<{
  user_id: number;
  amount: string;
  currency: string;
  amount_aud: string;
  date: number;
}>;

export type ViewAccountDetailsResponse = ClickSendApiResponse<{
  user_id: number;
  username: string;
  user_email: string;
  active: number;
  banned: number;
  balance: string;
  user_phone: string;
  reply_to: string;
  delivery_to: null;
  user_first_name: string;
  user_last_name: string;
  account: number;
  account_name: string;
  account_billing_email: string;
  account_billing_mobile: string;
  country: string;
  default_country_sms: string;
  auto_recharge: number;
  auto_recharge_amount: string;
  low_credit_amount: string;
  setting_unicode_sms: number;
  setting_email_sms_subject: number;
  setting_fix_sender_id: number;
  setting_sms_message_char_limit: number;
  old_dashboard: number;
  balance_commission: number;
  timezone: string;
  _currency: {
    currency_name_short: string;
    currency_prefix_d: string;
    currency_prefix_c: string;
    currency_name_long: string;
  };
  _subaccount: {
    subaccount_id: number;
    api_username: string;
    email: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    api_key: string;
    access_users: number;
    access_billing: number;
    access_reporting: number;
    access_contacts: number;
    access_settings: number;
    access_sms: number;
    access_email: number;
    access_voice: number;
    access_fax: number;
    access_post: number;
    access_reseller: number;
    access_mms: number;
    share_campaigns: number;
    notes: null;
  };
}>;

export type AlphaTagsResponse = {
  alpha_tags: {
    id: string;
    account_id: string;
    workspace_id: string;
    user_id: string;
    alpha_tag: string;
    status: string;
    reason: string;
    created_timestamp: string;
    updated_timestamp: string;
  }[];
  _metadata: {
    pagination: {
      self: string;
      next: string;
      page_size: number;
    };
  };
};

export type SenderNumbersResponse = ClickSendApiResponse<
  ClickSendPagedResponse<{
    dedicated_number: string;
    country: string;
    price: string;
    _country_name: string;
  }>
>;

export type ViewClientAccountsResponse = ClickSendApiResponse<
  ClickSendPagedResponse<{
    user_id: number;
    username: string;
    user_email: string;
    active: number;
    banned: number;
    balance: string;
    user_phone: number;
    reply_to: string;
    delivery_to: null;
    user_first_name: string;
    user_last_name: string;
    account: number;
    account_name: string;
    account_billing_email: string;
    account_billing_mobile: number;
    country: string;
    default_country_sms: string;
    auto_recharge: number;
    auto_recharge_amount: string;
    low_credit_amount: string;
    setting_unicode_sms: number;
    setting_email_sms_subject: number;
    setting_fix_sender_id: number;
    setting_sms_message_char_limit: number;
    old_dashboard: number;
    balance_commission: string;
    timezone: string;
  }>
>;
