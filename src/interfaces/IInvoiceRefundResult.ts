import { IRisk } from "./IRisk";

/**
 *
 * @export
 * @interface IInvoiceRefundResult
 */

export interface IInvoiceRefundResult {
  id: string;
  invoice_id: string;
  custom_id: string;
  amount: string;
  amount_currency: string;
  fee: string;
  fee_currency: string;
  address: string | null;
  txid: string | null;
  risk: IRisk;
  created_at: string;
}
