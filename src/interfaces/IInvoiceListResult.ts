import { IInvoiceResult } from "./IInvoceResult";
import { IPagination } from "./IPagination";

export interface IInvoiceListResult{
    data:IInvoiceResult[];
    meta: IPagination
}