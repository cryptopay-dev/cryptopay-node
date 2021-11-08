/**
 *
 * @export
 * @interface IInvoiceParams
 */

export interface IInvoiceParams {
  price_amount: string;
  price_currency: string;
  pay_currency: string;
  custom_id?: string;
  customer_id?: string;
  name?: string;
  description?: string;
  metadata?: any;
  success_redirect_url?: string;
  unsuccess_redirect_url?: string;
}
