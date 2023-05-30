// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "../tokens/MintableBaseToken.sol";

contract NEFI is MintableBaseToken {
    constructor() public MintableBaseToken("NEFI", "NEFI", 0) {
    }

    function id() external pure returns (string memory _name) {
        return "NEFI";
    }
}