pragma solidity ^0.8.0;

import {MaskToken} from "./MaskToken.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import {
    EnumerableMap
} from "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import {
    IERC721 as HM_IERC721
} from "../libs/hashmasks/openzeppelin/ERC721/IERC721.sol";

contract MaskMint {
    using SafeMath for uint256;
    using EnumerableMap for EnumerableMap.UintToAddressMap;

    EnumerableMap.UintToAddressMap private deployedContracts;
    HM_IERC721 private maskContract;

    address immutable tokenImplementation;
    address public nctContractAddress;
    address public maskContractAddress;

    uint256 public constant MAX_NFT_SUPPLY = 16384;

    constructor(address _nctContractAddress, address _maskContractAddress) {
        maskContract = HM_IERC721(_maskContractAddress);
        nctContractAddress = _nctContractAddress;
        maskContractAddress = _maskContractAddress;
        tokenImplementation = address(new MaskToken());
    }

    function deployToken(
        string memory name,
        string memory symbol,
        uint256 maskID
    ) external {
        require(
            maskID < MAX_NFT_SUPPLY,
            "Error: Cannot deploy contract for invalid MaskID"
        );
        require(
            deployedContracts.contains(maskID) == false,
            "Error: Token contract for this mask is already deployed!"
        );
        address clone = Clones.clone(tokenImplementation);
        MaskToken(clone).initialize(
            name,
            symbol,
            maskID,
            nctContractAddress,
            maskContractAddress
        );
        deployedContracts.set(maskID, clone);
    }

    function getTokenContract(uint256 maskID) external view returns (address) {
        return (
            deployedContracts.get(
                maskID,
                "Error: Token contract has not been deployed!"
            )
        );
    }

    function getNumberOfDeployedContracts() external view returns (uint256) {
        return (deployedContracts.length());
    }

    function getContractAtIndex(uint256 index) external view returns (address) {
        require(
            index < deployedContracts.length(),
            "Error: Invalid index for deployed contracts"
        );
        (, address contractAddress) = deployedContracts.at(index);
        return contractAddress;
    }
}
