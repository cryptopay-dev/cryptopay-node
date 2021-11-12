import CryptoPay from "./app";
import { IRate } from "./interfaces/IRate";
import { invoiceParamsToTest } from "./dataToTesting/invoiceParamsToTest";
import { ICustomError } from "./interfaces/ICustomError";
import { IInvoiceResult } from "./interfaces/IInvoceResult";
import { IInvoiceListResult } from "./interfaces/IInvoiceListResult";
const callback_secret = "sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTE";
const api_key = "D-d6gn9axIWNPn5cPIukoA";
const api_secret = "waNXkbUH7d-yRcImNM8vx9gLDX9ZgjTCpvtwX_anRyg";
const cryptoPay = new CryptoPay(api_secret, api_key, callback_secret);
let invoiceID = "";
const custom_id = "PAYMENT-123"; // need to create dynamic
let address = "";
let recalculation_id = "";
describe("Rates", () => {
  it("Get Retes validation response", async () => {
    const resp = await cryptoPay.getRetes();
    expect(resp).toBeTruthy();
    expect(typeof resp).toBe("object");
  });
  it("Get Retes By Pair validation response", async () => {
    const resp = await cryptoPay.getRetesByPair("BTC/EUR");
    expect(resp).toBeTruthy();
    expect(typeof resp.buy_rate).toBe("string");
    expect(typeof resp.sell_rate).toBe("string");
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
  it("Create invoice validation response", async () => {
    const resp: IInvoiceResult = await cryptoPay.createInvoice(
      invoiceParamsToTest
    );
    invoiceID = resp.id;
    address = resp.address;
    // console.log({resp})
    expect(resp).toBeTruthy();
    expect(typeof resp.id).toBe("string");
    expect((typeof resp.custom_id).toString()).toMatch(/string|object/);
    expect((typeof resp.customer_id).toString()).toMatch(/string|object/);
    expect(typeof resp.status).toBe("string");
    expect((typeof resp.status_context).toString()).toMatch(/string|object/);
    expect(typeof resp.address).toBe("string");
    expect(typeof resp.uri).toBe("string");
    expect(typeof resp.price_amount).toBe("string");
    expect(typeof resp.price_currency).toBe("string");
    expect(typeof resp.fee).toBe("string");
    expect(typeof resp.fee_currency).toBe("string");
    expect(typeof resp.pay_amount).toBe("string");
    expect(typeof resp.pay_currency).toBe("string");
    expect(typeof resp.paid_amount).toBe("string");
    expect(typeof resp.exchange).toBe("object");
    expect(typeof resp.transactions).toBe("object");
    expect((typeof resp.name).toString()).toMatch(/string|object/);
    expect((typeof resp.description).toString()).toMatch(/string|object/);
    expect(typeof resp.metadata).toBe("object");
    expect((typeof resp.success_redirect_url).toString()).toMatch(
      /string|object/
    );
    expect((typeof resp.unsuccess_redirect_url).toString()).toMatch(
      /string|object/
    );
    expect(typeof resp.hosted_page_url).toBe("string");
    expect(typeof resp.created_at).toBe("string");
    expect(typeof resp.expires_at).toBe("string");
  });

  it("Get list invoice has response ", async () => {
    const resp: IInvoiceListResult = await cryptoPay.getListInvoces();
    expect(resp).toBeTruthy();
    expect(typeof resp.data).toBe("object");
    expect(typeof resp.meta).toBe("object");
  });

  it("Get invoice by invoice id validate response ", async () => {
    const resp: IInvoiceResult = await cryptoPay.getInvoceByInvoiceId(
      invoiceID
    );
    expect(resp).toBeTruthy();
    expect(typeof resp.id).toBe("string");
    expect((typeof resp.custom_id).toString()).toMatch(/string|object/);
    expect((typeof resp.customer_id).toString()).toMatch(/string|object/);
    expect(typeof resp.status).toBe("string");
    expect((typeof resp.status_context).toString()).toMatch(/string|object/);
    expect(typeof resp.address).toBe("string");
    expect(typeof resp.uri).toBe("string");
    expect(typeof resp.price_amount).toBe("string");
    expect(typeof resp.price_currency).toBe("string");
    expect(typeof resp.fee).toBe("string");
    expect(typeof resp.fee_currency).toBe("string");
    expect(typeof resp.pay_amount).toBe("string");
    expect(typeof resp.pay_currency).toBe("string");
    expect(typeof resp.paid_amount).toBe("string");
    expect(typeof resp.exchange).toBe("object");
    expect(typeof resp.transactions).toBe("object");
    expect((typeof resp.name).toString()).toMatch(/string|object/);
    expect((typeof resp.description).toString()).toMatch(/string|object/);
    expect(typeof resp.metadata).toBe("object");
    expect((typeof resp.success_redirect_url).toString()).toMatch(
      /string|object/
    );
    expect((typeof resp.unsuccess_redirect_url).toString()).toMatch(
      /string|object/
    );
    expect(typeof resp.hosted_page_url).toBe("string");
    expect(typeof resp.created_at).toBe("string");
    expect(typeof resp.expires_at).toBe("string");
  });

  it("Get invoice by invoice id with wrong param ", async () => {
    try {
      await cryptoPay.getInvoceByInvoiceId("wrong params");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("Get list invoce by custom id validate response ", async () => {
    const resp: IInvoiceResult = await cryptoPay.getInvoceByCustomId(custom_id);
    expect(resp).toBeTruthy();
    expect(typeof resp.id).toBe("string");
    expect((typeof resp.custom_id).toString()).toMatch(/string|object/);
    expect((typeof resp.customer_id).toString()).toMatch(/string|object/);
    expect(typeof resp.status).toBe("string");
    expect((typeof resp.status_context).toString()).toMatch(/string|object/);
    expect(typeof resp.address).toBe("string");
    expect(typeof resp.uri).toBe("string");
    expect(typeof resp.price_amount).toBe("string");
    expect(typeof resp.price_currency).toBe("string");
    expect(typeof resp.fee).toBe("string");
    expect(typeof resp.fee_currency).toBe("string");
    expect(typeof resp.pay_amount).toBe("string");
    expect(typeof resp.pay_currency).toBe("string");
    expect(typeof resp.paid_amount).toBe("string");
    expect(typeof resp.exchange).toBe("object");
    expect(typeof resp.transactions).toBe("object");
    expect((typeof resp.name).toString()).toMatch(/string|object/);
    expect((typeof resp.description).toString()).toMatch(/string|object/);
    expect(typeof resp.metadata).toBe("object");
    expect((typeof resp.success_redirect_url).toString()).toMatch(
      /string|object/
    );
    expect((typeof resp.unsuccess_redirect_url).toString()).toMatch(
      /string|object/
    );
    expect(typeof resp.hosted_page_url).toBe("string");
    expect(typeof resp.created_at).toBe("string");
    expect(typeof resp.expires_at).toBe("string");
  });

  it("Get list invoce by custom id  with wrong param ", async () => {
    try {
      await cryptoPay.getInvoceByCustomId("wrong params");
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
    expect(typeof resp).toBe("object");
  });
  it("Get list refund list with wrong param ", async () => {
    try {
      await cryptoPay.getListInvoiceRefund("wrong params");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
