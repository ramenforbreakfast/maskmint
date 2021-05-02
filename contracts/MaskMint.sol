pragma solidity ^0.8.0;

import {MaskToken} from "./MaskToken.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MaskMint {
    mapping(uint256 => address) deployedContracts;
    IERC721 private maskContract;

    using SafeMath for uint256;

    constructor() public {
        maskContract = IERC721(0xC2C747E0F7004F9E8817Db2ca4997657a7746928);
    }

    function deployToken(address deployer, uint256 maskID) external {
        require(deployedContracts[maskID] != address(0), "Error: Token contract for this mask is already deployed!");
        MaskToken newContract = new MaskToken(name, symbol, maskID);
        deployedContracts[maskID] = address(newContract);
    }
    
    function getTokenContract(uint256 maskID) external view returns (address){
        return(deployedContracts[maskID]);
    }
}
