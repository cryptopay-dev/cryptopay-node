import CryptoPay from "../../app";
require('dotenv').config();
import axios from 'axios'
import { invoiceParamsToTest } from "../../dataToTesting/invoiceParamsToTest";
// responce to test
import ratesPair from "./rates/pair.json"; 
import list from "./rates/list.json"
import errorToTest from "./error.json"
import invoiceCreated from './invoice/invoice_created.json'

const callback_secret = process.env.CALLBACK_SECRET || "";
const api_key = process.env.API_KEY || "";
const api_secret = process.env.API_SECRET || "";
const cryptoPay = new CryptoPay(api_secret, api_key, callback_secret);
let invoiceID = "";
const custom_id = Date.now().toString();
let address = "";
let recalculation_id = "";


jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;
//+
// describe("Rates", () => {
//   it("Get Retes validation response", async () => {
//     try {
//       mockedAxios.request.mockResolvedValue(list);
//       const resp = await cryptoPay.ratesApi().ratesAll();
//       expect(resp).toBeTruthy();
//       expect(resp).toEqual(list);
//       expect(mockedAxios.request).toHaveBeenCalledWith( {"headers": {}, "method": "GET", "url": `${cryptoPay.getUrl()}/api/rates`})
//     } catch (error) {
//       expect(error).toBeFalsy();
//     }
//   });
//   it("Get Rete  By Pair validation response", async () => {
//     try {
//       mockedAxios.request.mockResolvedValue(ratesPair);
//       const resp = await cryptoPay.ratesApi().ratesRetrieve("BTC/EUR");
//       expect(resp).toEqual(ratesPair);
//       expect(mockedAxios.request).toHaveBeenCalledWith( {"headers": {}, "method": "GET", "url": `${cryptoPay.getUrl()}/api/rates/BTC%2FEUR`});
//     } catch (error) {
//       expect(error).toBeFalsy();
//     }
//   });
//   it("Get Retes By Pair with wrong params", async () => {
//     try {
//       mockedAxios.request.mockRejectedValue(errorToTest);
//       await cryptoPay.ratesApi().ratesRetrieve("wrongParams");
//       expect(mockedAxios.request).toHaveBeenCalledWith( {"headers": {}, "method": "GET", "url": `${cryptoPay.getUrl()}/api/rates`})
//     } catch (error) {
//       expect(error).toBeTruthy();
//       expect(error).toEqual(errorToTest);
//     }
//   });
// });

describe("Invoice", () => {
  it("Create invoice validation response", async () => {
    try {
      mockedAxios.request.mockResolvedValue(invoiceCreated);
      const resp = await cryptoPay
        .invoicesApi()
        .invoicesCreate({ ...invoiceParamsToTest, custom_id });
      invoiceID = resp.data.id;
      address = resp.data.address;
      expect(resp).toEqual(invoiceCreated);
      expect(mockedAxios.request).toHaveBeenCalledWith( {"headers": {}, "method": "POST", "url": `${cryptoPay.getUrl()}/api/invoices`});

      // expect(resp).toBeTruthy();
      // expect(typeof resp.data.id).toBe("string");
      // expect((typeof resp.data.custom_id).toString()).toMatch(/string|object/);
      // expect((typeof resp.data.customer_id).toString()).toMatch(
      //   /string|object/
      // );
      // expect(typeof resp.data.status).toBe("string");
      // expect((typeof resp.data.status_context).toString()).toMatch(
      //   /string|object/
      // );
      // expect(typeof resp.data.address).toBe("string");
      // expect(typeof resp.data.uri).toBe("string");
      // expect(typeof resp.data.price_amount).toBe("string");
      // expect(typeof resp.data.price_currency).toBe("string");
      // expect(typeof resp.data.fee).toBe("string");
      // expect(typeof resp.data.fee_currency).toBe("string");
      // expect(typeof resp.data.pay_amount).toBe("string");
      // expect(typeof resp.data.pay_currency).toBe("string");
      // expect(typeof resp.data.paid_amount).toBe("string");
      // expect(typeof resp.data.exchange).toBe("object");
      // expect(typeof resp.data.transactions).toBe("object");
      // expect((typeof resp.data.name).toString()).toMatch(/string|object/);
      // expect((typeof resp.data.description).toString()).toMatch(
      //   /string|object/
      // );
      // expect(typeof resp.data.metadata).toBe("object");
      // expect((typeof resp.data.success_redirect_url).toString()).toMatch(
      //   /string|object/
      // );
      // expect((typeof resp.data.unsuccess_redirect_url).toString()).toMatch(
      //   /string|object/
      // );
      // expect(typeof resp.data.hosted_page_url).toBe("string");
      // expect(typeof resp.data.created_at).toBe("string");
      // expect(typeof resp.data.expires_at).toBe("string");
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  // it("Get list invoice has response ", async () => {
  //   try {
  //     // axiosVCR.mountCassette('./test/fixtures/invoicesList.json')
  //     const resp = await cryptoPay.invoicesApi().invoicesList();
  //     // axiosVCR.ejectCassette('./test/fixtures/invoicesList.json')
  //     expect(typeof resp.data).toBe("object");
  //     expect(typeof resp.meta).toBe("object");
  //   } catch (error) {
  //     expect(error).toBeFalsy();
  //   }
  // });

  // it("Get invoice by invoice id validate response ", async () => {
  //   try {
  //     // axiosVCR.mountCassette('./test/fixtures/invoicesListByInvoiceId.json')
  //     const resp = await cryptoPay.invoicesApi().invoicesRetrieve(invoiceID);
  //     // axiosVCR.ejectCassette('./test/fixtures/invoicesListByInvoiceId.json')

  //     expect(typeof resp.data.id).toBe("string");
  //     expect((typeof resp.data.custom_id).toString()).toMatch(/string|object/);
  //     expect((typeof resp.data.customer_id).toString()).toMatch(
  //       /string|object/
  //     );
  //     expect(typeof resp.data.status).toBe("string");
  //     expect((typeof resp.data.status_context).toString()).toMatch(
  //       /string|object/
  //     );
  //     expect(typeof resp.data.address).toBe("string");
  //     expect(typeof resp.data.uri).toBe("string");
  //     expect(typeof resp.data.price_amount).toBe("string");
  //     expect(typeof resp.data.price_currency).toBe("string");
  //     expect(typeof resp.data.fee).toBe("string");
  //     expect(typeof resp.data.fee_currency).toBe("string");
  //     expect(typeof resp.data.pay_amount).toBe("string");
  //     expect(typeof resp.data.pay_currency).toBe("string");
  //     expect(typeof resp.data.paid_amount).toBe("string");
  //     expect(typeof resp.data.exchange).toBe("object");
  //     expect(typeof resp.data.transactions).toBe("object");
  //     expect((typeof resp.data.name).toString()).toMatch(/string|object/);
  //     expect((typeof resp.data.description).toString()).toMatch(
  //       /string|object/
  //     );
  //     expect(typeof resp.data.metadata).toBe("object");
  //     expect((typeof resp.data.success_redirect_url).toString()).toMatch(
  //       /string|object/
  //     );
  //     expect((typeof resp.data.unsuccess_redirect_url).toString()).toMatch(
  //       /string|object/
  //     );
  //     expect(typeof resp.data.hosted_page_url).toBe("string");
  //     expect(typeof resp.data.created_at).toBe("string");
  //     expect(typeof resp.data.expires_at).toBe("string");
  //   } catch (error) {
  //     expect(error).toBeFalsy();
  //   }
  // });

  // it("Get invoice by invoice id with wrong param ", async () => {
  //   try {
  //     // axiosVCR.mountCassette('./test/fixtures/invoicesListByInvoiceIdWithWrongParams.json')
  //     await cryptoPay.invoicesApi().invoicesList("wrong params");
  //     // axiosVCR.ejectCassette('./test/fixtures/invoicesListByInvoiceIdWithWrongParams.json')
  //   } catch (error) {
  //     expect(error).toBeTruthy();
  //   }
  // });

  // it("Get list invoce by custom id validate response ", async () => {
  //   try {
  //     // axiosVCR.mountCassette('./test/fixtures/invoicesRetrieveByCustomId.json')
  //     const resp = await cryptoPay
  //       .invoicesApi()
  //       .invoicesRetrieveByCustomId(custom_id);
  //     // axiosVCR.ejectCassette('./test/fixtures/invoicesRetrieveByCustomId.json')
  //     expect(resp).toBeTruthy();
  //     expect(typeof resp.data.id).toBe("string");
  //     expect((typeof resp.data.custom_id).toString()).toMatch(/string|object/);
  //     expect((typeof resp.data.customer_id).toString()).toMatch(
  //       /string|object/
  //     );
  //     expect(typeof resp.data.status).toBe("string");
  //     expect((typeof resp.data.status_context).toString()).toMatch(
  //       /string|object/
  //     );
  //     expect(typeof resp.data.address).toBe("string");
  //     expect(typeof resp.data.uri).toBe("string");
  //     expect(typeof resp.data.price_amount).toBe("string");
  //     expect(typeof resp.data.price_currency).toBe("string");
  //     expect(typeof resp.data.fee).toBe("string");
  //     expect(typeof resp.data.fee_currency).toBe("string");
  //     expect(typeof resp.data.pay_amount).toBe("string");
  //     expect(typeof resp.data.pay_currency).toBe("string");
  //     expect(typeof resp.data.paid_amount).toBe("string");
  //     expect(typeof resp.data.exchange).toBe("object");
  //     expect(typeof resp.data.transactions).toBe("object");
  //     expect((typeof resp.data.name).toString()).toMatch(/string|object/);
  //     expect((typeof resp.data.description).toString()).toMatch(
  //       /string|object/
  //     );
  //     expect(typeof resp.data.metadata).toBe("object");
  //     expect((typeof resp.data.success_redirect_url).toString()).toMatch(
  //       /string|object/
  //     );
  //     expect((typeof resp.data.unsuccess_redirect_url).toString()).toMatch(
  //       /string|object/
  //     );
  //     expect(typeof resp.data.hosted_page_url).toBe("string");
  //     expect(typeof resp.data.created_at).toBe("string");
  //     expect(typeof resp.data.expires_at).toBe("string");
  //   } catch (error) {
  //     expect(error).toBeFalsy();
  //   }
  // });

  // it("Get list invoce by custom id  with wrong param ", async () => {
  //   try {
  //     // axiosVCR.mountCassette('./test/fixtures/invoicesRetrieveByCustomIdWithWrongParams.json')
  //     await cryptoPay.invoicesApi().invoicesRetrieveByCustomId("wrong params");
  //     // axiosVCR.ejectCassette('./test/fixtures/invoicesRetrieveByCustomIdWithWrongParams.json')
  //   } catch (error) {
  //     expect(error).toBeTruthy();
  //   }
  // });

  // it("Get list refund list has response", async () => {
  //   try {
  //     // axiosVCR.mountCassette('./test/fixtures/invoicesListRefunds.json')
  //     const resp = await cryptoPay.invoicesApi().invoicesListRefunds(invoiceID);
  //     // axiosVCR.mountCassette('./test/fixtures/invoicesListRefunds.json')
  //     expect(resp).toBeTruthy();
  //     expect(typeof resp.data).toBe("object");
  //   } catch (error) {
  //     expect(error).toBeFalsy();
  //   }
  // });
  // it("Get list refund list with wrong param ", async () => {
  //   try {
  //     // axiosVCR.mountCassette('./test/fixtures/invoicesListRefundsWithWrongParams.json')
  //     await cryptoPay.invoicesApi().invoicesListRefunds("wrong params");
  //     //axiosVCR.ejectCassette('./test/fixtures/invoicesListRefundsWithWrongParams.json')
  //   } catch (error) {
  //     expect(error).toBeTruthy();
  //   }
  // });

  // // Temporarily not working
  // // it("Create recalculate invoices has response", async () => {
  // //   const resp = await cryptoPay.invoicesApi().invoicesCreateRecalculation(invoiceID, true);
  // //   expect(resp).toBeTruthy()
  // // });
  // // it("Create refund invoices has response", async () => {
  // //   const resp = await cryptoPay.invoicesApi().invoicesCreateRefund(invoiceID ,address);
  // //   expect(resp).toBeTruthy()
  // // });
  // // it("Commit recalculate invoices has response", async () => {
  // //   const resp = await cryptoPay.invoicesApi().invoicesCommitRecalculation(invoiceID ,recalculation_id);
  // //   expect(resp).toBeTruthy()
  // // });
});
