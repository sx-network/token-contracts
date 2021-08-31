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

    constructor() public ERC20PresetMinterPauser("Wrapped SX", "WSX") {
        _setupDecimals(18);
        _initializeEIP712("Wrapped SX");
    }

    fallback() external payable {
        deposit();
    }

    function deposit() public payable {
      // mint WSX to the sender      
      _mint(msg.sender, msg.value);

      Deposit(msg.sender, msg.value);
    }

    function withdraw(uint wad) public {
      require(balanceOf(address(this)) >= wad);

      // burn the sender's WSX
      _burn(_msgSender(), wad);

      // transfer sender SX
      (bool success, ) = payable(_msgSender()).call{value:wad}("");
      require(success, "Transfer failed.");

      Withdrawal(_msgSender(), wad);
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