import { SERVER } from './constants';
export { SERVER };
export default class Cryptopay {
    private apiSecret;
    private apiKey;
    private callbackSecret;
    private InvoicesApi;
    private RatesApi;
    readonly url: string;
    constructor(apiSecret: string, apiKey: string, callbackSecret: string, url?: string);
    invoices: () => any;
    rates: () => any;
    verifyCallback: (body: string, headers: any) => boolean;
    private validateBodyAndHeader;
    private secureCompare;
    private customizationAxios;
    private headerCreator;
}
