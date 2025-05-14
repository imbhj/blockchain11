// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BaseballNFT is ERC721 {
    // toString() 메서드 등 uint256타입을 Strings타입 변환하게 할 수 있는 메서드

    using Strings for uint256;
    address public owner;
    mapping(uint256 tokenId => bool) public minted;
    uint256 private totalSupply = 0;
    uint256[] private allTokenIds;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function minting(uint tokenId) public {
        require(msg.sender == owner, "Only Owner can mint");

        require(!minted[tokenId], "Already Minted!");  // minted, 이미 민팅이 된 tokenId에 대해 방지

        _mint(msg.sender, tokenId);
        minted[tokenId] = true;
        totalSupply += 1;

        allTokenIds.push(tokenId); // 모든 토큰 아이디를 담는 배열값이 필요
    }

    function purchase(uint256 tokenId) public payable {
        require(minted[tokenId], "Token does not exist");

        address currentOwner = ownerOf(tokenId);
        require(currentOwner != msg.sender, "You Already Own this token");

        require(getApproved(tokenId) == address(this) || isApprovedForAll(currentOwner, address(this)), "Contract not approved for transfer");
        require(msg.value == 1 ether, "Price is 1 ether");

        // 이더 전송
        payable(currentOwner).transfer(msg.value);

        // 컨트랙트가 대신 소유권 이전함
        // from, to, tokenId
        _transfer(currentOwner, msg.sender, tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        // ipfs://bafybeicdcy3wtpi7lt7gyogbmsedilui62efc7niuja7rbpl5nfmrm4fki/0.json

        return
            bytes(baseURI).length > 0
                ? string.concat(baseURI, tokenId.toString(), ".json")
                : "";
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "ipfs://bafybeicdcy3wtpi7lt7gyogbmsedilui62efc7niuja7rbpl5nfmrm4fki/";
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }

    function getAllTokenIds() public view returns (uint256[] memory) {
        return allTokenIds;
    }
}
