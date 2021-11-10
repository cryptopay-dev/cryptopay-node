import CryptoPay from "./app";
import { IRate } from "./interfaces/IRate";
import { invoiceParamsToTest } from "./dataToTesting/invoiceParamsToTest";
import { ICustomError } from "./interfaces/ICustomError";
const callback_secret = "sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTE";
const api_key = "D-d6gn9axIWNPn5cPIukoA";
const api_secret = "waNXkbUH7d-yRcImNM8vx9gLDX9ZgjTCpvtwX_anRyg";
const cryptoPay = new CryptoPay(api_secret, api_key, callback_secret);
let invoiceID = "";
const custom_id = "PAYMENT-123"; // need to create dynamic
let address = "";
let recalculation_id = "";
describe("Rates", () => {
  it("Get Retes has response", async () => {
    const resp = await cryptoPay.getRetes();
    expect(resp).toBeTruthy();
  });
  it("Get Retes By Pair has response", async () => {
    const resp = await cryptoPay.getRetesByPair("BTC/EUR");
    expect(resp).toBeTruthy();
  });
  it("Get Retes By Pair with wrong params", async () => {
    try {
      await cryptoPay.getRetesByPair("wrongParams");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

describe("Invoice", () => {
  it("Create invoice has response", async () => {
    const resp = await cryptoPay.createInvoice(invoiceParamsToTest);
    invoiceID = resp.id;
    address = resp.address;
    expect(resp).toBeTruthy();
  });

  it("Get list invoice has response ", async () => {
    const resp = await cryptoPay.getListInvoces();
    expect(resp).toBeTruthy();
  });

  it("Get invoice by invoice id has response ", async () => {
    const resp = await cryptoPay.getInvoceByInvoiceId(invoiceID);
    expect(resp).toBeTruthy();
  });

  it("Get invoice by invoice id with wrong param ", async () => {
    try {
      await cryptoPay.getInvoceByInvoiceId("wrong params");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("Get list invoce by custom id has response ", async () => {
    const resp = await cryptoPay.getListInvoceByCustomId(custom_id);
    expect(resp).toBeTruthy();
  });

  it("Get list invoce by custom id  with wrong param ", async () => {
    try {
      await cryptoPay.getListInvoceByCustomId("wrong params");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });


  
  // Temporarily not working
  // it("Create recalculate invoices has response", async () => {
  //   const resp = await cryptoPay.createRecalculateInvoices(invoiceID, true);
  //   expect(resp).toBeTruthy()
  // });
  // it("Create refund invoices has response", async () => {
  //   const resp = await cryptoPay.createInvoiceRefund(invoiceID ,address);
  //   expect(resp).toBeTruthy()
  // });
  // it("Commit recalculate invoices has response", async () => {
  //   const resp = await cryptoPay.commitRecalculateInvoicesByIds(invoiceID ,recalculation_id);
  //   expect(resp).toBeTruthy()
  // });

  it("Get list refund list has response", async () => {
    const resp = await cryptoPay.getListInvoiceRefund(invoiceID);
    expect(resp).toBeTruthy();
  });
  it("Get list refund list with wrong param ", async () => {
    try {
      await cryptoPay.getListInvoiceRefund("wrong params");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
