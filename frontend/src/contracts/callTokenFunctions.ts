import { errors, ethers } from "ethers";
import MaskToken from "./MaskToken.json";

export async function callTokenFunction(
    monitorTx: (hash: string) => Promise<any>,
    signer: any,
    tokenAddress: string,
    fn: string,
    arg: string
) {
    const tokenContract = new ethers.Contract(tokenAddress, MaskToken.abi, signer);
    let parsedArg;
    let populatedTx;
    switch (fn) {
        case ("mint"):
            console.log("Mint function called");
            parsedArg = ethers.utils.parseEther(arg);
            try {
                populatedTx = await tokenContract.mint(parsedArg);
                break
            } catch (err) {
                alert(err.data.message);
                throw err;
            }
        case ("burn"):
            console.log("Burn function called");
            parsedArg = ethers.utils.parseEther(arg);
            try {
                populatedTx = await tokenContract.burn(parsedArg);
                break
            } catch (err) {
                alert(err.data.message);
                throw err;
            }
        case ("changeName"):
            console.log("changeName function called");
            try {
                populatedTx = await tokenContract.changeName(arg);
                break
            } catch (err) {
                alert(err.data.message);
                throw err;
            }
        case ("changeSymbol"):
            console.log("changeSymbol function called");
            try {
                populatedTx = await tokenContract.changeSymbol(arg);
                break
            } catch (err) {
                alert(err.data.message);
                throw err;
            }
    }
    monitorTx(populatedTx.hash);
    console.log("  in", populatedTx?.hash);
}
