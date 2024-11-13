# Kaiascan SDK TypeScript

A TypeScript library that provides a convenient interface for interacting with the Kaiascan API. This SDK allows you to fetch various blockchain data, including token information, NFT details, contract creation code, and more.

## Features

- Fetch fungible token information by contract address
- Fetch NFT item details by contract address and token ID
- Get contract creation code by contract address
- Retrieve blockchain data:
  - Latest block
  - Specific block by number
  - All blocks
  - Block transactions
- Check transaction receipt status
- Fetch transaction details by hash
- Retrieve contract source code

## Installation

```bash
npm install kaiascan-sdk
```

## Usage

### Initialize SDK

```typescript
import { KaiascanSDK } from 'kaiascan-sdk';

const sdk = new KaiascanSDK();
```

### Fetch Fungible Token Information

```typescript
const tokenAddress = '0x...';
sdk.getFungibleToken(tokenAddress)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

The response data includes:
- `contractType`: Contract type (e.g., "ERC20")
- `name`: Token name
- `symbol`: Token symbol
- `icon`: Token icon URL
- `decimal`: Token decimal places
- `totalSupply`: Total token supply
- `totalTransfers`: Total number of transfers
- `officialSite`: Official website URL
- `burnAmount`: Total amount of burned tokens
- `totalBurns`: Total number of token burns

### Fetch NFT Item Details

```typescript
const nftAddress = '0x...';
const tokenId = '1234';
sdk.getNftItem(nftAddress, tokenId)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

## API Reference

All methods return `Promise<ApiResponse<T>>`, where `T` is the type of the returned data.

### Token Methods
- `getFungibleToken(tokenAddress: Address)`: Get fungible token information
- `getNftItem(nftAddress: Address, tokenId: string)`: Get NFT item details

### Block Methods
- `getLatestBlock()`: Get the latest block
- `getBlock(blockNumber: number)`: Get block by number
- `getBlocks()`: Get all blocks
- `getTransactionsOfBlock(blockNumber: number)`: Get block transactions

### Transaction Methods
- `getTransactionReceiptStatus(transactionHash: string)`: Check transaction receipt status
- `getTransaction(transactionHash: string)`: Get transaction details

### Contract Methods
- `getContractCreationCode(contractAddress: Address)`: Get contract creation code
- `getContractSourceCode(contractAddress: Address)`: Get contract source code

## Error Handling

The SDK throws errors for both HTTP and API-specific errors:

```typescript
sdk.getFungibleToken(tokenAddress)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
```

Error types:
- HTTP errors: `"HTTP error! status: [status_code]"`
- API errors: `"API error! code: [code], message: [message]"`

