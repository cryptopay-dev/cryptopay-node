import axios from 'axios';
import dotenv from 'dotenv';
import { Cryptopay } from '..';
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

let cryptopay: Cryptopay;

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  cryptopay = new Cryptopay(apiSecret, apiKey, callbackSecret);
});

describe('Rates', () => {
  it('Get Rates validation response', async () => {
    mockedAxios.request.mockResolvedValue(list);
    const resp = await cryptopay.rates.all();
    expect(resp).toBeTruthy();
    expect(resp).toEqual(list);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      headers: {},
      method: 'GET',
      url: `${cryptopay.url}/api/rates`,
    });
  });

  it('Get Rate  By Pair validation response', async () => {
    mockedAxios.request.mockResolvedValue(ratesPair);
    const resp = await cryptopay.rates.retrieve('BTC', 'EUR');
    expect(resp).toEqual(ratesPair);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      headers: {},
      method: 'GET',
      url: `${cryptopay.url}/api/rates`,
    });
  });

  it('Get Rates By Pair with wrong params', async () => {
    try {
      mockedAxios.request.mockRejectedValue(errorToTest);
      await cryptopay.rates.retrieve('wrong', 'Params');
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptopay.url}/api/rates`,
      });
    } catch (error) {
      expect(error).toBeTruthy();
      expect(error).toEqual(errorToTest);
    }
  });
});

describe('Invoice', () => {
  it('Create invoice validation response', async () => {
    mockedAxios.request.mockResolvedValue(invoiceCreated);
    const resp = await cryptopay.invoices.create(invoiceParamsToTest);
    expect(resp).toEqual(invoiceCreated);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      data: JSON.stringify(invoiceParamsToTest),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      url: `${cryptopay.url}/api/invoices`,
    });
  });

  it('Get list invoice has response ', async () => {
    mockedAxios.request.mockResolvedValue(invoiceList);
    const resp = await cryptopay.invoices.list();
    expect(resp).toEqual(invoiceList);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      headers: {},
      method: 'GET',
      url: `${cryptopay.url}/api/invoices`,
    });
  });

  it('Get invoice by invoice id validate response ', async () => {
    mockedAxios.request.mockResolvedValue(invoiceCreated);
    const resp = await cryptopay.invoices.retrieve(invoiceID);
    expect(resp).toEqual(invoiceCreated);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      headers: {},
      method: 'GET',
      url: `${cryptopay.url}/api/invoices/${invoiceID}`,
    });
  });

  it('Get invoice by invoice id with wrong param ', async () => {
    try {
      mockedAxios.request.mockRejectedValue(errorToTest);
      await cryptopay.invoices.list('wrongParams');
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptopay.url}/api/invoices/wrongParams`,
      });
    } catch (error) {
      expect(error).toEqual(errorToTest);
    }
  });

  it('Get list invoce by custom id validate response ', async () => {
    mockedAxios.request.mockResolvedValue(invoiceCreated);
    const resp = await cryptopay.invoices.retrieveByCustomId(customID);
    expect(resp).toBeTruthy();
    expect(resp).toEqual(invoiceCreated);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      headers: {},
      method: 'GET',
      url: `${cryptopay.url}/api/invoices/custom_id/${customID}`,
    });
  });

  it('Get list invoce by custom id  with wrong param ', async () => {
    try {
      mockedAxios.request.mockRejectedValue(errorToTest);
      await cryptopay.invoices.retrieveByCustomId('wrongParams');
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptopay.url}/api/invoices/custom_id/wrongParams`,
      });
    } catch (error) {
      expect(error).toEqual(errorToTest);
    }
  });

  it('Get list refund list has response', async () => {
    mockedAxios.request.mockResolvedValue(invoiceList);
    const resp = await cryptopay.invoices.listRefunds(invoiceID);
    expect(resp).toBeTruthy();
    expect(resp).toEqual(invoiceList);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      headers: {},
      method: 'GET',
      url: `${cryptopay.url}/api/invoices/${invoiceID}/refunds`,
    });
  });

  it('Get list refund list with wrong param ', async () => {
    try {
      mockedAxios.request.mockRejectedValue(errorToTest);
      await cryptopay.invoices.listRefunds('wrongParams');
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {},
        method: 'GET',
        url: `${cryptopay.url}/api/invoices/wrongParams/refunds`,
      });
    } catch (error) {
      expect(error).toEqual(errorToTest);
    }
  });

  it('Create recalculate invoices has response', async () => {
    mockedAxios.request.mockResolvedValue(recalculation);
    const resp = await cryptopay.invoices.createRecalculation(invoiceID, { force_commit: true });
    expect(resp).toBeTruthy();
    expect(resp).toEqual(recalculation);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      headers: {
        'Content-Type': 'application/json',
      },
      data: '{"force_commit":true}',
      method: 'POST',
      url: `${cryptopay.url}/api/invoices/${invoiceID}/recalculations`,
    });
  });

  it('Create refund invoices has response', async () => {
      mockedAxios.request.mockResolvedValue(recalculation);
      const resp = await cryptopay.invoices.createRefund(invoiceID, { address });
      expect(resp).toBeTruthy();
      expect(resp).toEqual(recalculation);
      expect(mockedAxios.request).toHaveBeenCalledWith({
        headers: {
          'Content-Type': 'application/json',
        },
        data: '{"address":"address"}',
        method: 'POST',
        url: `${cryptopay.url}/api/invoices/${invoiceID}/refunds`,
      });
  });

  it('Commit recalculate invoices has response', async () => {
    mockedAxios.request.mockResolvedValue(recalculation);
    const resp = await cryptopay.invoices.commitRecalculation(invoiceID, recalculationID);
    expect(resp).toBeTruthy();
    expect(resp).toEqual(recalculation);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      headers: {},
      method: 'POST',
      url: `${cryptopay.url}/api/invoices/${invoiceID}/recalculations/${recalculationID}/commit`,
    });
  });
});

describe('Validation callback', () => {
  const secret = 'hzeRDX54BYleXGwGm2YEWR4Ony1_ZU2lSTpAuxhW1gQ';
  const body =
    '{"type":"Invoice","event":"status_changed","data":{"id":"ff48eeba-ab18-4088-96bc-4be10a82b994","status":"completed","status_context":null,"address":"rs9pE6CnNLE8YiTgTwbAk1AkFyS3opsm7K?dt=701","price_amount":"1.0","price_currency":"EUR","pay_amount":"3.113326","pay_currency":"XRP","paid_amount":"3.113326","exchange":{"pair":"XRPEUR","rate":"0.3212"},"transactions":[{"txid":"3EA591FED2F1F61263CB66AAC6BCF520B0714A08F2481D56DE267F31E0C782B9","risk":null}],"name":null,"description":null,"metadata":null,"custom_id":null,"success_redirect_url":null,"created_at":"2019-04-09T15:22:09+00:00","expires_at":"2019-04-09T15:32:09+00:00"}}';
  const signature = '7c021857107203da4af1d24007bb0f752e2f04478e5e5bff83719101f2349b54';
  const cryptopay = new Cryptopay(apiSecret, apiKey, secret);

  it('Valid callback', () => {
    const correct = cryptopay.verifyCallback(body, { 'x-cryptopay-signature': signature });
    expect(correct).toBeTruthy();
  });

  it('Without headers', () => {
    try {
      cryptopay.verifyCallback(body, {});
    } catch ({ message }) {
      expect(message).toEqual('Header x-cryptopay-signature is missing or empty');
    }
  });

  it('With wrong headers', () => {
    try {
      cryptopay.verifyCallback(body, { wrong: 'wrong' });
    } catch ({ message }) {
      expect(message).toEqual('Header x-cryptopay-signature is missing or empty');
    }
  });

  it('With wrong body', () => {
    const wrongBody = '{"wrong":"wrong"}';
    const correct = cryptopay.verifyCallback(wrongBody, { 'x-cryptopay-signature': signature });
    expect(correct).toBeFalsy();
  });

  it('Without body', () => {
    try {
      cryptopay.verifyCallback('', { 'x-cryptopay-signature': signature });
    } catch ({ message }) {
      expect(message).toEqual('Body is empty');
    }
  });

  it('Not valid json', () => {
    try {
      cryptopay.verifyCallback('{', { 'x-cryptopay-signature': signature });
    } catch ({ message }) {
      expect(message).toMatch(new RegExp('^Invalid JSON in body. Error message:?'));
    }
  });
});
