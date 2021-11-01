const { task } = require('hardhat/config')
require('hardhat-deploy')
require('hardhat-deploy-ethers')

// e.g. npx hardhat wsx:wrap --amount 100000 --network main
task('wsx:wrap', 'Wraps SX token to WSX')
  .addParam('amount', 'Amount')
  .setAction(async function ({ amount }) {
    const wsx = await ethers.getContractFactory('WSX')
    const token = wsx.attach('0x28FE1F46C9C0EeF1Cdf44c9c504C43E791432089')
    const [deployer] = await ethers.getSigners()
    const connected = await token.connect(deployer)
    const overrides = {
      value: ethers.utils.parseUnits(amount),
    }
    await connected.deposit(overrides)
  })

// e.g. npx hardhat wsx:adminWithdraw --amount 100000 --network main
task('wsx:adminWithdraw', 'Withdraws native SX from WSX contract')
  .addParam('amount', 'Amount')
  .setAction(async function ({ amount }) {
    const wsx = await ethers.getContractFactory('WSX')
    const token = wsx.attach('0x28FE1F46C9C0EeF1Cdf44c9c504C43E791432089')
    const [deployer] = await ethers.getSigners()
    const connected = await token.connect(deployer)
    await connected.adminWithdraw(ethers.utils.parseUnits(amount))
  })
