# token-contracts

## Installation
1. `npm install`

## Compiling
1. Run `npx hardhat compile`

## Deploying
1. Ensure private key exists in `.env` file in format `PK=2342342325383458348582834283482348aaaaaa`.
2. Ensure network is added to `hardhat.config.js`
3. Run `npx hardhat run scripts/deploy.js --network toronto` to deploy to RPC url specified under `toronto`