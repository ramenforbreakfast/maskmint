import { expect } from "chai";
import { run, ethers } from "hardhat";

let owner, addr1, addr2, addr3, addr4;
let mask, nct, maskMint, tokenZero, tokenTwo;
let tokenZeroAddr, tokenTwoAddr;
let mintContract, tokenContract;

describe("Testing Mask Mint & Mask Token Contracts", function () {
  it("Deploy Mock HashMask and NCT Contract", async function () {
    let i;
    let userAddresses = await ethers.getSigners();
    [owner, addr1, addr2, addr3, addr4] = userAddresses;
    console.log("Showing First 5 Addresses...")
    for (i = 0; i < 5; i++) {
      console.log("Address: ", userAddresses[i].address);
      console.log("Balance: ", (await userAddresses[i].getBalance()).toString());
    }

    const nctContract = await ethers.getContractFactory("NameChangeToken");
    nct = await nctContract.deploy("NameChangeToken", "NCT", 1611846000);
    await nct.deployed();
    console.log("NCT Contract Deployed At: ", nct.address);

    const maskContract = await ethers.getContractFactory("Masks");
    mask = await maskContract.deploy("Hashmasks", "HM", nct.address);
    await mask.deployed();
    console.log("HashMask Contract Deployed At: ", mask.address);

    await nct.connect(owner).setMasksAddress(mask.address);
  });

  it("Acquire Hashmasks For Test Accounts", async function () {
    await mask.connect(addr1).mintNFT(2, { value: ethers.utils.parseEther("0.2") });
    await mask.connect(addr2).mintNFT(2, { value: ethers.utils.parseEther("0.2") });
    console.log("Number of Masks: ", await mask.balanceOf(addr1.address));
    console.log("Number of Masks: ", await mask.balanceOf(addr2.address));
  });

  it("Claim NCT For Test Accounts", async function () {
    await nct.connect(addr1).claim([0, 1]);
    await nct.connect(addr2).claim([2, 3]);
    let nctBal;
    nctBal = await nct.balanceOf(addr1.address);
    console.log("NCT Balance of Account 1: ", nctBal.toString());
    nctBal = await nct.balanceOf(addr2.address);
    console.log("NCT Balance of Account 2: ", nctBal.toString());
  });

  it("Deploy Mask Mint Contract", async function () {

    mintContract = await ethers.getContractFactory("MaskMint");
    maskMint = await mintContract.deploy(nct.address, mask.address);
    await maskMint.deployed();
    console.log("Mask Mint: ", maskMint.address);

    await maskMint.deployToken("MaskTokenZero", "ZERO", 0);
    tokenZeroAddr = await maskMint.getTokenContract(0);
    console.log("Mask Token Zero Deployed At: ", tokenZeroAddr);

    await maskMint.deployToken("MaskTokenTwo", "TWO", 2);
    tokenTwoAddr = await maskMint.getTokenContract(2);
    console.log("Mask Token Two Deployed At: ", tokenTwoAddr);

    await expect(maskMint.deployToken("MaskTokenTwo", "TWO", 16384)).to.be.revertedWith("Error: Cannot deploy contract for invalid MaskID");
    await expect(maskMint.deployToken("MaskTokenTwo", "TWO", 2)).to.be.revertedWith("Error: Token contract for this mask is already deployed!");
  });

  it("Test Mask Mint Contract EnumerableMap Functions", async function () {
    let numberOfContracts = await maskMint.getNumberOfDeployedContracts();
    for (let i = 0; i < numberOfContracts; i++) {
      console.log(await maskMint.getContractAtIndex(i));
    }
    await expect(maskMint.getContractAtIndex(3)).to.be.revertedWith("Error: Invalid index for deployed contracts");
  })

  it("Test Mask Token Contract ERC-20", async function () {
    tokenContract = await ethers.getContractFactory("MaskToken");
    tokenZero = await tokenContract.attach(tokenZeroAddr);
    tokenTwo = await tokenContract.attach(tokenTwoAddr);
    expect(await tokenZero.name()).to.equal("MaskTokenZero");
    expect(await tokenTwo.name()).to.equal("MaskTokenTwo");
    expect(await tokenZero.symbol()).to.equal("ZERO");
    expect(await tokenTwo.symbol()).to.equal("TWO");
    // I am using the parseEther function here since ERC-20s share 18 decimal point format with ETH
    await expect(tokenZero.connect(addr3).mint(ethers.utils.parseEther("10"))).to.be.revertedWith("Contract has not been given approval to spend NCT necessary for minting!");

    await nct.connect(addr1).transfer(addr3.address, ethers.utils.parseEther("10"));
    await nct.connect(addr3).approve(tokenZeroAddr, ethers.utils.parseEther("10"));
    await tokenZero.connect(addr3).mint(ethers.utils.parseEther("10"));
    expect(await tokenZero.balanceOf(addr3.address)).to.equal(ethers.utils.parseEther("0"));
    expect(await tokenZero.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("10"));

    await tokenZero.connect(addr1).burn(ethers.utils.parseEther("10"));
    expect(await tokenZero.balanceOf(addr1.address)).to.equal(0);

    expect(await tokenZero.decimals()).to.equal(18);

    await expect(tokenZero.connect(addr3).changeName("MWAHAHA")).to.be.revertedWith("Operation may only be performed by mask owner!");
    await expect(tokenZero.connect(addr1).changeName("Ethirium"));
    expect(await tokenZero.name()).to.equal("Ethirium");

    await expect(tokenZero.connect(addr3).changeSymbol("MWA")).to.be.revertedWith("Operation may only be performed by mask owner!");
    await expect(tokenZero.connect(addr1).changeSymbol("HM0"));
    expect(await tokenZero.symbol()).to.equal("HM0");
  })
});