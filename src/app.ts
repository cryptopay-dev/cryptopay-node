import axios from "axios";
import base64 from "crypto-js/enc-base64";
import sha1 from "crypto-js/sha1";
import md5 from "crypto-js/md5";
import { IInvoice } from "./interfaces/IInvoice";
import { IHeaders } from "./interfaces/IHeaders";
import * as ratesSevices from './services/ratesSevices'

class CryptoPay {
  constructor(
    private api_secret: any,
    private api_key: any,
    private callback_secret: any
  ) {}

  //Rates
  public getRetes = async () => {
      const path = "/api/rates";
      const headers = this.headerCreator("GET", path);
      try {
        const data = await ratesSevices.getRates(path, headers);
        return data;
      } catch (err) {
        throw err; 
      }
     
  }; 

  public getRetesByPair = async (pair: string) => {
      const path = `/api/rates/${pair}`;
      const headers = this.headerCreator("GET", path);
      try {
        const data = await ratesSevices.getRetesByPair(path, headers);
        return data;
      } catch (err) {
        throw err;
      }
  };

  // Invoices

  public createInvoices = async (invoice:IInvoice) => {
    try {
      const path = `/api/invoices`;
      const headers = this.headerCreator("POST", path , invoice);
      const response = await axios.post(path, invoice, headers);
      console.log({ response });
      return response;
    } catch (error) {
      throw new Error("getRetes: " + error);
    }
  };

  private headerCreator = (method: string, path: string, body?: any): IHeaders => {
    const date = new Date().toUTCString();
    const contentType = "application/json";
    const bodyHash = body ? md5(body).toString() : "";

    const stringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
    const signature = base64.stringify(sha1(stringToSign, this.api_secret));
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

const testObj = new CryptoPay("api_secret", "api_key", "callback_secret");
