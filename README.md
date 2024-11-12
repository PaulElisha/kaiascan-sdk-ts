## kaiascan_sdk_ts
The Kaiascan SDK is a TypeScript library that provides a convenient interface for interacting with the Kaiascan API. It allows you to fetch various blockchain data, such as token information, NFT details, contract creation code, and more.
Features

Fetch fungible token information by contract address
Fetch NFT item details by contract address and token ID
Get contract creation code by contract address
Retrieve the latest block, a specific block, and all blocks
Get transactions of a specific block
Check the status of a transaction receipt
Fetch a specific transaction by transaction hash
Retrieve contract source code by contract address

Usage
First, import the KaiascanSDK class and create a new instance:
import { KaiascanSDK } from 'kaiascan-sdk';

const sdk = new KaiascanSDK();
Fetch Fungible Token Information
To fetch information about a fungible token, use the getFungibleToken method:
typescriptCopyconst tokenAddress = '0x...';
sdk.getFungibleToken(tokenAddress)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
The response.data object will contain the following properties:

contractType: The type of the contract (e.g., "ERC20")
name: The name of the token
symbol: The symbol of the token
icon: The URL of the token's icon
decimal: The number of decimal places the token uses
totalSupply: The total supply of the token
totalTransfers: The total number of transfers for the token
officialSite: The official website of the token
burnAmount: The total amount of tokens that have been burned
totalBurns: The total number of token burns

Fetch NFT Item Details
To fetch details about an NFT item, use the getNftItem method:
const nftAddress = '0x...';
const tokenId = '1234';
sdk.getNftItem(nftAddress, tokenId)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
The response.data object will contain the details of the NFT item, but the structure may vary depending on the specific NFT contract.
Retrieve Other Blockchain Data
The Kaiascan SDK provides several other methods to fetch various blockchain data:

getContractCreationCode(contractAddress: Address): Retrieves the contract creation code by contract address.
getLatestBlock(): Fetches the latest block.
getBlock(blockNumber: number): Fetches a specific block by block number.
getBlocks(): Fetches all blocks.
getTransactionsOfBlock(blockNumber: number): Retrieves the transactions of a specific block.
getTransactionReceiptStatus(transactionHash: string): Checks the status of a transaction receipt.
getTransaction(transactionHash: string): Fetches a specific transaction by transaction hash.
getContractSourceCode(contractAddress: Address): Retrieves the contract source code by contract address.

You can refer to the API reference in the "API Reference" section for more details on how to use these methods.
Error Handling
The Kaiascan SDK throws errors for both HTTP and API-specific errors. You can handle these errors using the standard catch block:
sdk.getFungibleToken(tokenAddress)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
If an HTTP error occurs (e.g., the API returns a non-200 status code), the SDK will throw an Error with the message "HTTP error! status: [status_code]". If an API error occurs (e.g., the API returns a non-zero error code), the SDK will throw an Error with the message "API error! code: [code], message: [message]".
API Reference
The Kaiascan SDK provides the following methods:

getFungibleToken(tokenAddress: Address): Fetches fungible token information by contract address.
getNftItem(nftAddress: Address, tokenId: string): Fetches NFT item details by contract address and token ID.
getContractCreationCode(contractAddress: Address): Retrieves the contract creation code by contract address.
getLatestBlock(): Fetches the latest block.
getBlock(blockNumber: number): Fetches a specific block by block number.
getBlocks(): Fetches all blocks.
getTransactionsOfBlock(blockNumber: number): Retrieves the transactions of a specific block.
getTransactionReceiptStatus(transactionHash: string): Checks the status of a transaction receipt.
getTransaction(transactionHash: string): Fetches a specific transaction by transaction hash.
getContractSourceCode(contractAddress: Address): Retrieves the contract source code by contract address.

All methods return a Promise<ApiResponse<T>>, where T is the type of the data returned by the API.

