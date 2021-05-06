pragma solidity ^0.8.0;

import {MaskToken} from "./MaskToken.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {
    IERC721 as HM_IERC721
} from "../libs/hashmasks/openzeppelin/ERC721/IERC721.sol";

contract MaskMint {
    using SafeMath for uint256;

    mapping(uint256 => address) deployedContracts;
    HM_IERC721 private maskContract;
    address public nctContractAddress;
    address public maskContractAddress;

    uint256 public constant MAX_NFT_SUPPLY = 16384;

    constructor(address _nctContractAddress, address _maskContractAddress) {
        maskContract = HM_IERC721(_maskContractAddress);
        nctContractAddress = _nctContractAddress;
        maskContractAddress = _maskContractAddress;
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
            deployedContracts[maskID] == address(0),
            "Error: Token contract for this mask is already deployed!"
        );
        MaskToken newContract =
            new MaskToken(
                name,
                symbol,
                maskID,
                nctContractAddress,
                maskContractAddress
            );
        deployedContracts[maskID] = address(newContract);
    }

    function getTokenContract(uint256 maskID) external view returns (address) {
        return (deployedContracts[maskID]);
    }
}
