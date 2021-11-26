# Crypto Pay
The official NODE library for Cryptopay API.

## Table of Contents
- [Versions](#versions)
- [Documentation](#documentation)
- [Installation](#installation)
- [Create instanse of crypto pay class](#create-instanse-of-crypto-pay-class)
- [Usage Examples](#usage-examples)
  - [Get rates](#get-rates)
  - [Get rates by pair](#get-rates-by-pair)
  - [Create invoice](#create-invoice)
  - [Callback Verification](#callback-verification)
  - [Other methods](#other-methods)
- [Error interface](#error-interface)
- [Testing](#testing)
### VERSIONS 
- node v14 or higher
- npm v8 or higher
### Documentation 
For more details visit [CryptopayAPI](https://developers.cryptopay.me)

To start using this library, register an account on
    [Cryptopay Sandbox](https://business-sandbox.cryptopay.me/)
    [Guide](https://developers.cryptopay.me/guides/creating-a-test-account)
or
    [Cryptopay Live](https://business.cryptopay.me/)

You should have the following 3 parameters:
~~~~
ApiKey, ApiSecret, CallbackApiSecret
~~~~
## Installation

Use this command install node modules:

```bash
$ npm install
```

Use this command for starting a project in development phase:

```bash
$ npm start
```

Use this command to generate code from openapi.yml which should be stored in the project root:

```bash
$ npm run openApiGenerate
```

## Create instanse of crypto pay class


```js
const callback_secret = "sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTp";
const api_key = "7AA2P-w0RxZXG-_K4cRngp";
const api_secret = "NGR0vvNXKO_p3v2zz5ZuShP36Vp19ekZ9nLORtVZYpp";

const cryptoPay = new CryptoPay(api_secret, api_key, callback_secret);
// set custom url if you need. default https://business-sandbox.cryptopay.me
cryptoPay.setUrl('https://customUrl.com/') 
```

## Usage Examples

### Get rates

This endpoint allows you to retrieve all public rates.

##### Method call

```ts
const resp = await cryptoPay.ratesApi().ratesAll();
```

##### Response

```ts
{
"BTC/EUR": {
      "buy_rate": "39000.1",
      "sell_rate": "38000.1"
  }
}
```

### Get rates by pair

This endpoint allows you to retrieve a public rate by currency pair.

##### Method call

```ts
const resp = await cryptoPay.ratesApi().ratesRetrieve("BTC/EUR");
```

##### Response

```ts
{
      "buy_rate": "39000.1",
      "sell_rate": "38000.1"
}
```

### Create invoice

This endpoint allows you to create invoices.

##### Method call

```ts
const resp = await cryptoPay.invoicesApi().invoicesCreate(invoice);
```

#### Invoice interface

```ts
export interface IInvoiceParams {
  price_amount: string;
  price_currency: string;
  pay_currency: string;
  custom_id?: string;
  customer_id?: string;
  name?: string;
  description?: string;
  metadata?: object;
  success_redirect_url?: string;
  unsuccess_redirect_url?: string;
}
```

##### Invoice object

```ts
const invoice = {
  price_amount: "100.0",
  price_currency: "EUR",
  pay_currency: "BTC",
  custom_id: "PAYMENT-123",
  customer_id: "CUSTOMER-123",
  name: "name",
  description: "description",
  metadata: { description: "description" }, // Custom key-valued data
  success_redirect_url: "https://www.google.com",
  unsuccess_redirect_url: "https://www.google.com",
};
```

##### Response interface

```ts
{
  interface IInvoiceResult {
    id: string;
    custom_id: string | null;
    customer_id: string | null;
    status: invoiceStatusEnum;
    status_context: invoiceStatusContextEnum | null;
    address: string;
    uri: string;
    price_amount: string;
    price_currency: string;
    fee: string;
    fee_currency: string;
    pay_amount: string;
    pay_currency: string;
    paid_amount: string;
    exchange?: IExchange;
    transactions: IInvoiceTransaction;
    name: string | null;
    description: string | null;
    metadata: { description?: string } | null;
    success_redirect_url: string | null;
    unsuccess_redirect_url: string | null;
    hosted_page_url: string;
    created_at: string;
    expires_at: string;
  }

  enum invoiceStatusEnum {
    "new",
    "completed",
    "unresolved",
    "refunded",
    "cancelled",
  }

  enum invoiceStatusContextEnum {
    "overpaid",
    "underpaid",
    "paid_late",
    "illicit_resource",
  }
}
```

##### Response

```ts
{
    "id": "124f005d-af2f-4259-bcc3-75ddba502d84",
    "custom_id": "PAYMENT-123",
    "customer_id": "CUSTOMER-123",
    "status": "new",
    "status_context": null,
    "address": "2Mw43DEwwxK2PHPFb3dh5jd22kE78ryppLP",
    "uri": "bitcoin:2Mw43DEwwxK2PHPFb3dh5jd22kE78ryppLP?amount=0.002519",
    "price_amount": "100.0",
    "price_currency": "EUR",
    "fee": "1.0",
    "fee_currency": "EUR",
    "pay_amount": "0.002519",
    "pay_currency": "BTC",
    "paid_amount": "0.0",
    "exchange": {
      "pair": "BTCEUR",
      "rate": "39711.9618",
      "fee": "0.0",
      "fee_currency": "EUR"
    },
    "transactions": [
      {
        "txid": "2430d3e686a182bed93023a4eca21ede39b40f9b6f3193ed6019c962dd88ce30",
        "risk": {
          "score": 0,
          "level": "low",
          "resource_name": "Bitstamp",
          "resource_category": "Exchange"
        }
      }
    ],
    "name": "string",
    "description": "string",
    "metadata": {},
    "success_redirect_url": "string",
    "unsuccess_redirect_url": "string",
    "hosted_page_url": "string",
    "created_at": "2021-11-11T14:53:47.378Z",
    "expires_at": "2021-11-11T14:53:47.378Z"
  }
```
### Callback Verification
```ts
    // body must be json, headers are all your headers in response
    //if the callback is valid method returns true 
    cryptoPay.callbackVerification(body, headers) 
```
### Other methods
```ts
    //This endpoint allows you to retrieve a list of all invoices.
    await cryptoPay.invoicesApi().invoicesList();

    //This endpoint allows you to retrieve the invoice details by invoice id
    await cryptoPay.invoicesApi().invoicesRetrieve('invoice_id'); 

    // This endpoint allows you to retrieve invoice details by its custom_id.
    await cryptoPay.invoicesApi().invoicesRetrieveByCustomId('custom_id');

    //This endpoint allows you to recalculate invoices.
    await cryptoPay.invoicesApi().invoicesCreateRecalculation('invoice_id', true) 

    // This endpoint allows you to commit invoice recalculation.
    await cryptoPay.invoicesApi().invoicesCommitRecalculation('invoice_id','recalculation_id') 

    //This endpoint allows you to create invoice refunds.
    await cryptoPay.invoicesApi().invoicesCreateRefund('invoice_id') 

    //This endpoint allows you to retrieve a list of a particular invoice refunds.
    await cryptoPay.invoicesApi().invoicesListRefunds('invoice_id')

```

## Error interface
```ts
export interface ICustomError {
    method:string,
    httpStatus:number,
    responseBody:object,
}
```

## Testing

Use this command for testing this project:

```bash
$ npm test
```