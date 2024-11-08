# Kaiascan TypeScript SDK

The Kaiascan TypeScript SDK is a client library for interacting with the Kaiascan API, which provides access to various blockchain data and analytics.

## Features

- Typed API responses for easy data handling
- Promise-based asynchronous API calls
- Configurable API client with support for custom base URLs and headers
- Comprehensive error handling with custom error types
- Utility functions for common blockchain data retrieval

## Installation

You can install the Kaiascan TypeScript SDK using npm or yarn:

```
npm install @kaiascan/sdk
```

or

```
yarn add @kaiascan/sdk
```

## Usage

### Importing the SDK

```typescript
import { KaiascanSDK } from '@kaiascan/sdk';
```

### Initializing the SDK

```typescript
// Using default configuration
const sdk = new KaiascanSDK();

// With custom configuration
const sdk = new KaiascanSDK({
  baseUrl: 'https://custom-api.kaiascan.io',
  headers: {
    'Authorization': 'Bearer token',
  },
});
```

### Retrieving Blockchain Data

```typescript
// Get token information
const tokenInfo = await sdk.api.getFungibleToken('0x1234...');
console.log(tokenInfo);

// Get latest block
const latestBlock = await sdk.api.getLatestBlock();
console.log(latestBlock);

// Get NFT item
const nftInfo = await sdk.api.getNftItem('0x5678...', '1');
console.log(nftInfo);

// Get contract creation code
const creationCode = await sdk.api.getContractCreationCode('0x9012...');
console.log(creationCode);
```

### Error Handling

The SDK throws custom `ApiError` instances for any failed API requests. You can catch and handle these errors as follows:

```typescript
try {
  const block = await sdk.api.getBlock(12345);
} catch (error) {
  if (error instanceof ApiError) {
    console.error('API Error:', error.code, error.message);
  } else {
    console.error('Unknown Error:', error);
  }
}
```

### Advanced Configuration

You can update the API client configuration at any time using the `setConfig` method:

```typescript
sdk.setConfig({
  baseUrl: 'https://new-api.kaiascan.io',
  headers: {
    'Authorization': 'Bearer new-token',
  },
});
```

## API Reference

The Kaiascan TypeScript SDK provides the following methods:

| Method | Description |
| --- | --- |
| `getFungibleToken(tokenAddress: Address)` | Retrieves information about a fungible token. |
| `getNftItem(nftAddress: Address, tokenId: string)` | Retrieves information about a non-fungible token (NFT). |
| `getContractCreationCode(contractAddress: Address)` | Retrieves the creation code of a contract. |
| `getLatestBlock()` | Retrieves the latest block. |
| `getBlock(blockNumber: number)` | Retrieves a block by its number. |
| `getBlocks()` | Retrieves a list of all blocks. |
| `getTransactionsOfBlock(blockNumber: number)` | Retrieves the transactions of a specific block. |
| `getTransactionReceiptStatus(transactionHash: string)` | Retrieves the status of a transaction. |
| `getTransaction(transactionHash: string)` | Retrieves information about a specific transaction. |
| `getContractSourceCode(contractAddress: Address)` | Retrieves the source code of a contract. |

