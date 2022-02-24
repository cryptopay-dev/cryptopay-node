# Cryptopay Node Library

Cryptopay-node - The official NodeJS library for the Cryptopay API

Cryptopay is a payment gateway and business wallet that allows merchants to automate the processes of accepting cryptocurrency payments and payouts from their customers, as well as making currency exchange transactions and receiving data on the transaction history and account balance statuses for reporting.

For more information, please visit [Cryptopay API docs](https://developers.cryptopay.me).

## Table of contents

* [Installation](#installation)
* [Configuration](#configuration)
* [Usage](#usage)
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

```js
const { Cryptopay, SERVER } = require('cryptopay-node');
// Server is an optional parameter which is imported from constants.ts and switches between sandbox and production.
const api = new Cryptopay(api_secret, api_key, callback_secret, server, SERVER.sandbox);
```

## Usage

See [Documentation](https://cryptopay-dev.github.io/cryptopay-node/classes/index.Cryptopay.html)

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/cryptopay-dev/cryptopay-node>.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
