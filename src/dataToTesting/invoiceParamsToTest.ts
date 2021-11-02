import { IInvoiceParams } from "../interfaces/IInvoiceParams";

export const invoiceParamsToTest:IInvoiceParams = {
  price_amount: "100.0",
  price_currency: "EUR",
  pay_currency: "BTC",
  custom_id: "PAYMENT-123",
  customer_id: "CUSTOMER-123",
  name: "string",
  description: "string",
  metadata: {},
  success_redirect_url: "string",
  unsuccess_redirect_url: "string",
};
