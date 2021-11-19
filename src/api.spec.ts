import CryptoPay from "../src/app";
import { invoiceParamsToTest } from "../src/dataToTesting/invoiceParamsToTest";
import { IInvoiceResult } from "../src/interfaces/IInvoceResult";
import { IInvoiceListResult } from "../src/interfaces/IInvoiceListResult";
const axiosVCR = require("axios-vcr"); // there are no types in the library, you need to import via requir
const fs = require("fs"); //tmp



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
    try {
      // axiosVCR.mountCassette('./test/fixtures/ratesAll.json')
      const resp = await cryptoPay.ratesApi().ratesAll();
      // axiosVCR.ejectCassette('./test/fixtures/ratesAll.json')
      expect(resp).toBeTruthy();
      expect(typeof resp).toBe("object");
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it("Get Retes By Pair validation response", async () => {
    try {
      // axiosVCR.mountCassette('./test/fixtures/ratesRetrieve.json')
      const resp = await cryptoPay.ratesApi().ratesRetrieve("BTC/EUR");
      // axiosVCR.ejectCassette('./test/fixtures/ratesRetrieve.json')
      expect(resp).toBeTruthy();
      expect(typeof resp.data.buy_rate).toBe("string");
      expect(typeof resp.data.sell_rate).toBe("string");
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it("Get Retes By Pair with wrong params", async () => {
    try {
      // axiosVCR.mountCassette('./test/fixtures/ratesRetrieveWithWrongParams.json')
      await cryptoPay.ratesApi().ratesRetrieve("wrongParams");
      // axiosVCR.ejectCassette('./test/fixtures/ratesRetrieveWithWrongParams.json')
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});

describe("Invoice", () => {
  it("Create invoice validation response", async () => {
    try {
      // axiosVCR.mountCassette('./test/fixtures/invoicesCreate.json')
      const resp= await cryptoPay
        .invoicesApi()
        .invoicesCreate(invoiceParamsToTest);
      invoiceID = resp.data.id;
      address = resp.data.address;
      // axiosVCR.ejectCassette('./test/fixtures/invoicesCreate.json')
      expect(resp).toBeTruthy();
      expect(typeof resp.data.id).toBe("string");
      expect((typeof resp.data.custom_id).toString()).toMatch(/string|object/);
      expect((typeof resp.data.customer_id).toString()).toMatch(/string|object/);
      expect(typeof resp.data.status).toBe("string");
      expect((typeof resp.data.status_context).toString()).toMatch(/string|object/);
      expect(typeof resp.data.address).toBe("string");
      expect(typeof resp.data.uri).toBe("string");
      expect(typeof resp.data.price_amount).toBe("string");
      expect(typeof resp.data.price_currency).toBe("string");
      expect(typeof resp.data.fee).toBe("string");
      expect(typeof resp.data.fee_currency).toBe("string");
      expect(typeof resp.data.pay_amount).toBe("string");
      expect(typeof resp.data.pay_currency).toBe("string");
      expect(typeof resp.data.paid_amount).toBe("string");
      expect(typeof resp.data.exchange).toBe("object");
      expect(typeof resp.data.transactions).toBe("object");
      expect((typeof resp.data.name).toString()).toMatch(/string|object/);
      expect((typeof resp.data.description).toString()).toMatch(/string|object/);
      expect(typeof resp.data.metadata).toBe("object");
      expect((typeof resp.data.success_redirect_url).toString()).toMatch(
        /string|object/
      );
      expect((typeof resp.data.unsuccess_redirect_url).toString()).toMatch(
        /string|object/
      );
      expect(typeof resp.data.hosted_page_url).toBe("string");
      expect(typeof resp.data.created_at).toBe("string");
      expect(typeof resp.data.expires_at).toBe("string");
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Get list invoice has response ", async () => {
    try {
      // axiosVCR.mountCassette('./test/fixtures/invoicesList.json')
      const resp = await cryptoPay
      .invoicesApi()
      .invoicesList();
      // axiosVCR.ejectCassette('./test/fixtures/invoicesList.json')
      expect(typeof resp.data).toBe("object");
      expect(typeof resp.meta).toBe("object");
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Get invoice by invoice id validate response ", async () => {
    try {
      // axiosVCR.mountCassette('./test/fixtures/invoicesListByInvoiceId.json')
      const resp = await cryptoPay
        .invoicesApi()
        .invoicesRetrieve(invoiceID);
      // axiosVCR.ejectCassette('./test/fixtures/invoicesListByInvoiceId.json')

      expect(typeof resp.data.id).toBe("string");
      expect((typeof resp.data.custom_id).toString()).toMatch(/string|object/);
      expect((typeof resp.data.customer_id).toString()).toMatch(/string|object/);
      expect(typeof resp.data.status).toBe("string");
      expect((typeof resp.data.status_context).toString()).toMatch(/string|object/);
      expect(typeof resp.data.address).toBe("string");
      expect(typeof resp.data.uri).toBe("string");
      expect(typeof resp.data.price_amount).toBe("string");
      expect(typeof resp.data.price_currency).toBe("string");
      expect(typeof resp.data.fee).toBe("string");
      expect(typeof resp.data.fee_currency).toBe("string");
      expect(typeof resp.data.pay_amount).toBe("string");
      expect(typeof resp.data.pay_currency).toBe("string");
      expect(typeof resp.data.paid_amount).toBe("string");
      expect(typeof resp.data.exchange).toBe("object");
      expect(typeof resp.data.transactions).toBe("object");
      expect((typeof resp.data.name).toString()).toMatch(/string|object/);
      expect((typeof resp.data.description).toString()).toMatch(/string|object/);
      expect(typeof resp.data.metadata).toBe("object");
      expect((typeof resp.data.success_redirect_url).toString()).toMatch(
        /string|object/
      );
      expect((typeof resp.data.unsuccess_redirect_url).toString()).toMatch(
        /string|object/
      );
      expect(typeof resp.data.hosted_page_url).toBe("string");
      expect(typeof resp.data.created_at).toBe("string");
      expect(typeof resp.data.expires_at).toBe("string");
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Get invoice by invoice id with wrong param ", async () => {
    try {
      // axiosVCR.mountCassette('./test/fixtures/invoicesListByInvoiceIdWithWrongParams.json')
      await cryptoPay.invoicesApi().invoicesList("wrong params");
      // axiosVCR.ejectCassette('./test/fixtures/invoicesListByInvoiceIdWithWrongParams.json')
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("Get list invoce by custom id validate response ", async () => {
    try {
      // axiosVCR.mountCassette('./test/fixtures/invoicesRetrieveByCustomId.json')
      const resp = await cryptoPay
        .invoicesApi()
        .invoicesRetrieveByCustomId(custom_id);
      // axiosVCR.ejectCassette('./test/fixtures/invoicesRetrieveByCustomId.json')
      expect(resp).toBeTruthy();
      expect(typeof resp.data.id).toBe("string");
      expect((typeof resp.data.custom_id).toString()).toMatch(/string|object/);
      expect((typeof resp.data.customer_id).toString()).toMatch(/string|object/);
      expect(typeof resp.data.status).toBe("string");
      expect((typeof resp.data.status_context).toString()).toMatch(/string|object/);
      expect(typeof resp.data.address).toBe("string");
      expect(typeof resp.data.uri).toBe("string");
      expect(typeof resp.data.price_amount).toBe("string");
      expect(typeof resp.data.price_currency).toBe("string");
      expect(typeof resp.data.fee).toBe("string");
      expect(typeof resp.data.fee_currency).toBe("string");
      expect(typeof resp.data.pay_amount).toBe("string");
      expect(typeof resp.data.pay_currency).toBe("string");
      expect(typeof resp.data.paid_amount).toBe("string");
      expect(typeof resp.data.exchange).toBe("object");
      expect(typeof resp.data.transactions).toBe("object");
      expect((typeof resp.data.name).toString()).toMatch(/string|object/);
      expect((typeof resp.data.description).toString()).toMatch(/string|object/);
      expect(typeof resp.data.metadata).toBe("object");
      expect((typeof resp.data.success_redirect_url).toString()).toMatch(
        /string|object/
      );
      expect((typeof resp.data.unsuccess_redirect_url).toString()).toMatch(
        /string|object/
      );
      expect(typeof resp.data.hosted_page_url).toBe("string");
      expect(typeof resp.data.created_at).toBe("string");
      expect(typeof resp.data.expires_at).toBe("string");
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Get list invoce by custom id  with wrong param ", async () => {
    try {
      // axiosVCR.mountCassette('./test/fixtures/invoicesRetrieveByCustomIdWithWrongParams.json')
      await cryptoPay.invoicesApi().invoicesRetrieveByCustomId("wrong params");
      // axiosVCR.ejectCassette('./test/fixtures/invoicesRetrieveByCustomIdWithWrongParams.json')
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  it("Get list refund list has response", async () => {
    try {
      // axiosVCR.mountCassette('./test/fixtures/invoicesListRefunds.json')
      const resp = await cryptoPay.invoicesApi().invoicesListRefunds(invoiceID);
      // axiosVCR.mountCassette('./test/fixtures/invoicesListRefunds.json')
      expect(resp).toBeTruthy();
      expect(typeof resp.data).toBe("object");
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it("Get list refund list with wrong param ", async () => {
    try {
     // axiosVCR.mountCassette('./test/fixtures/invoicesListRefundsWithWrongParams.json')
      await cryptoPay.invoicesApi().invoicesListRefunds("wrong params");
      //axiosVCR.ejectCassette('./test/fixtures/invoicesListRefundsWithWrongParams.json')
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });

  // // Temporarily not working
  // // it("Create recalculate invoices has response", async () => {
  // //   const resp = await cryptoPay.createRecalculateInvoices(invoiceID, true);
  // //   expect(resp).toBeTruthy()
  // // });
  // // it("Create refund invoices has response", async () => {
  // //   const resp = await cryptoPay.createInvoiceRefund(invoiceID ,address);
  // //   expect(resp).toBeTruthy()
  // // });
  // // it("Commit recalculate invoices has response", async () => {
  // //   const resp = await cryptoPay.commitRecalculateInvoicesByIds(invoiceID ,recalculation_id);
  // //   expect(resp).toBeTruthy()
  // // });
});

