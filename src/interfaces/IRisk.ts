/**
 *
 * @export
 * @interface IInvoiceListResult
 */

export interface IRisk {
  description?: string;
  score: number;
  level: levelEnum;
  resource_name: string;
  resource_category: string;
}

enum levelEnum {
  "low",
  "medium",
  "hight",
}
