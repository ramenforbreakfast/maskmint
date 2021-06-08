import { run, ethers } from "hardhat";

/*
Ropsten Deployment
--------------------------------------------------------------------------
Address:  0xd9e45aCBc01D5713cd00D7b834733D5Ee2511CA0
Balance:  1100000000000000000
NCT Contract Deployed At:  0x27AF8A2B6FB0925e45a262809C75558D6525b10d
HashMask Contract Deployed At:  0x008c8647b050cDc0771EcD08fA31C156Af2Da100
Mask Mint:  0x662B8c706a748eD7AC982dD0E00F7260F09D2822
NCT Balance of Owner:  12541036342592592592592
Mask Token Zero Deployed At:  0x7B94c456851AdA867AF2bbfFd089184c05c8c38C
Mask Token Two Deployed At:  0xC11d5C79690A47A57Ca3AFF56EbeA34EDC31E85A
*/

async function main() {
    let i;
    let tx, txReceipt;
    let nct, mask, maskMint, tokenZero, tokenTwo;
    let tokenZeroAddr, tokenTwoAddr;
    let owner;
    let userAddresses = await ethers.getSigners();

    owner = userAddresses[0];
    console.log("Showing First Account");
    console.log("Address: ", owner.address);
    console.log("Balance: ", (await owner.getBalance()).toString());

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

    tx = await mask.connect(owner).mintNFT(2, { value: ethers.utils.parseEther("0.2") });
    try {
        txReceipt = await tx.wait();
        if (txReceipt) {
            if (!txReceipt.blockNumber) {
                throw Error("Was not included in block!")
            }
        }
    } catch (e) {
        console.log(`Transaction Receipt Not Received!\n${e}`);
    }
    tx = await mask.connect(owner).mintNFT(2, { value: ethers.utils.parseEther("0.2") });
    try {
        txReceipt = await tx.wait();
        if (txReceipt) {
            if (!txReceipt.blockNumber) {
                throw Error("Was not included in block!")
            }
        }
    } catch (e) {
        console.log(`Transaction Receipt Not Received!\n${e}`);
    }

    tx = await nct.connect(owner).claim([0, 1]);
    try {
        txReceipt = await tx.wait();
        if (txReceipt) {
            if (!txReceipt.blockNumber) {
                throw Error("Was not included in block!")
            }
        }
    } catch (e) {
        console.log(`Transaction Receipt Not Received!\n${e}`);
    }
    tx = await nct.connect(owner).claim([2, 3]);
    try {
        txReceipt = await tx.wait();
        if (txReceipt) {
            if (!txReceipt.blockNumber) {
                throw Error("Was not included in block!")
            }
        }
    } catch (e) {
        console.log(`Transaction Receipt Not Received!\n${e}`);
    }

    let nctBal;
    nctBal = await nct.balanceOf(owner.address);
    console.log("NCT Balance of Owner: ", nctBal.toString());

    tx = await maskMint.deployToken("MaskTokenZero", "ZERO", 0);
    try {
        txReceipt = await tx.wait();
        if (txReceipt) {
            if (!txReceipt.blockNumber) {
                throw Error("Was not included in block!")
            }
        }
    } catch (e) {
        console.log(`Transaction Receipt Not Received!\n${e}`);
    }
    tokenZeroAddr = await maskMint.getTokenContract(0);
    console.log("Mask Token Zero Deployed At: ", tokenZeroAddr);

    tx = await maskMint.deployToken("MaskTokenTwo", "TWO", 2);
    try {
        txReceipt = await tx.wait();
        if (txReceipt) {
            if (!txReceipt.blockNumber) {
                throw Error("Was not included in block!")
            }
        }
    } catch (e) {
        console.log(`Transaction Receipt Not Received!\n${e}`);
    }
    tokenTwoAddr = await maskMint.getTokenContract(2);
    console.log("Mask Token Two Deployed At: ", tokenTwoAddr);

    const tokenContract = await ethers.getContractFactory("MaskToken");
    tokenZero = await tokenContract.attach(tokenZeroAddr);
    tokenTwo = await tokenContract.attach(tokenTwoAddr);

    tx = await nct.connect(owner).approve(tokenZeroAddr, ethers.utils.parseEther("10"));
    try {
        txReceipt = await tx.wait();
        if (txReceipt) {
            if (!txReceipt.blockNumber) {
                throw Error("Was not included in block!")
            }
        }
    } catch (e) {
        console.log(`Transaction Receipt Not Received!\n${e}`);
    }

    tx = await tokenZero.connect(owner).mint(ethers.utils.parseEther("10"));
    try {
        txReceipt = await tx.wait();
        if (txReceipt) {
            if (!txReceipt.blockNumber) {
                throw Error("Was not included in block!")
            }
        }
    } catch (e) {
        console.log(`Transaction Receipt Not Received!\n${e}`);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });