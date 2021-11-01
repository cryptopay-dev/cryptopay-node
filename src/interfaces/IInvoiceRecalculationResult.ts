import { IExchange } from "./IExchange";

export interface IInvoiceRecalculationResult {
    id: string;
    invoice_id:string;
    pay_amount:string;
    pay_currency:string;
    price_amount:string;
    price_currency:string;
    fee:string;
    fee_currency:string;
    previous_pay_amount:string;
    previous_price_amount:string;
    previous_exchange_rate:string;
    exchange:IExchange;
    created_at:string;
}