import CryptoJS from "crypto-js";
import { invoiceParamsToTest } from "./dataToTesting/invoiceParamsToTest";
import { version } from "../package.json";
import * as openApiGeneretedCode from "../openApiGeneretedCode";

import axios from "axios";
import { CustomErrorCreater } from "./helpers/errorCreaterHelper";
import { IHeaders } from "./interfaces";
const fs = require("fs"); //tmp

/**
 *
 * @export
 * @class CryptoPay
 */
export default class CryptoPay {
  private InvoicesApi: any;
  private RatesApi: any;
  constructor(
    private api_secret: string,
    private api_key: string,
    private callback_secret: string,
    private url: string = "https://business-sandbox.cryptopay.me"
  ) {
    // request interceptor
    axios.interceptors.request.use((req) => {
      const { method = "get", data = "" } = req;
      req.url = req.url?.replace("%2F", "/");
      let url = req.url?.replace(this.url, "")+ "";
      const customHeaders = this.headerCreator(method.toUpperCase(), url, data);
      req.headers = { ...req.headers, ...customHeaders.headers };
      return req;
    });
    // response interceptor
    axios.interceptors.response.use((res) => {
      return res?.data;
    },(error)=>Promise.reject(CustomErrorCreater(error))); //error interceptor

    this.InvoicesApi = openApiGeneretedCode.InvoicesApiFactory(
      undefined,
      this.url,
      axios
    );
    this.RatesApi = openApiGeneretedCode.RatesApiFactory(
      undefined,
      this.url,
      axios
    );
  }

  public setUrl = (newUrl: string) => {
    this.url = newUrl;
  };
  public getUrl = () => {
    return this.url;
  };
  public invoicesApi = () => {
    return this.InvoicesApi;
  };
  public ratesApi = () => {
    return this.RatesApi;
  };


  public callbackVerification = (body: string, headers: any): boolean => {
    return (
      CryptoJS.HmacSHA256(body, this.callback_secret).toString() ===
      headers["x-cryptopay-signature"]
    );
  };
  private headerCreator(method: string, path: string, body?: any):IHeaders {
    const date = new Date(Date.now()).toUTCString(); 
    const contentType = "application/json";
    const bodyHash = body ? CryptoJS.MD5(body).toString() : "";
    const stringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
    const signature = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA1(stringToSign, this.api_secret)
    );
    return {
      headers: {
        Date: date,
        Authorization: `HMAC ${this.api_key}:${signature}`,
        "Content-Type": contentType,
        "User-Agent": `Cryptopay NodeJS v${version}`,
      },
    };
  }
}

const myTest = async () => {
  // const callback_secret = "sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTE";
  const callback_secret = "hzeRDX54BYleXGwGm2YEWR4Ony1_ZU2lSTpAuxhW1gQ";

  // const api_key = "7AA2P-w0RxZXG-_K4cRngQ";
  // const api_secret = "NGR0vvNXKO_p3v2zz5ZuShP36Vp19ekZ9nLORtVZYpc";
  const api_key = "D-d6gn9axIWNPn5cPIukoA";
  const api_secret = "waNXkbUH7d-yRcImNM8vx9gLDX9ZgjTCpvtwX_anRyg";
  const cryptoPay = new CryptoPay(api_secret, api_key, callback_secret);

  try {
    const body =
      '{"type":"Invoice","event":"status_changed","data":{"id":"ff48eeba-ab18-4088-96bc-4be10a82b994","status":"completed","status_context":null,"address":"rs9pE6CnNLE8YiTgTwbAk1AkFyS3opsm7K?dt=701","price_amount":"1.0","price_currency":"EUR","pay_amount":"3.113326","pay_currency":"XRP","paid_amount":"3.113326","exchange":{"pair":"XRPEUR","rate":"0.3212"},"transactions":[{"txid":"3EA591FED2F1F61263CB66AAC6BCF520B0714A08F2481D56DE267F31E0C782B9","risk":null}],"name":null,"description":null,"metadata":null,"custom_id":null,"success_redirect_url":null,"created_at":"2019-04-09T15:22:09+00:00","expires_at":"2019-04-09T15:32:09+00:00"}}';
    const signature =
      "7c021857107203da4af1d24007bb0f752e2f04478e5e5bff83719101f2349b54";
    const headers = { "x-cryptopay-signature": signature };
    //  const tmp = testObj.callbackVerification(body, headers)
    //  console.log({tmp})
    // const resp = await testObj.getRetes(); //+
    // const resp = await testObj.getRetesByPair("XRP/ZAR"); //+
    // testObj.setUrl('https://business.cryptopay.me')

    // const resp = await testObj.createInvoice(invoiceParamsToTest);
    // console.log("resp== =====", resp);
    // +
    // const resp = await testObj.getListInvoces(); //+
    // const resp = await testObj.getListInvoceByInvoiceId('e4ae8549-5b7d-43c6-a6b9-3fe3be04e085');  //+
    // const resp = await testObj.getListInvoceByCustomId('PAYMENT-123'); //+
    // const resp = await testObj.createRecalculateInvoices(
    //   "28e658b5-138d-4f35-9360-8d6549d0b142",
    //   true
    // ); //invoice_not_recalculatable
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
    // console.log('===============================================', {version: packageJson.version})
    // console.log('///////////////////////////////////////////////', {version})

    // console.log("openApiGeneretedCode== =====", openApiGeneretedCode);

    // axios.interceptors.request.use((req) => {
    //   const { method = "get", data } = req;
    //   const url = req.url?.replace(testObj.getUrl(), "") + "";
    //   const customHeaders = testObj.headerCreator(
    //     method.toUpperCase(),
    //     url,
    //     JSON.parse(data)
    //   );
    //   req.headers = { ...req.headers, ...customHeaders.headers };
    //   // console.log({ req });
    //   return req;
    // });

    // const InvoicesApi = new openApiGeneretedCode.InvoicesApi()
    // const InvoicesApi = openApiGeneretedCode.InvoicesApiFactory(
    //   undefined,
    //   testObj.getUrl(),
    //   axios
    // );
    // InvoicesApi.
    // const configuraror = InvoicesApi.BaseApi
    // configuraror.basePath = 'testtest'
    // const goodResp = await testObj.createInvoiceTwo(invoiceParamsToTest);
    // const goodResp = await testObj.getRetesByPair("BTC/EUR")
    // const goodResp = await testObj
    //   .invoicesApi()
    //   .invoicesCreate(invoiceParamsToTest);

    // const goodResp = await testObj.ratesApi().ratesAll()
    // const goodResp = await testObj.ratesApi().ratesRetrieve("BTC/EUR");
    const goodResp= await cryptoPay
        .invoicesApi()
        .invoicesList();
        console.log('goodResp.data', goodResp.data);
        console.log('goodResp.meta', goodResp.meta);
        console.log('typeof resp',typeof goodResp)
        console.log('keys', Object.keys(goodResp))
    //  fs.writeFileSync("./hello2.txt",JSON.stringify(goodResp))
    //  const goodResp= await testObj
    //     .invoicesApi()
    //     .invoicesRetrieve('10f3f488-dceb-4471-8154-031aa5aa958d');
    //  console.log('goodResp', goodResp);
  } catch (err) {
    // console.log(CustomErrorCreater(err));
    console.log('==============',err)
  }
};

// myTest();
