import * as openapi from './openapi';
import { SERVER } from './constants';
export { SERVER };
import { IHeaders } from './interfaces';
export { IHeaders };
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
export declare class Cryptopay {
    private apiSecret;
    private apiKey;
    private callbackSecret;
    accounts: ReturnType<typeof openapi.AccountsFactory>;
    channels: ReturnType<typeof openapi.ChannelsFactory>;
    coinWithdrawals: ReturnType<typeof openapi.CoinWithdrawalsFactory>;
    customers: ReturnType<typeof openapi.CustomersFactory>;
    exchangeTransfers: ReturnType<typeof openapi.ExchangeTransfersFactory>;
    coins: ReturnType<typeof openapi.CoinsFactory>;
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
    invoices: ReturnType<typeof openapi.InvoicesFactory>;
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
    rates: ReturnType<typeof openapi.RatesFactory>;
    risks: ReturnType<typeof openapi.RisksFactory>;
    transactions: ReturnType<typeof openapi.TransactionsFactory>;
    readonly url: string;
    constructor(apiSecret: string, apiKey: string, callbackSecret: string, url?: string);
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
    verifyCallback: (body: string, headers: Record<string, string>) => boolean;
    private validateBodyAndHeader;
    private secureCompare;
    private customizationAxios;
    private headerCreator;
}
