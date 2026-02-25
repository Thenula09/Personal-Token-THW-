// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ThenulaToken is ERC20 {
    // ටෝකන් නම: Thenula Token, සංකේතය: THW
    constructor() ERC20("Thenula Token", "THW") {
        // ටෝකන් ලක්ෂ 10ක් (1,000,000) ඔයාගේ Wallet එකට ලබා දීම
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
