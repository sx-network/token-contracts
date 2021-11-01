require('@nomiclabs/hardhat-waffle')
require('dotenv').config()
require('./tasks/mint-erc20')
require('./tasks/wsx-utils.js')

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: '0.6.6',

  networks: {
    toronto: {
      url: 'http://3.215.13.226:10002',
      accounts: [`0x${process.env.PK_TEST}`],
    },
    main: {
      url: 'http://3.97.59.226:10002',
      accounts: [`0x${process.env.PK_MAIN}`],
    },
  },
  paths: {
    tests: './contracts/test',
  },
}
