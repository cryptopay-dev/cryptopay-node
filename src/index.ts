import axios from 'axios';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
import * as openApiGeneretedCode from '../openApiGeneretedCode';
import { version } from '../package.json';
import { SERVER } from './constants';
import { CustomErrorCreater } from './helpers/errorCreaterHelper';
import { IHeaders } from './interfaces';
dotenv.config();

export default class CryptoPay {
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  private InvoicesApi: any;
  private RatesApi: any;
  /* eslint-enable @typescript-eslint/no-explicit-any*/

  public readonly url: string = SERVER.sandbox;

  constructor(private apiSecret: string, private apiKey: string, private callbackSecret: string, url?: string) {
    if (url && Object.values(SERVER).includes(url)) {
      this.url = url;
    }

    const customizedAxios = this.customizationAxios();
    this.InvoicesApi = openApiGeneretedCode.InvoicesApiFactory(undefined, this.url, customizedAxios);
    this.RatesApi = openApiGeneretedCode.RatesApiFactory(undefined, this.url, customizedAxios);
  }

  public invoicesApi = () => {
    return this.InvoicesApi;
  };

  public ratesApi = () => {
    return this.RatesApi;
  };

  /* eslint-disable @typescript-eslint/no-explicit-any*/
  public callbackVerification = (body: string, headers: any): boolean => {
    this.validateBodyAndHeader(body, headers);
    const expectedSignature = CryptoJS.HmacSHA256(body, this.callbackSecret).toString();
    const signature = headers['x-cryptopay-signature'];
    return this.secureCompare(signature, expectedSignature);
  };
  /* eslint-enable @typescript-eslint/no-explicit-any*/
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  private validateBodyAndHeader = (body: string, headers: any) => {
    if (!body) throw new Error('Body is empty');
    try {
      JSON.parse(body);
    } catch ({message}) {
      throw new Error(`Invalid JSON in body. Error message: ${message}`);
    }
    if (!headers['x-cryptopay-signature']) throw new Error('Header x-cryptopay-signature is missing or empty');
  };
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  private secureCompare(str1: string, str2: string): boolean {
    const givenBuff = Buffer.from(str1);
    const computedBuff = Buffer.from(str2);
    return givenBuff.equals(computedBuff);
  }

  private customizationAxios = () => {
    axios.interceptors.request.use((req) => {
      const { method = 'get', data = '' } = req;
      req.url = req.url?.replace('%2F', '/');
      const newUrl = req.url?.replace(this.url, '') + '';
      const customHeaders = this.headerCreator(method.toUpperCase(), newUrl, data);
      req.headers = { ...req.headers, ...customHeaders.headers };
      return req;
    });

    axios.interceptors.response.use(
      (res) => {
        return res?.data;
      },
      (error) => Promise.reject(CustomErrorCreater(error))
    );

    return axios;
  };

  /* eslint-disable @typescript-eslint/no-explicit-any*/
  private headerCreator(method: string, path: string, body?: any): IHeaders {
    const date = new Date(Date.now()).toUTCString();
    const contentType = 'application/json';
    const bodyHash = body ? CryptoJS.MD5(body).toString() : '';
    const stringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
    const signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(stringToSign, this.apiSecret));
    return {
      headers: {
        Date: date,
        Authorization: `HMAC ${this.apiKey}:${signature}`,
        'Content-Type': contentType,
        'User-Agent': `Cryptopay NodeJS v${version}`,
      },
    };
  }
  /* eslint-enable @typescript-eslint/no-explicit-any*/
}
