import React, { useContext, useEffect, useState } from 'react'
import { EditCard } from '../EditCard'
import Web3Context from '../../context/web3';
import { getTokenData } from "../../contracts/getTokenData"
import { getDeployedContracts } from '../../contracts/getDeployedContracts';
import { getMaskName } from '../../contracts/getMaskName';

type CardData = {
    deployed: boolean;
    tokenSym?: string;
    tokenName?: string;
    tokenBal?: string;
    tokenAddr?: string;
    maskName: string;
    maskID: number;
};

export default function Manage() {
    const { signer, masks } = useContext(Web3Context);
    const [cardData, setCardData] = useState<Map<number, CardData>>(new Map());

    useEffect(() => {
        const getCardData = async () => {
            const deployedContracts = await getDeployedContracts(signer);
            const dataForManage: Map<number, CardData> = new Map();
            let currMask, currContract, maskQuery, tokenQuery;
            for (currMask of masks) {
                maskQuery = await getMaskName(signer, currMask);
                dataForManage.set(currMask, {
                    deployed: false,
                    maskName: maskQuery.maskName,
                    maskID: currMask,
                })
            };
            for (currContract of deployedContracts) {
                tokenQuery = await getTokenData(signer, currContract);
                if (masks.includes(tokenQuery.maskID)) {
                    const tempData = dataForManage.get(tokenQuery.maskID);
                    if (tempData) {
                        tempData.deployed = true;
                        tempData.tokenSym = tokenQuery.symbol;
                        tempData.tokenName = tokenQuery.name;
                        tempData.tokenBal = tokenQuery.balance;
                        tempData.tokenAddr = currContract;
                        dataForManage.set(tokenQuery.maskID, tempData);
                    }
                }
            };
            setCardData(dataForManage);
        }
        getCardData().then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e);
        })
    }, [signer, masks]);

    return (
        <div className="flex flex-col items-center">
            {cardData.size > 0
                ?
                masks.map((mask, index) => {
                    const cardKey = "manage" + mask;
                    const maskData = cardData.get(mask);
                    if (maskData) {
                        return <EditCard key={cardKey} deployed={maskData.deployed} tokenSym={maskData.tokenSym} tokenName={maskData.tokenName} tokenBal={maskData.tokenBal} tokenAddr={maskData.tokenAddr} maskName={maskData.maskName} maskID={maskData.maskID} ></EditCard>
                    } else {
                        return <div></div>
                    }
                })
                :
                <h1 className="text-gray-500 font-mono my-5 text-3xl">
                    No Masks Detected On Wallet or Wallet is Disconnected...
                </h1>
            }
        </div >
    )
}