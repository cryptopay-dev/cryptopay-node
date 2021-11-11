# Crypto Pay

## Table of Contents

- [Installation](#installation)
- [Create instanse of crypto pay class](#create-instanse-of-crypto-pay-class)
- [Usage Examples](#usage-examples)
  - [Get rates](#get-rates)
  - [Get rates by pair](#get-rates-by-pair)
## Installation

Use this command install node modules:

```bash
$ npm install
```

Use this command for starting a project in development phase:

```bash
$ npm start
```

Use this command for testing this project:

```bash
$ npm start
```

## Create instanse of crypto pay class

To create an instance, you need:

- api key
- api secret
- callback secret

```js
const callback_secret = "sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTp";
const api_key = "7AA2P-w0RxZXG-_K4cRngp";
const api_secret = "NGR0vvNXKO_p3v2zz5ZuShP36Vp19ekZ9nLORtVZYpp";

const cryptoPay = new CryptoPay(api_secret, api_key, callback_secret);
```

## Usage Examples

### Get rates 
This endpoint allows you to retrieve all public rates.
##### Method call

```js
const resp = await cryptoPay.getRetes();
```

##### Response 

```js
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

```js
const resp = await cryptoPay.getRetesByPair("XRP/ZAR");;
```

##### Response 

```js
{
      "buy_rate": "39000.1",
      "sell_rate": "38000.1"
}
```