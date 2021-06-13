import { run, ethers } from "hardhat";
/*
Mainnet Deployment
NCT Contract Deployed At:  0x8A9c4dfe8b9D8962B31e4e16F8321C44d48e246E
HashMask Contract Deployed At:  0xC2C747E0F7004F9E8817Db2ca4997657a7746928
*/
async function main() {
    let maskMint;
    let deployer;
    let userAddresses = await ethers.getSigners();

    deployer = userAddresses[0];
    console.log("Showing Deployer Account");
    console.log("Address: ", deployer.address);
    const mintContract = await ethers.getContractFactory("MaskMint");
    maskMint = await mintContract.deploy("0x8A9c4dfe8b9D8962B31e4e16F8321C44d48e246E", "0xC2C747E0F7004F9E8817Db2ca4997657a7746928");
    await maskMint.deployed();
    console.log("Mask Mint: ", maskMint.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });