// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IKaiascanRegistry {
    struct TokenInfo {
        string contractType;
        string name;
        string symbol;
        string icon;
        uint8 decimal;
        uint256 totalSupply;
        uint256 totalTransfers;
        string officialSite;
        uint256 burnAmount;
        uint256 totalBurns;
    }

    struct Block {
        uint256 number;
        bytes32 hash;
        uint256 timestamp;
        address miner;
        uint256 gasUsed;
        uint256 gasLimit;
    }

    struct Transaction {
        bytes32 hash;
        uint256 blockNumber;
        address from;
        address to;
        uint256 value;
        bytes data;
        uint256 gasPrice;
        bool status;
    }

    // Events
    event TokenRegistered(address tokenAddress, TokenInfo tokenInfo);
    event NFTRegistered(address nftAddress, uint256 tokenId, string metadata);
    event BlockRegistered(uint256 blockNumber, bytes32 blockHash);
    event TransactionRegistered(bytes32 txHash, uint256 blockNumber);

    // Token functions
    function registerToken(address tokenAddress, TokenInfo calldata info) external;
    function getTokenInfo(address tokenAddress) external view returns (TokenInfo memory);
    
    // NFT functions
    function registerNFT(address nftAddress, uint256 tokenId, string calldata metadata) external;
    function getNFTInfo(address nftAddress, uint256 tokenId) external view returns (string memory);
    
    // Block functions
    function registerBlock(Block calldata blockData) external;
    function getBlock(uint256 blockNumber) external view returns (Block memory);
    function getLatestBlock() external view returns (Block memory);
    
    // Transaction functions
    function registerTransaction(Transaction calldata txData) external;
    function getTransaction(bytes32 txHash) external view returns (Transaction memory);
    function getTransactionStatus(bytes32 txHash) external view returns (bool);
}

contract KaiascanRegistry is IKaiascanRegistry {
    // State variables
    mapping(address => TokenInfo) private tokens;
    mapping(address => mapping(uint256 => string)) private nfts;
    mapping(uint256 => Block) private blocks;
    mapping(bytes32 => Transaction) private transactions;
    uint256 private latestBlockNumber;
    
    // Access control
    address public owner;
    mapping(address => bool) public operators;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyOperator() {
        require(operators[msg.sender], "Only operator can call this function");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        operators[msg.sender] = true;
    }
    
    // Admin functions
    function addOperator(address operator) external onlyOwner {
        operators[operator] = true;
    }
    
    function removeOperator(address operator) external onlyOwner {
        operators[operator] = false;
    }
    
    // Implementation of IKaiascanRegistry functions
    function registerToken(address tokenAddress, TokenInfo calldata info) external override onlyOperator {
        tokens[tokenAddress] = info;
        emit TokenRegistered(tokenAddress, info);
    }
    
    function getTokenInfo(address tokenAddress) external view override returns (TokenInfo memory) {
        return tokens[tokenAddress];
    }
    
    function registerNFT(address nftAddress, uint256 tokenId, string calldata metadata) external override onlyOperator {
        nfts[nftAddress][tokenId] = metadata;
        emit NFTRegistered(nftAddress, tokenId, metadata);
    }
    
    function getNFTInfo(address nftAddress, uint256 tokenId) external view override returns (string memory) {
        return nfts[nftAddress][tokenId];
    }
    
    function registerBlock(Block calldata blockData) external override onlyOperator {
        blocks[blockData.number] = blockData;
        if (blockData.number > latestBlockNumber) {
            latestBlockNumber = blockData.number;
        }
        emit BlockRegistered(blockData.number, blockData.hash);
    }
    
    function getBlock(uint256 blockNumber) external view override returns (Block memory) {
        return blocks[blockNumber];
    }
    
    function getLatestBlock() external view override returns (Block memory) {
        return blocks[latestBlockNumber];
    }
    
    function registerTransaction(Transaction calldata txData) external override onlyOperator {
        transactions[txData.hash] = txData;
        emit TransactionRegistered(txData.hash, txData.blockNumber);
    }
    
    function getTransaction(bytes32 txHash) external view override returns (Transaction memory) {
        return transactions[txHash];
    }
    
    function getTransactionStatus(bytes32 txHash) external view override returns (bool) {
        return transactions[txHash].status;
    }
}

// Helper contract for interacting with the registry
contract KaiascanClient {
    IKaiascanRegistry public registry;
    
    constructor(address registryAddress) {
        registry = IKaiascanRegistry(registryAddress);
    }
    
    function getFungibleToken(address tokenAddress) external view returns (IKaiascanRegistry.TokenInfo memory) {
        return registry.getTokenInfo(tokenAddress);
    }
    
    function getNftItem(address nftAddress, uint256 tokenId) external view returns (string memory) {
        return registry.getNFTInfo(nftAddress, tokenId);
    }
    
    function getLatestBlock() external view returns (IKaiascanRegistry.Block memory) {
        return registry.getLatestBlock();
    }
    
    function getBlock(uint256 blockNumber) external view returns (IKaiascanRegistry.Block memory) {
        return registry.getBlock(blockNumber);
    }
    
    function getTransaction(bytes32 txHash) external view returns (IKaiascanRegistry.Transaction memory) {
        return registry.getTransaction(txHash);
    }
    
    function getTransactionStatus(bytes32 txHash) external view returns (bool) {
        return registry.getTransactionStatus(txHash);
    }
}