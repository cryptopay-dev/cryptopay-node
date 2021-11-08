import base64 from "crypto-js/enc-base64";
import sha1 from "crypto-js/sha1";
import md5 from "crypto-js/md5";
import CryptoJS from "crypto-js";
import moment from "moment";
import { IHeaders } from "./interfaces/IHeaders";
import * as ratesSevices from "./services/ratesSevices";
import * as invocesService from "./services/invocesService";
import { IInvoiceParams } from "./interfaces/IInvoiceParams";
import { invoiceParamsToTest } from "./dataToTesting/invoiceParamsToTest";

/**
 *
 * @export
 * @class CryptoPay
 */

export class CryptoPay {
  constructor(
    private api_secret: any,
    private api_key: any,
    private callback_secret: any,
    private uri: string = "https://business-sandbox.cryptopay.me"
  ) {}

  //Rates
  public getRetes = async () => {
    const path = "/api/rates";
    const headers = this.headerCreator("GET", path);
    try {
      return await ratesSevices.getRates(`${this.uri}${path}`, headers);
    } catch (err) {
      throw err;
    }
  };

  public getRetesByPair = async (pair: string) => {
    const path = `/api/rates/${pair}`;
    const headers = this.headerCreator("GET", path);
    try {
      return await ratesSevices.getRetesByPair(`${this.uri}${path}`, headers);
    } catch (err) {
      throw err;
    }
  };

  // Invoices

  public createInvoice = async (invoice: IInvoiceParams) => {
    try {
      const path = `/api/invoices`;
      const headers = this.headerCreator("POST", path, invoice);
      return await invocesService.createInvoice(
        `${this.uri}${path}`,
        headers,
        invoice
      );
    } catch (err) {
      throw err;
    }
  };

  public getListInvoces = async (
    customer_id?: string,
    starting_after?: string
  ) => {
    try {
      const path = `/api/invoices`;
      const headers = this.headerCreator("GET", path);
      return await invocesService.getListInvoces(
        `${this.uri}${path}`,
        headers,
        customer_id,
        starting_after
      );
    } catch (err) {
      throw err;
    }
  };

  public getListInvoceByInvoiceId = async (invoice_id: string) => {
    try {
      const path = `/api/invoices/${invoice_id}`;
      const headers = this.headerCreator("GET", path);
      return await invocesService.getInvoceByPathWithParams(
        `${this.uri}${path}`,
        headers
      );
    } catch (err) {
      throw err;
    }
  };

  public getListInvoceByCustomId = async (custom_id: string) => {
    try {
      const path = `/api/invoices/custom_id/${custom_id}`;
      const headers = this.headerCreator("GET", path);
      return await invocesService.getInvoceByPathWithParams(
        `${this.uri}${path}`,
        headers
      );
    } catch (err) {
      throw err;
    }
  };

  public CreateRecalculateInvoices = async (
    invoice_id: string,
    force_commit: boolean = true
  ) => {
    try {
      const path = `/api/invoices/${invoice_id}/recalculations`;
      const headers = this.headerCreator("POST", path, { force_commit });
      return await invocesService.CreateRecalculateInvoices(
        `${this.uri}${path}`,
        headers,
        force_commit
      );
    } catch (err) {
      throw err;
    }
  };

  public CommitRecalculateInvoicesByIds = async (
    invoice_id: string,
    recalculation_id: string
  ) => {
    try {
      const path = `/api/invoices/${invoice_id}/recalculations/${recalculation_id}/commit`;
      const headers = this.headerCreator("POST", path);
      return await invocesService.CommitRecalculateInvoicesByIds(
        `${this.uri}${path}`,
        headers
      );
    } catch (err) {
      throw err;
    }
  };

  public createInvoiceRefund = async (invoice_id: string, address: string) => {
    try {
      const path = `/api/invoices/${invoice_id}/refunds`;
      const headers = this.headerCreator("POST", path, { address });
      return await invocesService.createInvoiceRefund(
        `${this.uri}${path}`,
        headers,
         address ,
      );
    } catch (err) {
      throw err;
    }
  };

  public getListInvoiceRefund = async (invoice_id: string) => {
    try {
      const path = `/api/invoices/${invoice_id}/refunds`;
      const headers = this.headerCreator("GET", path);
      return await invocesService.getListInvoiceRefund(
        `${this.uri}${path}`,
        headers
      );
    } catch (err) {
      throw err;
    }
  };

  private headerCreator(method: string, path: string, body?: any) {
    const date = moment().format("YYYY-MM-DDTHH:mm:ssZ");
    const contentType = "application/json";
    const bodyHash = body ? CryptoJS.MD5(JSON.stringify(body)).toString() : "";
    const stringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
    const signature = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA1(stringToSign, this.api_secret)
    );
    return {
      headers: {
        Date: date,
        Authorization: `HMAC ${this.api_key}:${signature}`,
        "Content-Type": contentType,
      },
    };
  }
}

const myTest = async () => {
  const callback_secret = "sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTE";
  // const api_key = "7AA2P-w0RxZXG-_K4cRngQ";
  // const api_secret = "NGR0vvNXKO_p3v2zz5ZuShP36Vp19ekZ9nLORtVZYpc";
  const api_key = "D-d6gn9axIWNPn5cPIukoA";
  const api_secret = "waNXkbUH7d-yRcImNM8vx9gLDX9ZgjTCpvtwX_anRyg";
  const testObj = new CryptoPay(api_secret, api_key, callback_secret);

  try {
    // const resp = await testObj.getRetes(); //+
    // const resp = await testObj.getRetesByPair("XRP/ZAR"); //+
    // const resp = await testObj.createInvoice(invoiceParamsToTest); // +
    // const resp = await testObj.getListInvoces(); //+
    // const resp = await testObj.getListInvoceByInvoiceId('e4ae8549-5b7d-43c6-a6b9-3fe3be04e085');  //+
    // const resp = await testObj.getListInvoceByCustomId('PAYMENT-123'); //+
    const resp = await testObj.CreateRecalculateInvoices(
      "4149435c-2ee7-4f2f-b906-32a1415240c9",
      true
    ); //invoice_not_recalculatable

    // const resp = await testObj.getRecalculateInvoicesByIds(
    //   "", //?
    //   "", //?
    // ); //--
    // const resp = await testObj.createInvoiceRefund(
    //   'e4ae8549-5b7d-43c6-a6b9-3fe3be04e085',
    //   '2NA7eYDPh8VMGm7ZhaUkpPmWhyaq5bsjYi2'
    // ); //'invoice status not refundable'

    // const resp = await testObj.getListInvoiceRefund(
    //   'e4ae8549-5b7d-43c6-a6b9-3fe3be04e085' 
    //   );  //+- data: []
    // console.log("resp=======", resp);
  } catch (err) {
    console.log("[err]", err);
  }
};

myTest();
