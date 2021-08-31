pragma solidity 0.6.6;

import {ChildERC20} from "../child/ChildToken/ChildERC20.sol";

contract WETH is ChildERC20 {
    constructor(
        string memory name_,
        string memory symbol_,
        uint8 decimals_,
        address bridgeHandler
    ) public ChildERC20(name_, symbol_, decimals_, bridgeHandler) {}
} 