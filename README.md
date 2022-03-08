# token-contracts

## Installation

1. `npm install`

## Compiling

1. Run `npx hardhat compile`

## Deploying

1. set the main account owner private key in `.env` file (this is used by hardhat.config.js) to deploy token contracts:

```
PK_TEST=2342342325383458348582834283482348aaaaaa
```

2. Set you rpc url in `hardhat.config.js` for whichever network you’re deploying to

e.g:

```
toronto: {
      url: "http://rpc.toronto.sx.technology",
      accounts: [`0x${process.env.PK_TEST}`],
    }
```

3. Deploy token contracts by running the following commands:

```
npx hardhat run deploy/WSX.js --network toronto
npx hardhat run deploy/WMATIC.js --network toronto
npx hardhat run deploy/WETH.js --network toronto
npx hardhat run deploy/USDC.js --network toronto

```

4. Each of this command will output:

```
Deploying contracts with the account: <address-of-owner-associated-with-private-key-env-var>

Account balance: <account-balance-of-owner>

Contract deployed at: <address-where-contract-is-deployed>
```

5. Note down each of these contract address
