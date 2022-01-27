pragma solidity 0.7.6;

/**
    @title Manages deposited native SX to be paid out to bridge arrivals.
    @notice This contract is currently used by our bridging ERC20SXHandler contract, which is permissioned to
    call {bridgeExit()} - the final/exit function used to support ChainBridge transfers from ERC-20 tokens 
    on the origin chain to native tokens on our own chain.
    @notice This contract requires periodic top ups of native tokens.
 */
contract SXVault {
  address public _owner;
  address public _handlerAddress;

  event Fund(address indexed addr, uint256 amount);
  event Withdraw(address indexed addr, uint256 amount);
  event BridgeExit(address indexed addr, uint256 amount);

  modifier onlyOwner() {
    require(msg.sender == _owner, 'Sender must be the owner.');
    _;
  }

  modifier onlyHandler() {
    require(msg.sender == _handlerAddress, 'Sender must be handler contract.');
    _;
  }

  /**
      @notice Initializes SXVault, assigns {msg.sender} as the owner (referenced by ownlyOwner),
      assigns {handlerAddress} used by ownlyHandler.
      @param handlerAddress Address of the ERC20SXHandler contract, permissioned to call bridgeExit().
  */
  constructor(address handlerAddress) {
    _owner = msg.sender;
    _handlerAddress = handlerAddress;
  }

  /**
      @notice Assigns {handlerAddress} used by ownlyHandler.
      @param handlerAddress Address of the ERC20SXHandler contract, permissioned to call bridgeExit().
  */
  function setHandler(address handlerAddress) external {
    _handlerAddress = handlerAddress;
  }

  receive() external payable {
    fund();
  }

  /**
      @notice Fund the contract with {msg.value} from {msg.sender}.
      @notice Emits {Fund} event.
  */
  function fund() public payable {
    emit Fund(msg.sender, msg.value);
  }

  /**
      @notice Withdraw {amount} from the contract.
      @notice Only callable by owner.
      @notice Emits {Withdraw} event.
  */
  function withdraw(uint256 amount) external onlyOwner {
    require(address(this).balance >= amount, 'Insufficient balance.');

    (bool success, ) = payable(msg.sender).call{ value: amount }('');
    require(success, 'Transfer failed.');

    emit Withdraw(msg.sender, amount);
  }

  /**
      @notice Sends the specified {recipient} native SX specified by {amount}.
      @notice Only callable by bridge handler.
      @notice Emits {BridgeExit} event.
  */
  function bridgeExit(address recipient, uint256 amount) external onlyHandler {
    require(address(this).balance >= amount, 'Insufficient balance.');

    (bool success, ) = payable(recipient).call{ value: amount }('');
    require(success, 'Transfer failed.');

    emit BridgeExit(recipient, amount);
  }
}
