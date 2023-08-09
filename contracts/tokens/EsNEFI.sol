// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "../tokens/MintableBaseToken.sol";

contract EsNFI is MintableBaseToken {
    constructor() public MintableBaseToken("Escrowed NFI", "esNFI", 0) {
    }

    function id() external pure returns (string memory _name) {
        return "esNFI";
    }
}