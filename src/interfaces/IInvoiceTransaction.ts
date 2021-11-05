import { IRisk } from "./IRisk";

/**
 *
 * @export
 * @interface IInvoiceTransaction
 */

export interface IInvoiceTransaction{
    description?:string,
    txid: string,
    risk: IRisk
}