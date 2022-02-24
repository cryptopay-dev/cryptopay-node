import axios from 'axios';
import CryptoJS from 'crypto-js';
import dotenv from 'dotenv';
import * as openapi from './openapi';
import { SERVER } from './constants';
export { SERVER };
import { CustomErrorCreater } from './helpers/errorCreaterHelper';
import { IHeaders } from './interfaces';
export { IHeaders };
dotenv.config();

/**
 * 
 * Cryptopay-node - The official NodeJS library for the Cryptopay API
 * Cryptopay is a payment gateway and business wallet that allows merchants 
 * to automate the processes of accepting cryptocurrency payments and 
 * payouts from their customers, as well as making currency exchange transactions 
 * and receiving data on the transaction history and account balance statuses for reporting.
 * 
 * For more information, please visit [Cryptopay API docs](https://developers.cryptopay.me).
 * 
 * Learn mode about API credentials at [Developers guide](https://developers.cryptopay.me/guides/api-credentials)
 * @example
 * ```
 * const { Cryptopay, SERVER } = require('cryptopay-node');
 * // Server is an optional parameter which is imported from constants.ts and switches between sandbox and production.
 * const api = new Cryptopay(api_secret, api_key, callback_secret, server, SERVER.sandbox);
 * api.accounts.list().then(console.log);
 * ```
 */
export class Cryptopay {
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  public accounts: ReturnType<typeof openapi.AccountsFactory>;
  public channels: ReturnType<typeof openapi.ChannelsFactory>;
  public coinWithdrawals: ReturnType<typeof openapi.CoinWithdrawalsFactory>;
  public customers: ReturnType<typeof openapi.CustomersFactory>;
  public exchangeTransfers: ReturnType<typeof openapi.ExchangeTransfersFactory>;
  /**
   * An invoice is a request for a cryptocurrency payment 
   * which contains a unique BTC, LTC, ETH or XRP address 
   * and the amount that has to be paid while the invoice is valid.
   * 
   * [Invoices API docs](https://developers.cryptopay.me/reference/invoices)
   * @example
   * ```ts
   * //This endpoint allows you to retrieve a list of all invoices.
   * await cryptopay.invoices.list();

   * //This endpoint allows you to retrieve the invoice details by invoice id
   * await cryptopay.invoices.retrieve('invoice_id'); 

   * // This endpoint allows you to retrieve invoice details by its custom_id.
   * await cryptopay.invoices.retrieveByCustomId('custom_id');

   * //This endpoint allows you to recalculate invoices.
   * await cryptopay.invoices.createRecalculation('invoice_id', true) 

   * // This endpoint allows you to commit invoice recalculation.
   * await cryptopay.invoices.commitRecalculation('invoice_id','recalculation_id') 

   * //This endpoint allows you to create invoice refunds.
   * await cryptopay.invoices.createRefund('invoice_id') 

   * //This endpoint allows you to retrieve a list of a particular invoice refunds.
   * await cryptopay.invoices.listRefunds('invoice_id')
   * ```
   */
  public invoices: ReturnType<typeof openapi.InvoicesFactory>;
  /**
   * [Public rates API docs](https://developers.cryptopay.me/reference/public-rates)
   * @example
   * ```ts
   * // Retrieve all rates
   * const resp = await cryptopay.rates.all();
   * // Retrieve a pair rate
   * const resp = await cryptopay.rates.retrieve("BTC/EUR");
   * ```
   */
  public rates: ReturnType<typeof openapi.RatesFactory>;
  public risks: ReturnType<typeof openapi.RisksFactory>;
  public transactions: ReturnType<typeof openapi.TransactionsFactory>;
  /* eslint-enable @typescript-eslint/no-explicit-any*/

  public readonly url: string = SERVER.sandbox;

  constructor(private apiSecret: string, private apiKey: string, private callbackSecret: string, url?: string) {
    if (url && Object.values(SERVER).includes(url)) {
      this.url = url;
    }

    const customizedAxios = this.customizationAxios();
    this.accounts = openapi.AccountsFactory(undefined, this.url, customizedAxios);
    this.channels = openapi.ChannelsFactory(undefined, this.url, customizedAxios);
    this.coinWithdrawals = openapi.CoinWithdrawalsFactory(undefined, this.url, customizedAxios);
    this.customers = openapi.CustomersFactory(undefined, this.url, customizedAxios);
    this.exchangeTransfers = openapi.ExchangeTransfersFactory(undefined, this.url, customizedAxios);
    this.invoices = openapi.InvoicesFactory(undefined, this.url, customizedAxios);
    this.rates = openapi.RatesFactory(undefined, this.url, customizedAxios);
    this.risks = openapi.RisksFactory(undefined, this.url, customizedAxios);
    this.transactions = openapi.TransactionsFactory(undefined, this.url, customizedAxios);
  }

  /**
   * Callbacks
   * [Documentation](https://developers.cryptopay.me/guides/api-basics/callbacks)
   * Every callback request contains a `X-Cryptopay-Signature` 
   * header which is needed to verify webhook body
   * @example
   * ```ts
   * // body must be json, headers are all your headers in response
   * //if the callback is valid method returns true 
   * cryptopay.verifyCallback(body, headers) 
   * ```
   */
  public verifyCallback = (body: string, headers: Record<string, string>): boolean => {
    this.validateBodyAndHeader(body, headers);
    const expectedSignature = CryptoJS.HmacSHA256(body, this.callbackSecret).toString();
    const signature = headers['x-cryptopay-signature'];
    return this.secureCompare(signature, expectedSignature);
  };

  private validateBodyAndHeader = (body: string, headers: Record<string, string>) => {
    if (!body) throw new Error('Body is empty');
    try {
      JSON.parse(body);
    } catch ({ message }) {
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
        'User-Agent': `Cryptopay NodeJS`,
      },
    };
  }
  /* eslint-enable @typescript-eslint/no-explicit-any*/
}
