import CryptoPay from "../../app";
require("dotenv").config();
import axios from "axios";
import { invoiceParamsToTest } from "../../dataToTesting/invoiceParamsToTest";
// responce to test
import ratesPair from "./rates/pair.json";
import list from "./rates/list.json";
import errorToTest from "./error.json";
import invoiceCreated from "./invoice/invoice_created.json";
import invoiceList from "./invoice/invoices_list.json";

const callback_secret = process.env.CALLBACK_SECRET || "";
const api_key = process.env.API_KEY || "";
const api_secret = process.env.API_SECRET || "";
const cryptoPay = new CryptoPay(api_secret, api_key, callback_secret);
let invoiceID = "";
const custom_id = Date.now().toString();
let address = "";
let recalculation_id = "";

jest.mock("axios");
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
        .invoicesCreate({ ...invoiceParamsToTest });
      invoiceID = resp.data.id;
      address = resp.data.address;
      expect(resp).toEqual(invoiceCreated);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        data: '{"price_amount":100,"price_currency":"EUR","pay_currency":"BTC"}',
        headers: { "Content-Type": "application/json" },
        method: "POST",
        url: `${cryptoPay.getUrl()}/api/invoices`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  //invoiceList
  it("Get list invoice has response ", async () => {
    try {
      mockedAxios.request.mockResolvedValue(invoiceList);
      const resp = await cryptoPay.invoicesApi().invoicesList();
      expect(resp).toEqual(invoiceList);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: "GET",
        url: `${cryptoPay.getUrl()}/api/invoices`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Get invoice by invoice id validate response ", async () => {
    try {
      mockedAxios.request.mockResolvedValue(invoiceCreated);
      const resp = await cryptoPay.invoicesApi().invoicesRetrieve(invoiceID);
      expect(resp).toEqual(invoiceCreated);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: "GET",
        url: `${cryptoPay.getUrl()}/api/invoices/${invoiceID}`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Get invoice by invoice id with wrong param ", async () => {
    try {
      mockedAxios.request.mockRejectedValue(errorToTest);
      await cryptoPay.invoicesApi().invoicesList("wrongParams");
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: "GET",
        url: `${cryptoPay.getUrl()}/api/invoices/wrongParams`,
      });
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error).toEqual(errorToTest);
    }
  });

  it("Get list invoce by custom id validate response ", async () => {
    try {
      mockedAxios.request.mockResolvedValue(invoiceCreated);
      const resp = await cryptoPay
        .invoicesApi()
        .invoicesRetrieveByCustomId(custom_id);
      expect(resp).toBeTruthy();
      expect(resp).toEqual(invoiceCreated);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: "GET",
        url: `${cryptoPay.getUrl()}/api/invoices/custom_id/${custom_id}`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it("Get list invoce by custom id  with wrong param ", async () => {
    try {
      mockedAxios.request.mockRejectedValue(errorToTest);
        await cryptoPay.invoicesApi().invoicesRetrieveByCustomId("wrongParams");
        expect(mockedAxios.request).toHaveBeenCalledWith({
          headers: {},
          method: "GET",
          url: `${cryptoPay.getUrl()}/api/invoices/custom_id/wrongParams`,
        });
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error).toEqual(errorToTest);
    }
  });

  it("Get list refund list has response", async () => {
    try {
      mockedAxios.request.mockResolvedValue(invoiceList);
      const resp = await cryptoPay.invoicesApi().invoicesListRefunds(invoiceID);
      expect(resp).toBeTruthy();
      expect(resp).toEqual(invoiceList);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: "GET",
        url: `${cryptoPay.getUrl()}/api/invoices/${invoiceID}/refunds`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it("Get list refund list with wrong param ", async () => {
    try {
      mockedAxios.request.mockRejectedValue(errorToTest);
      await cryptoPay.invoicesApi().invoicesListRefunds("wrongParams");
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: "GET",
        url: `${cryptoPay.getUrl()}/api/invoices/wrongParams/refunds`,
      });
    } catch (error) {
      expect(error).toBeTruthy(); 
      expect(error).toEqual(errorToTest);
    }
  });

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
