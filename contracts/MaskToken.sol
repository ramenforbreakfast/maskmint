pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../libs/openzeppelin/ERC20Upgradeable.sol";
import {
    IERC20 as NCT_IERC20
} from "../libs/hashmasks/openzeppelin/ERC20/IERC20.sol";
import {
    IERC721 as HM_IERC721
} from "../libs/hashmasks/openzeppelin/ERC721/IERC721.sol";

contract MaskToken is ERC20Upgradeable {
    uint256 public maskID;
    NCT_IERC20 private nctContract;
    HM_IERC721 private maskContract;

    uint256 constant SECONDS_IN_A_DAY = 86400;
    uint256 constant EMISSION_PER_DAY = 10 * (10**18);
    uint256 constant EMISSION_END = 1927206000;

    using SafeMath for uint256;

    modifier onlyForMaskOwner(address minter) {
        address maskOwner = maskContract.ownerOf(maskID);
        require(
            minter == maskOwner,
            "Operation may only be performed by mask owner!"
        );
        _;
    }

    /**
     * @notice Token contract constructor, allows anyone to deploy the contract, however contract will always be initialized with zero token supply.
     * @param name_ token name
     * @param symbol_ token symbol
     * @param maskID_ ID of the hashmask to be bound to this token contract
     * @param nctContractAddress address of NameChangeToken contract
     * @param maskContractAddress address of Hashmask contract
     */
    function initialize(
        string memory name_,
        string memory symbol_,
        uint256 maskID_,
        address nctContractAddress,
        address maskContractAddress
    ) public initializer {
        __ERC20_init(name_, symbol_);
        maskID = maskID_;
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

    function mint(uint256 amount) external {
        address maskOwner = maskContract.ownerOf(maskID);
        uint256 maxSupply = nctAccumulated();
        require(
            (totalSupply() + amount) <= maxSupply,
            "Cannot mint more tokens than the amount of NCT a mask has accumulated so far!"
        );
        uint256 allowance = nctContract.allowance(msg.sender, address(this));
        require(
            allowance >= amount,
            "Contract has not been given approval to spend NCT necessary for minting!"
        );
        nctContract.transferFrom(msg.sender, address(this), amount);
        nctContract.burn(amount);
        _mint(maskOwner, amount);
    }

    function burn(uint256 amount) external {
        _burn(_msgSender(), amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     */
    function burnFrom(address account, uint256 amount) external {
        uint256 currentAllowance = allowance(account, _msgSender());
        require(
            currentAllowance >= amount,
            "ERC20: burn amount exceeds allowance"
        );
        _approve(account, _msgSender(), currentAllowance - amount);
        _burn(account, amount);
    }

    function changeName(string memory name)
        public
        onlyForMaskOwner(msg.sender)
    {
        _changeName(name);
        emit NameChange(name);
    }

    event NameChange(string name);

    function changeSymbol(string memory symbol)
        public
        onlyForMaskOwner(msg.sender)
    {
        _changeSymbol(symbol);
        emit SymbolChange(symbol);
    }

    event SymbolChange(string symbol);
}
