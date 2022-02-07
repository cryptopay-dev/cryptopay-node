# Cryptopay Node Library

Cryptopay-node - The official NodeJS library for the Cryptopay API

Cryptopay is a payment gateway and business wallet that allows merchants to automate the processes of accepting cryptocurrency payments and payouts from their customers, as well as making currency exchange transactions and receiving data on the transaction history and account balance statuses for reporting.

For more information, please visit [Cryptopay API docs](https://developers.cryptopay.me).

## Table of contents

* [Installation](#installation)
* [Configuration](#configuration)
* [Usage](#usage)
  * [Invoices](#invoices)
  * [Rates](#rates)
* [Callbacks](#callbacks)
* [Contributing](#contributing)

## Installation

Use this command install node modules:

```bash
npm install cryptopay-node
```

## Configuration

### Create API credentials

Learn mode about API credentials at [Developers guide](https://developers.cryptopay.me/guides/api-credentials)

### Configure library

```ts
import Cryptopay, { SERVER } from 'cryptopay-node';
// Server is an optional parameter which is imported from constants.ts and switches between sandbox and production.
const cryptopay = new Cryptopay(api_secret, api_key, callback_secret, server, SERVER.sandbox);
```

## Usage

### Invoices

An invoice is a request for a cryptocurrency payment which contains a unique BTC, LTC, ETH or XRP address and the amount that has to be paid while the invoice is valid.

[Invoices API docs](https://developers.cryptopay.me/reference/invoices)

### Create invoice

This endpoint allows you to create invoices.

#### Method call

```ts
const resp = await cryptopay.invoices().create(invoice);
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

### Other methods

```ts
    //This endpoint allows you to retrieve a list of all invoices.
    await cryptopay.invoices().list();

    //This endpoint allows you to retrieve the invoice details by invoice id
    await cryptopay.invoices().retrieve('invoice_id'); 

    // This endpoint allows you to retrieve invoice details by its custom_id.
    await cryptopay.invoices().retrieveByCustomId('custom_id');

    //This endpoint allows you to recalculate invoices.
    await cryptopay.invoices().createRecalculation('invoice_id', true) 

    // This endpoint allows you to commit invoice recalculation.
    await cryptopay.invoices().commitRecalculation('invoice_id','recalculation_id') 

    //This endpoint allows you to create invoice refunds.
    await cryptopay.invoices().createRefund('invoice_id') 

    //This endpoint allows you to retrieve a list of a particular invoice refunds.
    await cryptopay.invoices().listRefunds('invoice_id')

```

### Rates

[Public rates API docs](https://developers.cryptopay.me/reference/public-rates)

#### Retrieve all rates

```ts
const resp = await cryptopay.rates().all();
```

#### Retrieve a pair rate

```ts
const resp = await cryptopay.rates().retrieve("BTC/EUR");
```

## Callbacks

[Documentation](https://developers.cryptopay.me/guides/api-basics/callbacks)

Every callback request contains a `X-Cryptopay-Signature` header which is needed to verify webhook body

```ts
    // body must be json, headers are all your headers in response
    //if the callback is valid method returns true 
    cryptopay.verifyCallback(body, headers) 
```

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/cryptopay-dev/cryptopay-node>.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
