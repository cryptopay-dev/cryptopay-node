# Crypto Pay

## Table of Contents

- [Installing](#installing)
- [Create instanse of crypto pay class](#create-instanse-of-crypto-pay-class)
- [Examples](#examples)
  - [Get rates](#get-rates)
  - [Get rates by pair](#get-rates-by-pair)
## Installing

First of all you need to install all the dependency by typing this command

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

## Examples

### Get rates 

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