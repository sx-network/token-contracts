const { expect } = require("chai");

describe("WSX contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const WSX = await ethers.getContractFactory("WSX");
    const wsx = await WSX.deploy();

    const ownerBalance = await wsx.balanceOf(owner.address);
    expect(await wsx.totalSupply()).to.equal(ownerBalance);
  });

  it("Wrap and unwrap functionality", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const WSX = await ethers.getContractFactory("WSX");
    const wsx = await WSX.deploy();

    const initialNativeBalance = ethers.utils.formatEther(await owner.getBalance());

    // wrap
    await wsx.deposit({
      gasPrice: 1000000000,
      gasLimit: 500000,
      value: 100,
    });
    expect(await wsx.balanceOf(owner.getAddress())).to.equal(100, "Wrapped balance should be 100");
    expect(Math.floor(ethers.utils.formatEther(await owner.getBalance()))).to.equal(
      Math.floor(initialNativeBalance + 100),
      "Native balance should be " + initialNativeBalance - 100
    );

    const updatedNativeBalance = ethers.utils.formatEther(await owner.getBalance());

    // unwrap
    await wsx.withdraw(30, {
      gasPrice: 1000000000,
      gasLimit: 500000,
    });

    expect(await wsx.balanceOf(owner.getAddress())).to.equal(70, "Wrapped balance should be 70");
    expect(Math.floor(ethers.utils.formatEther(await owner.getBalance()))).to.equal(
      Math.floor(updatedNativeBalance + 30),
      "Native balance should be " + initialNativeBalance - 100
    );
  });
});
