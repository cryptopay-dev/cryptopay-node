import axios from "axios";
import base64 from "crypto-js/enc-base64";
import sha1 from "crypto-js/sha1";
import md5 from "crypto-js/md5";
import utf8 from 'crypto-js/enc-utf8';
import { IHeaders } from "./interfaces/IHeaders";
import * as ratesSevices from './services/ratesSevices'
import * as invocesService from './services/invocesService'
import { IInvoiceParams } from "./interfaces/IInvoiceParams";

class CryptoPay {
  constructor(
    private api_secret: any,
    private api_key: any,
    private callback_secret: any,
    private uri:string = 'https://business-sandbox.cryptopay.me'
  ) {}

  //Rates
  public getRetes = async () => {
      const path = "/api/rates";
      const headers = this.headerCreator("GET", path); 
      try {
        const data = await ratesSevices.getRates(`${this.uri}${path}`, headers);
        return data;
      } catch (err) {
        throw err; 
      }
  }; 

  public getRetesByPair = async (pair: string) => {
      const path = `/api/rates/${pair}`;
      const headers = this.headerCreator("GET", path);
      try {
        const data = await ratesSevices.getRetesByPair(`${this.uri}${path}`, headers);
        return data;
      } catch (err) {
        throw err;
      }
  };

  // Invoices

  public createInvoice = async (invoice:IInvoiceParams) => {
    try {
      const path = `/api/invoices`;
      const headers = this.headerCreator("POST", path , invoice);
      const data = await invocesService.createInvoice(`${this.uri}${path}`, invoice, headers);
      return data;
    } catch (error) {
      throw new Error("getRetes: " + error);
    }
  };



  private headerCreator = (method: string, path: string, body?: any): IHeaders => {
    const date = new Date().toUTCString();
    const contentType = "application/json";
    const bodyHash = body ? md5(body).toString() : "";

    const StringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
    const signature = base64.stringify(sha1(this.api_secret, utf8.parse(StringToSign)))
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

const callback_secret ='sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTE'
const api_key= '7AA2P-w0RxZXG-_K4cRngQ'
const api_secret='NGR0vvNXKO_p3v2zz5ZuShP36Vp19ekZ9nLORtVZYpc'
// const testObj = new CryptoPay(api_secret, api_key, callback_secret);
// testObj.getRetes()