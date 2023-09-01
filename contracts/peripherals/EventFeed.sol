// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

contract EventFeed {

    uint public lastPrice;
    uint public lastUpdate;

    address public gov;

    modifier onlyGov() {
        require(msg.sender == gov, "EventFeed: invalid handler");
        _;
    }

    constructor(address _gov) public {
        gov = _gov;
    }

    event PriceUpdate(uint indexed price, uint indexed time);

    function emitPriceEvent(uint _price) external onlyGov() {
        lastPrice = _price;
        lastUpdate = block.timestamp;

        emit PriceUpdate(_price, block.timestamp);
    }

    function setGov(address _newGov) external onlyGov() {
        gov = _newGov;
    }
}