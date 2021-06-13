import React, { useContext } from 'react'
import Web3Context from '../../context/web3';
import { deployToken } from '../../contracts/deployToken';
import { approveAndMint } from '../../contracts/approveAndMint';
import { callTokenFunction } from '../../contracts/callTokenFunctions';

export type EditCardProps = {
    deployed: boolean;
    tokenSym?: string;
    tokenName?: string;
    tokenBal?: string
    tokenAddr?: string;
    maskName: string;
    maskID: number;
}

export function EditCard({ deployed, tokenSym, tokenName, tokenBal, tokenAddr, maskName, maskID }: EditCardProps) {
    const { signer, monitorTx, readyToTransact } = useContext(Web3Context);

    const [mintAmt, setMintAmt] = React.useState("");
    const [burnAmt, setBurnAmt] = React.useState("");
    const [newName, setNewName] = React.useState("");
    const [newSym, setNewSym] = React.useState("");

    const changeMint = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMintAmt(e.target.value);
    };
    const changeBurn = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBurnAmt(e.target.value);
    };
    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };
    const changeSym = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSym(e.target.value);
    };

    const submitMint = () => {
        try {
            readyToTransact().then(() => {
                if (tokenAddr) {
                    approveAndMint(monitorTx, signer, tokenAddr, mintAmt).then(() => { })
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
    const submitBurn = () => {
        try {
            readyToTransact().then(() => {
                if (tokenAddr) {
                    callTokenFunction(monitorTx, signer, tokenAddr, "burn", burnAmt).then(() => { })
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
    const submitName = () => {
        try {
            readyToTransact().then(() => {
                if (tokenAddr) {
                    callTokenFunction(monitorTx, signer, tokenAddr, "changeName", newName).then(() => { })
                }
            });
        } catch (err) {
            console.log(err);
        }
    }
    const submitSym = () => {
        try {
            readyToTransact().then(() => {
                if (tokenAddr) {
                    callTokenFunction(monitorTx, signer, tokenAddr, "changeSymbol", newSym).then(() => { })
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    const deployContract = () => {
        try {
            readyToTransact().then(() => {
                deployToken(monitorTx, signer, newName, newSym, maskID).then(() => { })
            });
        } catch (err) {
            console.log(err);
        }
    }

    const imgURL = "https://hashmasksstore.blob.core.windows.net/hashmaskspreview/" + ((maskID + 10141) % 16384) + ".png"
    return (
        <div className="flex flex-row items-center border-4 my-4 w-3/4 border-gray-600 rounded-lg bg-gray-200">
            <img className="object-left object-scale-down h-32 w-1/12" src={imgURL} alt={String(maskID)}></img>
            <div className="flex flex-col m-2 w-3/12">
                <h3 className="text-xl font-mono">Mask #{maskID}</h3>
                <h3 className="text-xl italic font-mono">"{maskName}"</h3>
            </div>
            {deployed
                ?
                <React.Fragment>
                    <div className="flex flex-col m-2">
                        <button className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 font-mono text-white"
                            onClick={submitMint}>
                            Mint
                        </button>
                        <button className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 font-mono text-white"
                            onClick={submitBurn}>
                            Burn
                        </button>
                    </div>
                    <div className="flex flex-col m-2">
                        <input className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg" type="text" value={mintAmt} onChange={changeMint}></input>
                        <input className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg" type="text" value={burnAmt} onChange={changeBurn}></input>
                    </div>
                    <div className="flex flex-col m-2">
                        <button className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 font-mono text-white"
                            onClick={submitName}>
                            Change Token Name
                        </button>
                        <button className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 font-mono text-white"
                            onClick={submitSym}>
                            Change Token Symbol
                        </button>
                    </div>
                    <div className="flex flex-col m-2">
                        <input className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg" type="text" value={newName} onChange={changeName}></input>
                        <input className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg" type="text" value={newSym} onChange={changeSym}></input>
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                    <div className="flex flex-col m-2">
                        <input type="text" name="deployName" id="deployName" className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg" placeholder="Token Name"
                            value={newName} onChange={changeName} />
                    </div>
                    <div className="flex flex-col m-2">
                        <input type="text" name="deploySym" id="deploySym" className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg" placeholder="Token Symbol"
                            value={newSym} onChange={changeSym} />
                    </div>
                    <div className="flex flex-col m-2">
                        <button className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 font-mono text-white"
                            onClick={deployContract}>
                            Deploy
                        </button>
                    </div>
                </React.Fragment>
            }
        </div>
    )
}