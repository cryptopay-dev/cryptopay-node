import { IExchange } from "./IExchange";
import { IInvoiceTransaction } from "./IInvoiceTransaction";

export interface IInvoiceResult {
    id: string;
    custom_id: string | null;
    customer_id: string | null;
    status: invoiceStatusEnum;
    status_context: invoiceStatusContextEnum | null;
    address: string;
    uri: string;
    price_amount: string;
    price_currency: string;
    fee: string;
    fee_currency: string;
    pay_amount: string;
    pay_currency: string;
    paid_amount: string;
    exchange?: IExchange;
    transactions: IInvoiceTransaction;
    name: string | null;
    description: string | null;
    metadata: { description?: string } | null;
    success_redirect_url: string | null;
    unsuccess_redirect_url: string | null;
    hosted_page_url: string;
    created_at: string;
    expires_at: string;
}

enum invoiceStatusEnum {
  "new",
  "completed",
  "unresolved",
  "refunded",
  "cancelled",
}

enum invoiceStatusContextEnum {
  "overpaid",
  "underpaid",
  "paid_late",
  "illicit_resource",
}
