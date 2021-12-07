import axios from 'axios';
import dotenv from 'dotenv';
import CryptoPay from '..';
import errorToTest from './data/error.json';
import invoiceCreated from './data/invoice/invoice_created.json';
import invoiceList from './data/invoice/invoices_list.json';
import recalculation from './data/invoice/recalculation.json';
import { invoiceParamsToTest } from './data/invoiceParamsToTest';
import list from './data/rates/list.json';
// responce to test
import ratesPair from './data/rates/pair.json';
dotenv.config();
// fake data to test that
const invoiceID = 'invoiceID';
const address = 'address';
const recalculationID = 'recalculationId';
const customID = 'customID';

const callbackSecret = process.env.CALLBACK_SECRET || '';
const apiKey = process.env.API_KEY || '';
const apiSecret = process.env.API_SECRET || '';
const cryptoPay = new CryptoPay(apiSecret, apiKey, callbackSecret);

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Rates', () => {
  it('Get Retes validation response', async () => {
    try {
      mockedAxios.request.mockResolvedValue(list);
      const resp = await cryptoPay.ratesApi().ratesAll();
      expect(resp).toBeTruthy();
      expect(resp).toEqual(list);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptoPay.getUrl()}/api/rates`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it('Get Rete  By Pair validation response', async () => {
    try {
      mockedAxios.request.mockResolvedValue(ratesPair);
      const resp = await cryptoPay.ratesApi().ratesRetrieve('BTC/EUR');
      expect(resp).toEqual(ratesPair);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptoPay.getUrl()}/api/rates/BTC%2FEUR`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it('Get Retes By Pair with wrong params', async () => {
    try {
      mockedAxios.request.mockRejectedValue(errorToTest);
      await cryptoPay.ratesApi().ratesRetrieve('wrongParams');
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptoPay.getUrl()}/api/rates`,
      });
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error).toEqual(errorToTest);
    }
  });
});

describe('Invoice', () => {
  it('Create invoice validation response', async () => {
    try {
      mockedAxios.request.mockResolvedValue(invoiceCreated);
      const resp = await cryptoPay.invoicesApi().invoicesCreate(invoiceParamsToTest);
      expect(resp).toEqual(invoiceCreated);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        data: JSON.stringify(invoiceParamsToTest),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: `${cryptoPay.getUrl()}/api/invoices`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it('Get list invoice has response ', async () => {
    try {
      mockedAxios.request.mockResolvedValue(invoiceList);
      const resp = await cryptoPay.invoicesApi().invoicesList();
      expect(resp).toEqual(invoiceList);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptoPay.getUrl()}/api/invoices`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it('Get invoice by invoice id validate response ', async () => {
    try {
      mockedAxios.request.mockResolvedValue(invoiceCreated);
      const resp = await cryptoPay.invoicesApi().invoicesRetrieve(invoiceID);
      expect(resp).toEqual(invoiceCreated);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptoPay.getUrl()}/api/invoices/${invoiceID}`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it('Get invoice by invoice id with wrong param ', async () => {
    try {
      mockedAxios.request.mockRejectedValue(errorToTest);
      await cryptoPay.invoicesApi().invoicesList('wrongParams');
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptoPay.getUrl()}/api/invoices/wrongParams`,
      });
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error).toEqual(errorToTest);
    }
  });

  it('Get list invoce by custom id validate response ', async () => {
    try {
      mockedAxios.request.mockResolvedValue(invoiceCreated);
      const resp = await cryptoPay.invoicesApi().invoicesRetrieveByCustomId(customID);
      expect(resp).toBeTruthy();
      expect(resp).toEqual(invoiceCreated);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptoPay.getUrl()}/api/invoices/custom_id/${customID}`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it('Get list invoce by custom id  with wrong param ', async () => {
    try {
      mockedAxios.request.mockRejectedValue(errorToTest);
      await cryptoPay.invoicesApi().invoicesRetrieveByCustomId('wrongParams');
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptoPay.getUrl()}/api/invoices/custom_id/wrongParams`,
      });
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error).toEqual(errorToTest);
    }
  });

  it('Get list refund list has response', async () => {
    try {
      mockedAxios.request.mockResolvedValue(invoiceList);
      const resp = await cryptoPay.invoicesApi().invoicesListRefunds(invoiceID);
      expect(resp).toBeTruthy();
      expect(resp).toEqual(invoiceList);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptoPay.getUrl()}/api/invoices/${invoiceID}/refunds`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it('Get list refund list with wrong param ', async () => {
    try {
      mockedAxios.request.mockRejectedValue(errorToTest);
      await cryptoPay.invoicesApi().invoicesListRefunds('wrongParams');
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptoPay.getUrl()}/api/invoices/wrongParams/refunds`,
      });
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error).toEqual(errorToTest);
    }
  });

  it('Create recalculate invoices has response', async () => {
    try {
      mockedAxios.request.mockResolvedValue(recalculation);
      const resp = await cryptoPay.invoicesApi().invoicesCreateRecalculation(invoiceID, true);
      expect(resp).toBeTruthy();
      expect(resp).toEqual(recalculation);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {
          'Content-Type': 'application/json',
        },
        data: 'true',
        method: 'POST',
        url: `${cryptoPay.getUrl()}/api/invoices/${invoiceID}/recalculations`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it('Create refund invoices has response', async () => {
    try {
      mockedAxios.request.mockResolvedValue(recalculation);
      const resp = await cryptoPay.invoicesApi().invoicesCreateRefund(invoiceID, address);
      expect(resp).toBeTruthy();
      expect(resp).toEqual(recalculation);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {
          'Content-Type': 'application/json',
        },
        data: address,
        method: 'POST',
        url: `${cryptoPay.getUrl()}/api/invoices/${invoiceID}/refunds`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
  it('Commit recalculate invoices has response', async () => {
    try {
      mockedAxios.request.mockResolvedValue(recalculation);
      const resp = await cryptoPay.invoicesApi().invoicesCommitRecalculation(invoiceID, recalculationID);
      expect(resp).toBeTruthy();
      expect(resp).toEqual(recalculation);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'POST',
        url: `${cryptoPay.getUrl()}/api/invoices/${invoiceID}/recalculations/${recalculationID}/commit`,
      });
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
});
