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
      expect(typeof resp.buy_rate).toBe("string");
      expect(typeof resp.sell_rate).toBe("string");
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
      const resp: IInvoiceResult = await cryptoPay
        .invoicesApi()
        .invoicesCreate(invoiceParamsToTest);
      invoiceID = resp.id;
      address = resp.address;
      // axiosVCR.ejectCassette('./test/fixtures/invoicesCreate.json')
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
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Get list invoice has response ", async () => {
    try {
      // axiosVCR.mountCassette('./test/fixtures/invoicesList.json')
      let resp = await cryptoPay
        .invoicesApi()
        .invoicesList();
        // axiosVCR.ejectCassette('./test/fixtures/invoicesList.json')
      // fs.writeFileSync("./hello.txt", JSON.stringify(resp));
      // console.log("goodResp.meta", resp.meta);
      /// TODO
      // resp = JSON.parse(resp)
      console.log('data', resp.data);
      console.log('meta', resp.meta);
      console.log('typeof resp',typeof resp)
      console.log('resp[0]', resp[0])
      console.log('keys', Object.keys(resp))
      // expect(typeof resp.data).toBe("object");
      // expect(typeof resp.meta).toBe("object");
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Get invoice by invoice id validate response ", async () => {
    try {
      // axiosVCR.mountCassette('./test/fixtures/invoicesListByInvoiceId.json')
      const resp: IInvoiceResult = await cryptoPay
        .invoicesApi()
        .invoicesRetrieve(invoiceID);
      // axiosVCR.ejectCassette('./test/fixtures/invoicesListByInvoiceId.json')

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
      const resp: IInvoiceResult = await cryptoPay
        .invoicesApi()
        .invoicesRetrieveByCustomId(custom_id);
      // axiosVCR.ejectCassette('./test/fixtures/invoicesRetrieveByCustomId.json')
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
      expect(typeof resp).toBe("object");
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
