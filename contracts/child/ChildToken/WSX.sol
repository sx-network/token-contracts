// SPDX-License-Identifier: MIT
pragma solidity 0.7.6;

import {ERC20PresetMinterPauser} from "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";
import {NativeMetaTransaction} from "../../common/NativeMetaTransaction.sol";
import {ContextMixin} from "../../common/ContextMixin.sol";

contract WSX is ERC20PresetMinterPauser, NativeMetaTransaction, ContextMixin {
    event Deposit(address indexed dst, uint256 wad);
    event Withdrawal(address indexed src, uint256 wad);

    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Sender doesn't have admin role");
        _;
    }

    constructor() ERC20PresetMinterPauser("Wrapped SX", "WSX") {
        _setupDecimals(18);
        _initializeEIP712("Wrapped SX");

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    receive() external payable {
        deposit();
    }

    /**
        @notice Wraps the sender's SX by depositing n SX to the contract and minting n WSX to the sender.
     */
    function deposit() public payable {
        // mint WSX to the sender
        _mint(msg.sender, msg.value);

        emit Deposit(msg.sender, msg.value);
    }

    /**
        @notice Unwraps the sender's WSX by burning n WSX and sending n SX to the sender.
     */
    function withdraw(uint256 amount) public {
        require(address(this).balance >= amount, "Insufficient balance.");

        // burn the sender's WSX
        _burn(_msgSender(), amount);

        // transfer sender SX
        (bool success, ) = payable(_msgSender()).call{value: amount}("");
        require(success, "Transfer failed.");

        emit Withdrawal(_msgSender(), amount);
    }

    /**
        @notice Allows for withdrawal
        @notice Only callable by an address that currently has the admin role (is the contract deployer).
     */
    function adminWithdraw(uint256 amount) public onlyAdmin {
        require(address(this).balance >= amount, "Insufficient balance.");

        // transfer sender SX
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed.");

        emit Withdrawal(msg.sender, amount);
    }

    // This is to support Native meta transactions
    // never use msg.sender directly, use _msgSender() instead
    function _msgSender() internal view override returns (address payable sender) {
        return ContextMixin.msgSender();
    }
}
