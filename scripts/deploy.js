// e.g. `npx hardhat run scripts/deploy.js --network toronto`
async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const WSX = await ethers.getContractFactory("WSX");
  const contract = await WSX.deploy();

  console.log("Contract deployed at:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });