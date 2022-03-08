require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("./tasks/mint-erc20");
require("./tasks/wsx-utils.js");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.7.6",

  networks: {
    toronto: {
      url: "https://rpc.toronto.sx.technology",
      accounts: [`0x${process.env.PK_TEST}`],
    },
    main: {
      url: "https://rpc.sx.technology",
      accounts: [`0x${process.env.PK_MAIN}`],
    },
  },
  paths: {
    tests: "./contracts/test",
  },
};
