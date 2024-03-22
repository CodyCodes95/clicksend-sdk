export type GetRechargePackagesResponse = {
    http_code: number;
    response_code: string;
    response_msg: string;
    data: {
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
    };
}

export type PurchasePackageResponse = {
    http_code: number;
    response_code: string;
    response_msg: string;
    data: {
        user_id: number;
        amount: string;
        currency: string;
        amount_aud: string;
        date: number;
    };
}