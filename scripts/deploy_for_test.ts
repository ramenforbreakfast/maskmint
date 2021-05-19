import { run, ethers } from "hardhat";

async function main() {
    let i;
    let nct, mask, maskMint, tokenZero, tokenTwo;
    let tokenZeroAddr, tokenTwoAddr;
    let owner, addr1, addr2, addr3, addr4;
    let userAddresses = await ethers.getSigners();

    [owner, addr1, addr2, addr3, addr4] = userAddresses;
    console.log("Showing First 5 Addresses...");
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

    const mintContract = await ethers.getContractFactory("MaskMint");
    maskMint = await mintContract.deploy(nct.address, mask.address);
    await maskMint.deployed();
    console.log("Mask Mint: ", maskMint.address);

    await mask.connect(addr1).mintNFT(2, { value: ethers.utils.parseEther("0.2") });
    await mask.connect(addr2).mintNFT(2, { value: ethers.utils.parseEther("0.2") });

    await nct.connect(addr1).claim([0, 1]);
    await nct.connect(addr2).claim([2, 3]);
    let nctBal;
    nctBal = await nct.balanceOf(addr1.address);
    console.log("NCT Balance of Account 1: ", nctBal.toString());
    nctBal = await nct.balanceOf(addr2.address);
    console.log("NCT Balance of Account 2: ", nctBal.toString());

    await maskMint.deployToken("MaskTokenZero", "ZERO", 0);
    tokenZeroAddr = await maskMint.getTokenContract(0);
    console.log("Mask Token Zero Deployed At: ", tokenZeroAddr);

    await maskMint.deployToken("MaskTokenTwo", "TWO", 2);
    tokenTwoAddr = await maskMint.getTokenContract(2);
    console.log("Mask Token Two Deployed At: ", tokenTwoAddr);

    const tokenContract = await ethers.getContractFactory("MaskToken");
    tokenZero = await tokenContract.attach(tokenZeroAddr);
    tokenTwo = await tokenContract.attach(tokenTwoAddr);

    await nct.connect(addr1).transfer(addr3.address, ethers.utils.parseEther("10"));
    await nct.connect(addr3).approve(tokenZeroAddr, ethers.utils.parseEther("10"));
    await tokenZero.connect(addr3).mint(ethers.utils.parseEther("10"));
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });