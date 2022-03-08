const { task } = require("hardhat/config");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

// e.g. npx hardhat wsx:mint --to 0x2079A994E9BBc88496Df03A59A0CFA2C9E2af473 --amount 1000000 --network toronto
task("wsx:mint", "Mints WSX token")
  .addParam("to", "to address")
  .addParam("amount", "Amount")
  .setAction(async function ({ to, amount }) {
    const wsx = await ethers.getContractFactory("WSX");
    const token = wsx.attach("0xEafbBF62dFfBA085b717E215d82223FE2f212268");
    const [deployer] = await ethers.getSigners();
    const amountWei = ethers.utils.parseUnits(amount);
    const connected = await token.connect(deployer);
    await connected.mint(to, amountWei);
  });

// e.g. npx hardhat wmatic:mint --to 0x2079A994E9BBc88496Df03A59A0CFA2C9E2af473 --amount 1000000 --network toronto
task("wmatic:mint", "Mints WMATIC token")
  .addParam("to", "to address")
  .addParam("amount", "Amount")
  .setAction(async function ({ to, amount }) {
    const wmatic = await ethers.getContractFactory("WMATIC");
    const token = wmatic.attach("0xc45Db734E5aeFA5504E9D78350FC5cBc0A9F8cdA");
    const [deployer] = await ethers.getSigners();
    const amountWei = ethers.utils.parseUnits(amount);
    const connected = await token.connect(deployer);
    await connected.mint(to, amountWei);
  });

// e.g. npx hardhat weth:mint --to 0x2079A994E9BBc88496Df03A59A0CFA2C9E2af473 --amount 1000000 --network toronto
task("weth:mint", "Mints WETH token")
  .addParam("to", "to address")
  .addParam("amount", "Amount")
  .setAction(async function ({ to, amount }) {
    const weth = await ethers.getContractFactory("ERC20PresetMinterPauser");
    const token = weth.attach("0x1391232F92Ed4158E85a8a5Eb2e88C360e2956CE");
    const [deployer] = await ethers.getSigners();
    const amountWei = ethers.utils.parseUnits(amount);
    const connected = await token.connect(deployer);
    await connected.mint(to, amountWei);
  });

// e.g. npx hardhat dai:mint --to 0x2079A994E9BBc88496Df03A59A0CFA2C9E2af473 --amount 1000000 --network toronto
task("dai:mint", "Mints DAI token")
  .addParam("to", "to address")
  .addParam("amount", "Amount")
  .setAction(async function ({ to, amount }) {
    const dai = await ethers.getContractFactory("DAI");
    const token = dai.attach("0xB926a10929957e1f5673C4929a3ec13ec5E7f845");
    const [deployer] = await ethers.getSigners();
    const amountWei = ethers.utils.parseUnits(amount);
    const connected = await token.connect(deployer);
    await connected.mint(to, amountWei);
  });

// e.g. npx hardhat usdc:mint --to 0x2079A994E9BBc88496Df03A59A0CFA2C9E2af473 --amount 1000000 --network toronto
task("usdc:mint", "Mints USDC token")
  .addParam("to", "to address")
  .addParam("amount", "Amount")
  .setAction(async function ({ to, amount }) {
    const usdc = await ethers.getContractFactory("USDC");
    const token = usdc.attach("0x617Bf56B8c37e8043A4dBB34eEf52e2D412ba844");
    const [deployer] = await ethers.getSigners();
    const amountWei = ethers.utils.parseUnits(amount);
    const connected = await token.connect(deployer);
    await connected.mint(to, amountWei);
  });
