
import { Config } from './config.example';
import { KaiascanSDK } from './src/kaiascan';

const sdk = new KaiascanSDK();

sdk.getFungibleToken(Config.address)
    .then(response => console.log("Token Info:", response))
    .catch(error => console.error("Error:", error));

sdk.getLatestBlock()
    .then(response => console.log("Latest Block:", response))
    .catch(error => console.error("Error:", error));
