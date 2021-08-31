require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.6.6",

  networks: {
    toronto: {
      url: "https://rpc.toronto.sx.technology/",
      accounts: [`0x${process.env.PK}`]
    }
  }
};
