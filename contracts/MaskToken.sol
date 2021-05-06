pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import {
    IERC20 as NCT_IERC20
} from "../libs/hashmasks/openzeppelin/ERC20/IERC20.sol";
import {
    IERC721 as HM_IERC721
} from "../libs/hashmasks/openzeppelin/ERC721/IERC721.sol";
import {
    ERC20,
    ERC20Burnable,
    IERC20
} from "../libs/openzeppelin/ERC20Burnable.sol";

contract MaskToken is ERC20Burnable {
    uint256 public maskID;
    NCT_IERC20 private nctContract;
    HM_IERC721 private maskContract;

    uint256 constant SECONDS_IN_A_DAY = 86400;
    uint256 constant EMISSION_PER_DAY = 10 * (10**18);
    uint256 constant EMISSION_END = 1927206000;

    using SafeMath for uint256;

    modifier onlyForMaskOwner(address minter) {
        address maskOwner = maskContract.ownerOf(maskID);
        require(minter == maskOwner, "Only the mask owner can mint tokens!");
        _;
    }

    /**
     * @notice Token contract constructor, allows anyone to deploy the contract, however contract will always be initialized with zero token supply.
     * @param name token name
     * @param symbol token symbol
     * @param _maskID ID of the hashmask to be bound to this token contract
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 _maskID,
        address nctContractAddress,
        address maskContractAddress
    ) ERC20(name, symbol) {
        maskID = _maskID;
        nctContract = NCT_IERC20(nctContractAddress);
        maskContract = HM_IERC721(maskContractAddress);
    }

    function nctAccumulated() internal view returns (uint256 currAccumulated) {
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
        require((totalSupply() + amount) <= maxSupply);
        nctContract.approve(minter, amount);
        nctContract.transferFrom(minter, address(this), amount);
        nctContract.burn(amount);
        _mint(minter, amount);
    }

    function changeName(string memory name)
        public
        onlyForMaskOwner(msg.sender)
    {
        _changeName(name);
        emit NameChange(name);
    }

    event NameChange(string name);
}
