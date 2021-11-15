import CryptoPay from "../src/app";
import { invoiceParamsToTest } from "../src/dataToTesting/invoiceParamsToTest";
import { IInvoiceResult } from "../src/interfaces/IInvoceResult";
import { IInvoiceListResult } from "../src/interfaces/IInvoiceListResult";
const axiosVCR = require('axios-vcr'); // there are no types in the library, you need to import via requirered
const callback_secret = "sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTE";
const api_key = "D-d6gn9axIWNPn5cPIukoA";
const api_secret = "waNXkbUH7d-yRcImNM8vx9gLDX9ZgjTCpvtwX_anRyg";
const cryptoPay = new CryptoPay(api_secret, api_key, callback_secret);
let invoiceID = "";
const custom_id = "PAYMENT-123"; 
let address = "";
let recalculation_id = "";

describe("Rates", () => {
  it("Get Retes validation response", async () => {
    axiosVCR.mountCassette('./test/fixtures/getRetes.json')
    const resp = await cryptoPay.getRetes();
    axiosVCR.ejectCassette('./test/fixtures/getRetes.json')
    expect(resp).toBeTruthy();
    expect(typeof resp).toBe("object");
  });
  it("Get Retes By Pair validation response", async () => {
    axiosVCR.mountCassette('./test/fixtures/getRetesByPair.json')
    const resp = await cryptoPay.getRetesByPair("BTC/EUR");
    axiosVCR.ejectCassette('./test/fixtures/getRetesByPair.json')
    expect(resp).toBeTruthy();
    expect(typeof resp.buy_rate).toBe("string");
    expect(typeof resp.sell_rate).toBe("string");
  });
  it("Get Retes By Pair with wrong params", async () => {
    try {
      axiosVCR.mountCassette('./test/fixtures/getRetesByPairWithWrongParams.json')
      await cryptoPay.getRetesByPair("wrongParams");
      axiosVCR.ejectCassette('./test/fixtures/getRetesByPairWithWrongParams.json')
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

describe("Invoice", () => {
  it("Create invoice validation response", async () => {
    axiosVCR.mountCassette('./test/fixtures/createInvoice.json')
    const resp: IInvoiceResult = await cryptoPay.createInvoice(
      invoiceParamsToTest
    );
    invoiceID = resp.id;
    address = resp.address;
    axiosVCR.ejectCassette('./test/fixtures/createInvoice.json')  
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
    axiosVCR.mountCassette('./test/fixtures/getListInvoces.json')
    const resp: IInvoiceListResult = await cryptoPay.getListInvoces();
    axiosVCR.ejectCassette('./test/fixtures/getListInvoces.json')
    expect(resp).toBeTruthy();
    expect(typeof resp.data).toBe("object");
    expect(typeof resp.meta).toBe("object");
  });

  it("Get invoice by invoice id validate response ", async () => {
    axiosVCR.mountCassette('./test/fixtures/getInvoceByInvoiceId.json')
    const resp: IInvoiceResult = await cryptoPay.getInvoceByInvoiceId(
      invoiceID
    );
    axiosVCR.ejectCassette('./test/fixtures/getInvoceByInvoiceId.json')
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
      axiosVCR.mountCassette('./test/fixtures/getInvoceByInvoiceIdWithWrongParams.json')
      await cryptoPay.getInvoceByInvoiceId("wrong params");
      axiosVCR.ejectCassette('./test/fixtures/getInvoceByInvoiceIdWithWrongParams.json')
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("Get list invoce by custom id validate response ", async () => {
    axiosVCR.mountCassette('./test/fixtures/getInvoceByCustomId.json')
    const resp: IInvoiceResult = await cryptoPay.getInvoceByCustomId(custom_id);
    axiosVCR.ejectCassette('./test/fixtures/getInvoceByCustomId.json')  
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
      axiosVCR.mountCassette('./test/fixtures/getInvoceByCustomIdWithWrongParams.json')
      await cryptoPay.getInvoceByCustomId("wrong params");
      axiosVCR.ejectCassette('./test/fixturesgetInvoceByCustomIdWithWrongParams.json')
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
    axiosVCR.mountCassette('./test/fixtures/getListInvoiceRefund.json')
    const resp = await cryptoPay.getListInvoiceRefund(invoiceID);
    axiosVCR.mountCassette('./test/fixtures/getListInvoiceRefund.json')
    expect(resp).toBeTruthy();
    expect(typeof resp).toBe("object");
  });
  it("Get list refund list with wrong param ", async () => {
    try {
      axiosVCR.mountCassette('./test/fixtures/getListInvoiceRefundWithWrongParams.json')
      await cryptoPay.getListInvoiceRefund("wrong params");
      axiosVCR.ejectCassette('./test/fixtures/getListInvoiceRefundWithWrongParams.json')
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
