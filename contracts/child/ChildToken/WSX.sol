pragma solidity 0.6.6;

import {ERC20PresetMinterPauser} from "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";
import {NativeMetaTransaction} from "../../common/NativeMetaTransaction.sol";
import {ContextMixin} from "../../common/ContextMixin.sol";

contract WSX is
    ERC20PresetMinterPauser,
    NativeMetaTransaction,
    ContextMixin
{
    event  Deposit(address indexed dst, uint wad);
    event  Withdrawal(address indexed src, uint wad);

    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Sender doesn't have admin role");
        _;
    }

    constructor() public ERC20PresetMinterPauser("Wrapped SX", "WSX") {
        _setupDecimals(18);
        _initializeEIP712("Wrapped SX");

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    fallback() external payable {
        deposit();
    }

    /**
        @notice Wraps the sender's SX by depositing n SX to the contract and minting n WSX to the sender.
     */
    function deposit() public payable {
      // mint WSX to the sender      
      _mint(msg.sender, msg.value);

      Deposit(msg.sender, msg.value);
    }

    /**
        @notice Unwraps the sender's WSX by burning n WSX and sending n SX to the sender.
     */
    function withdraw(uint amount) public {
      require(address(this).balance >= amount, "Insufficient balance.");

      // burn the sender's WSX
      _burn(_msgSender(), amount);

      // transfer sender SX
      (bool success, ) = payable(_msgSender()).call{value:amount}("");
      require(success, "Transfer failed.");

      Withdrawal(_msgSender(), amount);
    }

    /**
        @notice Allows for withdrawal 
        @notice Only callable by an address that currently has the admin role (is the contract deployer).
     */
    function adminWithdraw(uint amount) public onlyAdmin {
      // transfer sender SX
      (bool success, ) = payable(_msgSender()).call{value:amount}("");
      require(success, "Transfer failed.");

      Withdrawal(_msgSender(), amount);
    }

    // This is to support Native meta transactions
    // never use msg.sender directly, use _msgSender() instead
    function _msgSender()
        internal
        override
        view
        returns (address payable sender)
    {
        return ContextMixin.msgSender();
    }
}