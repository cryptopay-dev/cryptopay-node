import CryptoPay from "./app";
import { IRate } from "./interfaces/IRate";
import { MockProxy } from 'jest-mock-extended';
import { invoiceParamsToTest } from "./dataToTesting/invoiceParamsToTest";

// const  CryptoPay  =require( "../src/app");
const callback_secret = "sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTE";
// const api_key = "7AA2P-w0RxZXG-_K4cRngQ";
// const api_secret = "NGR0vvNXKO_p3v2zz5ZuShP36Vp19ekZ9nLORtVZYpc";
const api_key = "D-d6gn9axIWNPn5cPIukoA";
const api_secret = "waNXkbUH7d-yRcImNM8vx9gLDX9ZgjTCpvtwX_anRyg";
const cryptoPay = new CryptoPay(api_secret, api_key, callback_secret);
// // var assert = require('assert');
let invoiceID = ''
const custom_id = 'PAYMENT-123'  // need to create dynamic
describe("Rates", () => {

  it("Get Retes has response", async () => {
    const resp = await cryptoPay.getRetes();
    expect(resp).toBeTruthy()  
  });
  it("Get Retes By Pair has response", async () => {
    const resp = await cryptoPay.getRetesByPair("BTC/EUR");
    expect(resp).toBeTruthy()  
  });
  it("Get Retes By Pair with wrong params", async () => {
    try {
      const resp = await cryptoPay.getRetesByPair("wrongParams");
    } catch (error) {
      expect(error).toBeTruthy()
    }
  });
});


describe("Invoice", () => {
 it("Create invoice has response", async () => {
    const resp = await cryptoPay.createInvoice(invoiceParamsToTest);
    console.log({resp})
    invoiceID = resp.id
    expect(resp).toBeTruthy()  
  });
  it("Get list invoice has response ", async () => {
    const resp = await cryptoPay.getListInvoces();
    expect(resp).toBeTruthy()  
  });
  it("Get invoice by invoice id has response ", async () => {
    const resp = await cryptoPay.getInvoceByInvoiceId(invoiceID);
    expect(resp).toBeTruthy()  
  });
  it("Get list invoce by custom id has response ", async () => {
    const resp = await cryptoPay.getListInvoceByCustomId(custom_id);
    expect(resp).toBeTruthy()  
  });
  // tmp
  // it("Create  recalculate invoices has response", async () => {
  //   const resp = await cryptoPay.createRecalculateInvoices(invoiceID, true);
  //   expect(resp).toBeTruthy()  
  // });
  
})