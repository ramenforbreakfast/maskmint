const { ethers } = require("hardhat");

async function main() {
    let nct, mask, maskMint;
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

    const mintContract = await ethers.getContractFactory("MaskMint");
    maskMint = await mintContract.deploy(nct.address, mask.address);
    await maskMint.deployed();
    console.log("Mask Mint: ", maskMint.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });