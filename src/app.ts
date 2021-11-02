import axios from "axios";
import base64 from "crypto-js/enc-base64";
import sha1 from "crypto-js/sha1";
import md5 from "crypto-js/md5";
import utf8 from "crypto-js/enc-utf8";
import { IHeaders } from "./interfaces/IHeaders";
import * as ratesSevices from "./services/ratesSevices";
import * as invocesService from "./services/invocesService";
import { IInvoiceParams } from "./interfaces/IInvoiceParams";
import { invoiceParamsToTest } from "./dataToTesting/invoiceParamsToTest";

class CryptoPay {
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
      const headers = this.headerCreator("POST", path,  invoice );
      return await invocesService.createInvoice(
        `${this.uri}${path}`,
        invoice,
        headers
      );
    } catch (err) {
      throw err;
    }
  };

  public getListInvoces = async (
    customer_id: string,
    starting_after: string
  ) => {
    try {
      const path = `/api/invoices`;
      const headers = this.headerCreator("GET", path, {
        customer_id,
        starting_after,
      });
      return await invocesService.getListInvoces(
        `${this.uri}${path}`,
        customer_id,
        starting_after,
        headers
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

  public getRecalculateInvoices = async (
    invoice_id: string,
    force_commit: boolean
  ) => {
    try {
      const path = `/api/invoices/${invoice_id}/recalculations`;
      const headers = this.headerCreator("POST", path, { force_commit });
      return await invocesService.getRecalculateInvoices(
        `${this.uri}${path}`,
        { force_commit },
        headers
      );
    } catch (err) {
      throw err;
    }
  };

  public getRecalculateInvoicesByIds = async (
    invoice_id: string,
    recalculation_id: string
  ) => {
    try {
      const path = `/api/invoices/${invoice_id}/recalculations/${recalculation_id}/commit`;
      const headers = this.headerCreator("POST", path);
      return await invocesService.getRecalculateInvoicesByIds(
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
        { address },
        headers
      );
    } catch (err) {
      throw err;
    }
  };

  public getListInvoiceRefund = async (invoice_id: string) => {
    try {
      const path = `/api/invoices/${invoice_id}/refunds`;
      const headers = this.headerCreator("GET", path);
    } catch (err) {
      throw err;
    }
  };

  private headerCreator = (
    method: string,
    path: string,
    body?: any
  ): IHeaders => {
    const date = new Date().toUTCString();
    const contentType = "application/json";
    const bodyHash = body ? md5(body).toString() : "";
    const StringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
    const signature = base64.stringify(
      sha1(this.api_secret, utf8.parse(StringToSign))
    );
    const Authorization = `HMAC ${this.api_key}:${signature}`;
    return {
      headers: {
        Date: date,
        Authorization,
        "Content-Type": contentType,
      },
    };
  };
}

const test = async () => {
  const callback_secret = "sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTE";
  const api_key = "7AA2P-w0RxZXG-_K4cRngQ";
  const api_secret = "NGR0vvNXKO_p3v2zz5ZuShP36Vp19ekZ9nLORtVZYpc";
  const testObj = new CryptoPay(api_secret, api_key, callback_secret);
  // const resp = await testObj.getRetes();
  // const resp = await testObj.getRetesByPair("XRP/ZAR");
  const resp = await testObj.createInvoice(invoiceParamsToTest);
  console.log("resp=======", resp);
};

test();

