// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/access/Ownable.sol";

contract PictureFactory is Ownable {
  
    event NewPicture(uint pictureId, string name, uint dna);

    uint dnaDigits = 64;
    uint dnaModulus = 10 ** dnaDigits;

    struct Picture {
        string name;
        uint dna;
    }

    Picture[] public pictures;

    function _createPicture(string memory _name, uint _dna) private {
        pictures.push(Picture(_name, _dna));
        uint id = pictures.length - 1;
        emit NewPicture(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomPicture(string memory _name) public payable {
        uint randDna = _generateRandomDna(_name);
        _createPicture(_name, randDna);
    }
}