export type SmsMessage = {
    to: string;
    body: string;
}

export type SendSmsResponse = {
    http_code: number;
    response_code: string;
    response_msg: string;
    data: {
        total_price: number;
        total_count: number;
        queued_count: number;
        messages: {
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
        }[];
        _currency: {
            currency_name_short: string;
            currency_prefix_d: string;
            currency_prefix_c: string;
            currency_name_long: string;
        };
    };
}