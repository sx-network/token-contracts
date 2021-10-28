pragma solidity 0.6.6;

import {ERC20PresetMinterPauser} from "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";
import {NativeMetaTransaction} from "../../common/NativeMetaTransaction.sol";
import {ContextMixin} from "../../common/ContextMixin.sol";

contract USDC is
    ERC20PresetMinterPauser,
    NativeMetaTransaction,
    ContextMixin
{
    constructor() public ERC20PresetMinterPauser("USD Coin", "USDC") {
        _setupDecimals(6);
        _initializeEIP712("USD Coin");

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
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