pragma solidity 0.7.6;

import {ERC20PresetMinterPauser} from "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";
import {NativeMetaTransaction} from "../../common/NativeMetaTransaction.sol";
import {ContextMixin} from "../../common/ContextMixin.sol";

contract DAI is
    ERC20PresetMinterPauser,
    NativeMetaTransaction,
    ContextMixin
{
    constructor() ERC20PresetMinterPauser("DAI Coin", "DAI") {
        _setupDecimals(18);
        _initializeEIP712("DAI Coin");

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