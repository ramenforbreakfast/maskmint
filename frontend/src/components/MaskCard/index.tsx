import * as React from 'react'
import { LinkIcon } from '@heroicons/react/solid'

export type TokenProps = {
    tokenSym: string;
    tokenName: string;
    maskName: string;
    maskID: number;
}

export function MaskCard({ tokenSym, tokenName, maskName, maskID }: TokenProps) {
    const imgURL = "https://hashmasksstore.blob.core.windows.net/hashmaskspreview/" + ((maskID + 10141) % 16384) + ".png"
    return (
        <div className="border-2 border-gray-600 rounded-lg w-1/4 m-2 bg-gray-100">
            <div className="w-full p-2 border-b border-1 border-white">
                <h3 className="text-xl font-FredokaOne">Mask #{maskID}</h3>
                <h3 className="text-xl italic font-FredokaOne">"{maskName}"</h3>
            </div>
            <img className="object-scale-down" src={imgURL} alt={String(maskID)}></img>
            <div className="flex flex-col p-2">
                <div className="flex flex-row">
                    <p className="font-bold font-mono">{tokenName + "(" + tokenSym + ")"}</p>
                </div>
                <div className="flex flex-row">
                    <p className="font-mono">Your Balance: 6000</p>
                </div>
                <div className="flex flex-row items-center">
                    <button className="mr-2"><LinkIcon className="text-blue-600 w-5"></LinkIcon></button>
                    <p className="font-extralight font-mono">View Token Contract On Etherscan</p>
                </div>
            </div>
        </div>
    )
}