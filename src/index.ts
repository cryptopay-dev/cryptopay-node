import axios from "axios";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import * as openApiGeneretedCode from "../openApiGeneretedCode";
import { version } from "../package.json";
import { SERVER } from "./constants";
import { CustomErrorCreater } from "./helpers/errorCreaterHelper";
import { IHeaders } from "./interfaces";
dotenv.config();

export default class CryptoPay {
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  private InvoicesApi: any;
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  private RatesApi: any;
  constructor(
    private apiSecret: string,
    private apiKey: string,
    private callbackSecret: string,
    private url: string = SERVER.sandbox,
  ) {
    // request interceptor
    axios.interceptors.request.use((req) => {
      const { method = "get", data = "" } = req;
      req.url = req.url?.replace("%2F", "/");
      const newUrl = req.url?.replace(this.url, "") + "";
      const customHeaders = this.headerCreator(method.toUpperCase(), newUrl, data);
      req.headers = { ...req.headers, ...customHeaders.headers };
      return req;
    });
    // response interceptor
    axios.interceptors.response.use(
      (res) => {
        return res?.data;
      },
      (error) => Promise.reject(CustomErrorCreater(error)),
    ); // error interceptor

    this.InvoicesApi = openApiGeneretedCode.InvoicesApiFactory(
      undefined,
      this.url,
      axios,
    );
    this.RatesApi = openApiGeneretedCode.RatesApiFactory(
      undefined,
      this.url,
      axios,
    );
  }

  public getUrl = () => {
    return this.url;
  }
  public invoicesApi = () => {
    return this.InvoicesApi;
  }
  public ratesApi = () => {
    return this.RatesApi;
  }
/* eslint-disable @typescript-eslint/no-explicit-any*/
  public callbackVerification = (body: string, headers: any): boolean => {
    return (
      CryptoJS.HmacSHA256(body, this.callbackSecret).toString() ===
      headers["x-cryptopay-signature"]
    );
  }
  private headerCreator(method: string, path: string, body?: any): IHeaders {
    const date = new Date(Date.now()).toUTCString();
    const contentType = "application/json";
    const bodyHash = body ? CryptoJS.MD5(body).toString() : "";
    const stringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
    const signature = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA1(stringToSign, this.apiSecret),
    );
    return {
      headers: {
        "Date": date,
        "Authorization": `HMAC ${this.apiKey}:${signature}`,
        "Content-Type": contentType,
        "User-Agent": `Cryptopay NodeJS v${version}`,
      },
    };
  }
}
