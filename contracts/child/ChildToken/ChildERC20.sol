pragma solidity 0.6.6;

import {ERC20PresetMinterPauser} from "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";
import {NativeMetaTransaction} from "../../common/NativeMetaTransaction.sol";
import {ContextMixin} from "../../common/ContextMixin.sol";

contract ChildERC20 is
    ERC20PresetMinterPauser,
    NativeMetaTransaction,
    ContextMixin
{
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        address bridgeHandler_
    ) public ERC20PresetMinterPauser(name_, symbol_) {
        _setupDecimals(decimals_);

        // temporarily added for convenience
        _setupRole(DEFAULT_ADMIN_ROLE, bridgeHandler_);
        _setupRole(MINTER_ROLE, bridgeHandler_);
        _setupRole(PAUSER_ROLE, bridgeHandler_);

        _initializeEIP712(name_);
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
