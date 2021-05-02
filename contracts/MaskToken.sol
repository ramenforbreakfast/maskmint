pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {ERC20Burnable, IERC20} from "../libs/openzeppelin/ERC20Burnable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MaskToken is ERC20Burnable{
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public maskID;
    IERC20 private nctContract;
    IERC721 private maskContract;

    uint256 constant SECONDS_IN_A_DAY = 86400;
    uint256 constant EMISSION_PER_DAY = 10 * (10**18);
    uint256 constant EMISSION_END = 1927206000;

    using SafeMath for uint256;

    modifier onlyForMaskOwner(address minter) {
        address maskOwner = maskContract.ownerOf(maskID);
        require(minter == maskOwner, "Only the mask owner can mint tokens!");
    }

    /**
     * @notice Token contract constructor, allows anyone to deploy the contract, however contract will always be initialized with zero token supply.
     * @param _name token name
     * @param _symbol token symbol
     * @param _maskID ID of the hashmask to be bound to this token contract
     */
    constructor (string memory _name, string memory _symbol, uint256 _maskID) public {
        require
        name = _name;
        symbol = _symbol;
        maskID = _maskID;
        nctContract = IERC20(0x8A9c4dfe8b9D8962B31e4e16F8321C44d48e246E);
        maskContract = IERC721(0xC2C747E0F7004F9E8817Db2ca4997657a7746928);
        _totalSupply = 0;
    }

    function nctAccumulated() internal pure returns (uint256 currAccumulated) {
        uint256 accumulationPeriod =
            block.timestamp < EMISSION_END ? block.timestamp : EMISSION_END;
        currAccumulated = accumulationPeriod.mul(EMISSION_PER_DAY).div(
            SECONDS_IN_A_DAY
        );
        return currAccumulated;
    }

    function mint(address minter, uint256 amount)
        external
        onlyForMaskOwner(minter)
    {
        uint256 maxSupply = nctAccumulated();
        require((_totalSupply + amount) <= maxSupply);
        nctContract.approve(minter, amount);
        nctContract.transferFrom(minter, address(this), amount);
        nctContract.burn(amount);
        _mint(minter, amount);
    }

    function changeName(string memory _name) public onlyForMaskOwner(msg.sender) {
        name = _name;
    }
}
