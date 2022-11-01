"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cryptopay = exports.SERVER = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const dotenv_1 = __importDefault(require("dotenv"));
const openapi = __importStar(require("./openapi"));
const constants_1 = require("./constants");
Object.defineProperty(exports, "SERVER", { enumerable: true, get: function () { return constants_1.SERVER; } });
const errorCreaterHelper_1 = require("./helpers/errorCreaterHelper");
dotenv_1.default.config();
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
class Cryptopay {
    constructor(apiSecret, apiKey, callbackSecret, url) {
        this.apiSecret = apiSecret;
        this.apiKey = apiKey;
        this.callbackSecret = callbackSecret;
        /* eslint-enable @typescript-eslint/no-explicit-any*/
        this.url = constants_1.SERVER.sandbox;
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
        this.verifyCallback = (body, headers) => {
            this.validateBodyAndHeader(body, headers);
            const expectedSignature = crypto_js_1.default.HmacSHA256(body, this.callbackSecret).toString();
            const signature = headers['x-cryptopay-signature'];
            return this.secureCompare(signature, expectedSignature);
        };
        this.validateBodyAndHeader = (body, headers) => {
            if (!body)
                throw new Error('Body is empty');
            try {
                JSON.parse(body);
            }
            catch ({ message }) {
                throw new Error(`Invalid JSON in body. Error message: ${message}`);
            }
            if (!headers['x-cryptopay-signature'])
                throw new Error('Header x-cryptopay-signature is missing or empty');
        };
        this.customizationAxios = () => {
            axios_1.default.interceptors.request.use((req) => {
                var _a, _b;
                const { method = 'get', data = '' } = req;
                req.url = (_a = req.url) === null || _a === void 0 ? void 0 : _a.replace('%2F', '/');
                const newUrl = ((_b = req.url) === null || _b === void 0 ? void 0 : _b.replace(this.url, '')) + '';
                const customHeaders = this.headerCreator(method.toUpperCase(), newUrl, data);
                req.headers = Object.assign(Object.assign({}, req.headers), customHeaders.headers);
                return req;
            });
            axios_1.default.interceptors.response.use((res) => {
                return res === null || res === void 0 ? void 0 : res.data;
            }, (error) => Promise.reject((0, errorCreaterHelper_1.CustomErrorCreater)(error)));
            return axios_1.default;
        };
        if (url && Object.values(constants_1.SERVER).includes(url)) {
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
        this.coins = openapi.CoinsFactory(undefined, this.url, customizedAxios);
    }
    /* eslint-disable @typescript-eslint/no-explicit-any*/
    secureCompare(str1, str2) {
        const givenBuff = Buffer.from(str1);
        const computedBuff = Buffer.from(str2);
        return givenBuff.equals(computedBuff);
    }
    /* eslint-disable @typescript-eslint/no-explicit-any*/
    headerCreator(method, path, body) {
        const date = new Date(Date.now()).toUTCString();
        const contentType = 'application/json';
        const bodyHash = body ? crypto_js_1.default.MD5(body).toString() : '';
        const stringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
        const signature = crypto_js_1.default.enc.Base64.stringify(crypto_js_1.default.HmacSHA1(stringToSign, this.apiSecret));
        return {
            headers: {
                Date: date,
                Authorization: `HMAC ${this.apiKey}:${signature}`,
                'Content-Type': contentType,
                'User-Agent': `Cryptopay NodeJS`,
            },
        };
    }
}
exports.Cryptopay = Cryptopay;
