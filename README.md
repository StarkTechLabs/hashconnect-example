# hashconnect-example
Example React app of connecting to a HashPack wallet via Hashconnect.

## Running/Building
- Clone the repository
- Make sure you have Node.js 14 or higher
- Run `npm ci` to install project dependencies
- Run `npm start` to build and run a webpack server to host files on port 3000 (that is the default port, you can change by setting env var PORT)
- Open `http://localhost:3000` in your Chrome browser

### Caveats
- To connect to the HashPack Chrome extension, you have to have SSL support in order to view running extensions. You can do this a number of ways but using something like [http-server](https://www.npmjs.com/package/http-server) or [ngrok](https://ngrok.com/) is common.

#### http-sever with SSL
Create a cert via openssl
```
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```
Start http-server via
```
http-server -S -C cert.pem -o
```

### rewp
This React app is build using [rewp](https://github.com/mstark5652/rewp) which is just a tool wrapper around webpack and babel.

## HashPack
HashPack is a crypto wallet for HBAR and the Hedera network.

Check out more information on their [website](https://www.hashpack.app/).

## Hashconnect
Hashconnect is a library to connect Hedera apps to wallets, similar to web3 functionality found in the Ethereum ecosystem.

Check out their [github repo](https://github.com/Hashpack/hashconnect) to learn more.

## License
See LICENSE.md
