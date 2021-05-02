pragma solidity ^0.7.3;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/math/SafeMathUpgradeable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MaskToken is Initializable, ERC20Upgradeable {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public maskID;
    IERC721 private maskContract;

    uint256 constant SECONDS_IN_A_DAY = 86400;
    uint256 constant EMISSION_PER_DAY = 10 * (10**18);
    uint256 constant EMISSION_END = 1927206000;

    using SafeMathUpgradeable for uint256;

    function initialize(
        string memory _name,
        string memory _symbol,
        uint256 maskID,
        address issuer
    ) public initializer {
        name = _name;
        symbol = _symbol;
        maskID = maskID;
        maskContract = IERC721(0xc2c747e0f7004f9e8817db2ca4997657a7746928);
        _totalSupply = 0;
        _balances[issuer] = totalSupply;
        emit Transfer(address(0x0), issuer, totalSupply);
    }

    function nctAccumulated() internal pure returns (uint256 currAccumulated) {
        uint256 accumulationPeriod =
            block.timestamp < EMISSION_END ? block.timestamp : EMISSION_END;
        currAccumulated = accumulationPeriod.mul(EMISSION_PER_DAY).div(
            SECONDS_IN_A_DAY
        );
        return currAccumulated;
    }

    modifier onlyForMaskOwner(address minter) {
        address maskOwner = maskContract.ownerOf(maskID);
        require(minter == maskOwner, "Only the mask owner can mint tokens!");
    }

    function mint(address minter, uint256 amount)
        external
        onlyForMaskOwner(minter)
    {
        uint256 maxSupply = nctAccumulated();
        require((_totalSupply + amount) <= maxSupply);
        _mint(minter, amount);
    }
}
