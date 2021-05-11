import * as React from 'react'
import { FireIcon, SearchCircleIcon, BriefcaseIcon, GiftIcon } from '@heroicons/react/solid'

export default function About() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-center items-center p-3">
                <h1 className="text-xl font-mono">Deploy ERC-20 tokens for Hashmasks. Mint tokens by</h1>
                <FireIcon className="h-10 w-10 text-yellow-500"></FireIcon>
                <h1 className="text-xl font-mono">NCT!</h1>
            </div>
            <div className="flex flex-row justify-center items-start space-x-3">
                <div className="p-5 border-4 rounded-lg border-gray-500 w-1/4 bg-gray-200">
                    <p className="text-3xl text-center text-gray-700 font-FredokaOne">Browse</p>
                    <SearchCircleIcon className="h-20 w-20 mx-auto text-yellow-500"></SearchCircleIcon>
                    <p className="text-xl text-center font-mono">View Currently Deployed Mask Token Contracts</p>

                </div>
                <div className="p-5 border-4 rounded-lg border-gray-500 w-1/4 bg-gray-200">
                    <p className="text-3xl text-center text-gray-700 font-FredokaOne">Manage</p>
                    <BriefcaseIcon className="h-20 w-20 mx-auto text-yellow-500"></BriefcaseIcon>
                    <p className="text-xl text-center font-mono">Create and Manage Tokens for Your Masks</p>

                    <ul className="list-disc list-inside leading-relaxed font-mono my-3">
                        <li>Mask owners can change the name and symbol for their respective token!</li>
                        <li>ANYONE can mint tokens by burning NCT 1:1, but any minted tokens will be sent directly to the mask owner @ time of minting.</li>
                        <li>MAX token supply for ALL contracts is the same for all masks equal to the total NCT emissions-to-date for a mask.</li>
                    </ul>
                </div>
                <div className="p-5 border-4 rounded-lg border-gray-500 w-1/4 bg-gray-200">
                    <p className="text-3xl text-center text-gray-700 font-FredokaOne">Sponsor</p>
                    <GiftIcon className="h-20 w-20 mx-auto text-yellow-500"></GiftIcon>
                    <p className="text-xl text-center font-mono">Sponsor the Deployment of a Mask Token</p>

                    <ul className="list-disc list-inside leading-relaxe font-mono my-3">
                        <li>ANYONE can deploy a contract for a mask if one has not already been deployed.</li>
                        <li>All contracts are initialized with zero token supply, any newly minted tokens will be sent to the holder of that mask.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}