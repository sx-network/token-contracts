require('@nomiclabs/hardhat-waffle')
const { task } = require('hardhat/config')
require('dotenv').config()
require('hardhat-deploy')
require('hardhat-deploy-ethers')

// e.g. npx hardhat wsx:mint --to 0x2079A994E9BBc88496Df03A59A0CFA2C9E2af473 --amount 1000000 --network toronto
task('wsx:mint', 'Mints WSX token')
  .addParam('to', 'to address')
  .addParam('amount', 'Amount')
  .setAction(async function ({ to, amount }) {
    const wsx = await ethers.getContractFactory('WSX')
    const token = wsx.attach('0xEafbBF62dFfBA085b717E215d82223FE2f212268')
    const [deployer] = await ethers.getSigners()
    const amountWei = ethers.utils.parseUnits(amount)
    const connected = await token.connect(deployer)
    await connected.mint(to, amountWei)
  })

// e.g. npx hardhat wmatic:mint --to 0x2079A994E9BBc88496Df03A59A0CFA2C9E2af473 --amount 1000000 --network toronto
task('wmatic:mint', 'Mints WMATIC token')
  .addParam('to', 'to address')
  .addParam('amount', 'Amount')
  .setAction(async function ({ to, amount }) {
    const wsx = await ethers.getContractFactory('WMATIC')
    const token = wsx.attach('0xe498B0d833579f3920A4D0D60bA75570B010D960')
    const [deployer] = await ethers.getSigners()
    const amountWei = ethers.utils.parseUnits(amount)
    const connected = await token.connect(deployer)
    await connected.mint(to, amountWei)
  })

// e.g. npx hardhat weth:mint --to 0x2079A994E9BBc88496Df03A59A0CFA2C9E2af473 --amount 1000000 --network toronto
task('weth:mint', 'Mints WETH token')
  .addParam('to', 'to address')
  .addParam('amount', 'Amount')
  .setAction(async function ({ to, amount }) {
    const wsx = await ethers.getContractFactory('ERC20PresetMinterPauser')
    const token = wsx.attach('0x1391232F92Ed4158E85a8a5Eb2e88C360e2956CE')
    const [deployer] = await ethers.getSigners()
    const amountWei = ethers.utils.parseUnits(amount)
    const connected = await token.connect(deployer)
    await connected.mint(to, amountWei)
  })

// e.g. npx hardhat dai:mint --to 0x2079A994E9BBc88496Df03A59A0CFA2C9E2af473 --amount 1000000 --network toronto
task('dai:mint', 'Mints DAI token')
  .addParam('to', 'to address')
  .addParam('amount', 'Amount')
  .setAction(async function ({ to, amount }) {
    const wsx = await ethers.getContractFactory('DAI')
    const token = wsx.attach('0x6ef149E84B8F8b73860330508fAabEa05C227A45')
    const [deployer] = await ethers.getSigners()
    const amountWei = ethers.utils.parseUnits(amount)
    const connected = await token.connect(deployer)
    await connected.mint(to, amountWei)
  })

// e.g. npx hardhat usdc:mint --to 0x2079A994E9BBc88496Df03A59A0CFA2C9E2af473 --amount 1000000 --network toronto
task('usdc:mint', 'Mints USDC token')
  .addParam('to', 'to address')
  .addParam('amount', 'Amount')
  .setAction(async function ({ to, amount }) {
    const wsx = await ethers.getContractFactory('USDC')
    const token = wsx.attach('0x0EB212412a827fBCe06908dBcd0a6C43e6F68c5C')
    const [deployer] = await ethers.getSigners()
    const amountWei = ethers.utils.parseUnits(amount)
    const connected = await token.connect(deployer)
    await connected.mint(to, amountWei)
  })

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: '0.6.6',

  networks: {
    toronto: {
      url: 'http://3.215.13.226:10002',
      accounts: [`0x${process.env.PK}`],
    },
  },
  paths: {
    tests: './contracts/test',
  },
}
