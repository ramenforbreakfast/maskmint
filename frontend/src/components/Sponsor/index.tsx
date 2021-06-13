import React, { useContext } from 'react'
import Web3Context from '../../context/web3';
import { deployToken } from '../../contracts/deployToken';

export default function Sponsor() {
    const { signer, monitorTx, readyToTransact } = useContext(Web3Context);
    const [newName, setNewName] = React.useState("");
    const [newSym, setNewSym] = React.useState("");
    const [newMaskID, setMaskID] = React.useState("");

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(e.target.value);
    };
    const changeSym = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSym(e.target.value);
    };

    const changeMaskID = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaskID(e.target.value);
    };

    const deployContract = () => {
        try {
            readyToTransact().then(() => {
                const convertedID = Number(newMaskID);
                deployToken(monitorTx, signer, newName, newSym, convertedID).then(() => { })
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col items-center">
            {signer
                ?
                <div className="flex flex-col items-center border-4 my-4 w-3/4 border-gray-600 rounded-lg bg-gray-200">
                    <div className="flex flex-row justify-items-center">
                        <div className="flex flex-col m-2">
                            <input className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg" type="text" value={newName} onChange={changeName} placeholder="Token Name"></input>
                        </div>
                        <div className="flex flex-col m-2">
                            <input className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg" type="text" value={newSym} onChange={changeSym} placeholder="Token Symbol"></input>
                        </div>
                        <div className="flex flex-col m-2">
                            <input className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg" type="text" value={newMaskID} onChange={changeMaskID} placeholder="Mask ID"></input>
                        </div>
                    </div>
                    <div className="flex flex-row justify-items-center">
                        <div className="flex flex-col m-2">
                            <button className="rounded px-3 py-2 m-1 border-b-4 border-l-2 shadow-lg bg-blue-700 border-blue-800 font-mono text-white" onClick={deployContract}>Deploy</button>
                        </div>
                    </div>
                </div>
                :
                <h1 className="text-gray-500 font-mono my-5 text-3xl">
                    No Wallet Detected, Please Connect One...
                </h1>
            }
            
        </div>
    )
}