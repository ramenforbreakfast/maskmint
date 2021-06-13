import { ethers } from "ethers";
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
    let submittedTx;
    switch (fn) {
        case ("burn"):
            console.log("Burn function called");
            parsedArg = ethers.utils.parseEther(arg);
            try {
                submittedTx = await tokenContract.burn(parsedArg);
                break
            } catch (err) {
                alert(err.message);
                throw err;
            }
        case ("changeName"):
            console.log("changeName function called");
            try {
                submittedTx = await tokenContract.changeName(arg);
                break
            } catch (err) {
                alert(err.message);
                throw err;
            }
        case ("changeSymbol"):
            console.log("changeSymbol function called");
            try {
                submittedTx = await tokenContract.changeSymbol(arg);
                break
            } catch (err) {
                alert(err.message);
                throw err;
            }
    }
    monitorTx(submittedTx.hash);
    console.log("  in", submittedTx?.hash);
}
