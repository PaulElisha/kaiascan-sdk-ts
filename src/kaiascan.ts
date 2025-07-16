import axios from 'axios';

import { chainConfig } from './config/Chainconfig';
import { Endpoints } from './config/Endpoint';
import { TokenInfo } from './interfaces/TokenInfo';

import Address from './type/address';
import ApiResponse from './interfaces/ApiResponse';
class KaiaScanSDK {
    public BASE_URL: string;
    public CHAIN_ID: string;

    constructor(networkId: string) {
        const { mainnet, chainIdMainnet } = chainConfig.getBaseMainnet();
        const { testnet, chainIdTestnet } = chainConfig.getBaseTestnet();

        this.BASE_URL = networkId === chainIdMainnet
            ? mainnet || process.env.MAINNET_URL || ""
            : testnet || process.env.TESTNET_URL || "";

        this.CHAIN_ID = networkId === chainIdMainnet
            ? chainIdMainnet || "8217"
            : chainIdTestnet || "1001";

    }

    private async fetchApi<T>(urlStr: string): Promise<ApiResponse<T>> {
        try {
            const response = await axios.get<ApiResponse<T>>(urlStr, {
                headers: {
                    'Authorization': `Bearer ${process.env.API_KEY}`,
                    'Content-Type': 'application/json',
                },
            });

            const apiResponse = response.data;

            if (apiResponse.code !== 0) {
                throw new Error(`API error! code: ${apiResponse.code}, message: ${apiResponse.msg}`);
            }

            return apiResponse;
        } catch (error) {
            throw new Error(`Error making request to ${urlStr}: ${error}`);
        }
    }

    public async getAccountKeyHistories(
        accountAddress: string,
        page: number = 1,
        size: number = 20
    ): Promise<ApiResponse<any>> {
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];

        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);

        const urlStr = `${this.BASE_URL}api/v1/accounts/${encodeURIComponent(accountAddress)}/key-histories?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getAccountInfo(
        accountAddress: string
    ): Promise<ApiResponse<any>> {
        if (!accountAddress) {
            throw new Error("Account address is required");
        }

        const urlStr = `${this.BASE_URL}api/v1/accounts/${accountAddress}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getAccountTokenTransfers(
        accountAddress: string,
        page: number = 1,
        size: number = 20,
        contractAddress?: string,
        blockNumberStart?: number,
        blockNumberEnd?: number
    ): Promise<ApiResponse<any>> {
        if (!accountAddress) {
            throw new Error("Account address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);
        if (contractAddress) queryParams.push(`contractAddress=${contractAddress}`);
        if (blockNumberStart) queryParams.push(`blockNumberStart=${blockNumberStart}`);
        if (blockNumberEnd) queryParams.push(`blockNumberEnd=${blockNumberEnd}`);

        const urlStr = `${this.BASE_URL}api/v1/accounts/${accountAddress}/token-transfers?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getAccountEventLogs(
        accountAddress: string,
        page: number = 1,
        size: number = 20,
        signature?: string,
        blockNumberStart?: number,
        blockNumberEnd?: number
    ): Promise<ApiResponse<any>> {
        if (!accountAddress) {
            throw new Error("Account address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);
        if (signature) queryParams.push(`signature=${signature}`);
        if (blockNumberStart) queryParams.push(`blockNumberStart=${blockNumberStart}`);
        if (blockNumberEnd) queryParams.push(`blockNumberEnd=${blockNumberEnd}`);

        const urlStr = `${this.BASE_URL}api/v1/accounts/${accountAddress}/event-logs?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getAccountKIP17NftBalances(
        accountAddress: string,
        page: number = 1,
        size: number = 20
    ): Promise<ApiResponse<any>> {
        if (!accountAddress) {
            throw new Error("Account address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);

        const urlStr = `${this.BASE_URL}api/v1/accounts/${accountAddress}/nft-balances/kip17?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getAccountKIP37NftBalances(
        accountAddress: string,
        page: number = 1,
        size: number = 20
    ): Promise<ApiResponse<any>> {
        if (!accountAddress) {
            throw new Error("Account address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);

        const urlStr = `${this.BASE_URL}api/v1/accounts/${accountAddress}/nft-balances/kip37?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getAccountNftTransfers(
        accountAddress: string,
        page: number = 1,
        size: number = 20,
        contractAddress?: string,
        blockNumberStart?: number,
        blockNumberEnd?: number
    ): Promise<ApiResponse<any>> {
        if (!accountAddress) {
            throw new Error("Account address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);
        if (contractAddress) queryParams.push(`contractAddress=${contractAddress}`);
        if (blockNumberStart) queryParams.push(`blockNumberStart=${blockNumberStart}`);
        if (blockNumberEnd) queryParams.push(`blockNumberEnd=${blockNumberEnd}`);

        const urlStr = `${this.BASE_URL}api/v1/accounts/${accountAddress}/nft-transfers?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getAccountTokenBalances(
        accountAddress: string,
        page: number = 1,
        size: number = 20
    ): Promise<ApiResponse<any>> {
        if (!accountAddress) {
            throw new Error("Account address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);

        const urlStr = `${this.BASE_URL}api/v1/accounts/${accountAddress}/token-balances?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getAccountTokenDetails(
        accountAddress: string,
        page: number = 1,
        size: number = 20
    ): Promise<ApiResponse<any>> {
        if (!accountAddress) {
            throw new Error("Account address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);

        const urlStr = `${this.BASE_URL}api/v1/accounts/${accountAddress}/token-details?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getAccountTransactions(
        accountAddress: string,
        page: number = 1,
        size: number = 20,
        blockNumberStart?: number,
        blockNumberEnd?: number,
        type?: string,
        directions?: string[]
    ): Promise<ApiResponse<any>> {
        if (!accountAddress) {
            throw new Error("Account address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);

        if (blockNumberStart) queryParams.push(`blockNumberStart=${blockNumberStart}`);
        if (blockNumberEnd) queryParams.push(`blockNumberEnd=${blockNumberEnd}`);
        if (type) queryParams.push(`type=${type}`);
        if (directions) queryParams.push(`directions=${directions.join(',')}`);

        const urlStr = `${this.BASE_URL}api/v1/accounts/${accountAddress}/transactions?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getFeePaidTransactions(
        accountAddress: string,
        page: number = 1,
        size: number = 20,
        blockNumberStart?: number,
        blockNumberEnd?: number,
        type?: string
    ): Promise<ApiResponse<any>> {
        if (!accountAddress) {
            throw new Error("Account address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);

        if (blockNumberStart) queryParams.push(`blockNumberStart=${blockNumberStart}`);
        if (blockNumberEnd) queryParams.push(`blockNumberEnd=${blockNumberEnd}`);
        if (type) queryParams.push(`type=${type}`);

        const urlStr = `${this.BASE_URL}api/v1/accounts/${accountAddress}/fee-paid-transactions?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getKaiaInfo(): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}api/v1/kaia`;
        return this.fetchApi<any>(urlStr);
    }

    public async getFungibleToken(tokenAddress: Address): Promise<ApiResponse<TokenInfo>> {
        const urlStr = `${this.BASE_URL}${Endpoints.tokensEndpoint}?tokenAddress=${encodeURIComponent(tokenAddress)}`;
        return this.fetchApi<TokenInfo>(urlStr);
    }

    public async getTokenHolders(
        tokenAddress: string,
        page: number = 1,
        size: number = 20,
        holderAddress?: string
    ): Promise<ApiResponse<any>> {
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);
        if (holderAddress) {
            queryParams.push(`holderAddress=${holderAddress}`);
        }

        const urlStr = `${this.BASE_URL}api/v1/tokens/${tokenAddress}/holders?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getTokenBurns(
        tokenAddress: string,
        page: number = 1,
        size: number = 20,
        blockNumberStart?: number,
        blockNumberEnd?: number
    ): Promise<ApiResponse<any>> {
        if (!tokenAddress) {
            throw new Error("Token address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);
        if (blockNumberStart) queryParams.push(`blockNumberStart=${blockNumberStart}`);
        if (blockNumberEnd) queryParams.push(`blockNumberEnd=${blockNumberEnd}`);

        const urlStr = `${this.BASE_URL}api/v1/tokens/${tokenAddress}/burns?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getTokenTransfers(
        tokenAddress: string,
        page: number = 1,
        size: number = 20,
        blockNumberStart?: number,
        blockNumberEnd?: number
    ): Promise<ApiResponse<any>> {
        if (!tokenAddress) {
            throw new Error("Token address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);
        if (blockNumberStart) queryParams.push(`blockNumberStart=${blockNumberStart}`);
        if (blockNumberEnd) queryParams.push(`blockNumberEnd=${blockNumberEnd}`);

        const urlStr = `${this.BASE_URL}api/v1/tokens/${tokenAddress}/transfers?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getNftItem(nftAddress: Address, tokenId: string): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${Endpoints.nftsEndpoint}?nftAddress=${encodeURIComponent(nftAddress)}&tokenId=${encodeURIComponent(tokenId)}`;
        return this.fetchApi<any>(urlStr);
    }

    public async getNft(
        tokenAddress: string
    ): Promise<ApiResponse<any>> {
        if (!tokenAddress) {
            throw new Error("Token address is required");
        }

        const urlStr = `${this.BASE_URL}api/v1/nfts/${tokenAddress}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getNftTransfers(
        tokenAddress: string,
        page: number = 1,
        size: number = 20,
        tokenId?: string,
        blockNumberStart?: number,
        blockNumberEnd?: number
    ): Promise<ApiResponse<any>> {
        if (!tokenAddress) {
            throw new Error("Token address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);
        if (tokenId) queryParams.push(`tokenId=${tokenId}`);
        if (blockNumberStart) queryParams.push(`blockNumberStart=${blockNumberStart}`);
        if (blockNumberEnd) queryParams.push(`blockNumberEnd=${blockNumberEnd}`);

        const urlStr = `${this.BASE_URL}api/v1/nfts/${tokenAddress}/transfers?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getNftHolders(
        tokenAddress: string,
        page: number = 1,
        size: number = 20,
        tokenId?: string
    ): Promise<ApiResponse<any>> {
        if (!tokenAddress) {
            throw new Error("Token address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);
        if (tokenId) queryParams.push(`tokenId=${tokenId}`);

        const urlStr = `${this.BASE_URL}api/v1/nfts/${tokenAddress}/holders?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getNftInventories(
        tokenAddress: string,
        page: number = 1,
        size: number = 20,
        keyword?: string
    ): Promise<ApiResponse<any>> {
        if (!tokenAddress) {
            throw new Error("Token address is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);
        if (keyword) queryParams.push(`keyword=${keyword}`);

        const urlStr = `${this.BASE_URL}api/v1/nfts/${tokenAddress}/inventories?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }


    public async getContractCreationCode(contractAddress: Address): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${Endpoints.contractEndpoint}/creation-code?contractAddress=${encodeURIComponent(contractAddress)}`;
        return this.fetchApi<any>(urlStr);
    }

    public async getContractSourceCode(contractAddress: Address): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${Endpoints.contractEndpoint}/source-code?contractAddress=${encodeURIComponent(contractAddress)}`;
        return this.fetchApi<any>(urlStr);
    }

    public async getContractInfo(
        contractAddress: string
    ): Promise<ApiResponse<any>> {
        if (!contractAddress) {
            throw new Error("Contract address is required");
        }

        const urlStr = `${this.BASE_URL}api/v1/contracts/${contractAddress}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getContractsInfo(
        contractAddresses: string[]
    ): Promise<ApiResponse<any>> {
        if (!contractAddresses || contractAddresses.length === 0) {
            throw new Error("Contract address list is required");
        }

        const queryParams = `contractAddresses=${contractAddresses.join(',')}`;
        const urlStr = `${this.BASE_URL}api/v1/contracts?${queryParams}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getContractAbi(
        contractAddress: string
    ): Promise<ApiResponse<any>> {
        if (!contractAddress) {
            throw new Error("Contract address is required");
        }

        const urlStr = `${this.BASE_URL}api/v1/contracts/${contractAddress}/abi`;

        return this.fetchApi<any>(urlStr);
    }

    public async getLatestBlock(): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${Endpoints.blocksEndpoint}/latest`;
        return this.fetchApi<any>(urlStr);
    }

    public async getLatestBlockBurns(
        page: number = 1,
        size: number = 20
    ): Promise<ApiResponse<any>> {
        if (page < 1) {
            throw new Error("Page must be greater than or equal to 1.");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000.");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);

        const urlStr = `${this.BASE_URL}api/v1/blocks/latest/burns?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getLatestBlockRewards(
        blockNumber: number
    ): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}api/v1/blocks/latest/rewards?blockNumber=${blockNumber}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getBlock(blockNumber: number): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${Endpoints.blocksEndpoint}?blockNumber=${blockNumber}`;
        return this.fetchApi<any>(urlStr);
    }

    public async getBlocks(
        blockNumber: number,
        blockNumberStart?: number,
        blockNumberEnd?: number,
        page: number = 1,
        size: number = 20
    ): Promise<ApiResponse<any>> {
        const queryParams: string[] = [];

        if (blockNumberStart !== undefined) {
            queryParams.push(`blockNumberStart=${blockNumberStart}`);
        }

        if (blockNumberEnd !== undefined) {
            queryParams.push(`blockNumberEnd=${blockNumberEnd}`);
        }

        if (page >= 1) {
            queryParams.push(`page=${page}`);
        }

        if (size >= 1 && size <= 2000) {
            queryParams.push(`size=${size}`);
        }

        const urlStr = `${this.BASE_URL}${Endpoints.blocksEndpoint}?blockNumber=${blockNumber}${queryParams.length > 0 ? '&' + queryParams.join('&') : ''}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getTransactionsOfBlock(
        blockNumber: number,
        type?: string,
        page: number = 1,
        size: number = 20
    ): Promise<ApiResponse<any>> {
        const queryParams: string[] = [];

        if (type) {
            queryParams.push(`type=${encodeURIComponent(type)}`);
        }

        if (page >= 1) {
            queryParams.push(`page=${page}`);
        }

        if (size >= 1 && size <= 2000) {
            queryParams.push(`size=${size}`);
        }

        const urlStr = `${this.BASE_URL}${Endpoints.blocksEndpoint}/${blockNumber}/transactions${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getBlockBurns(
        blockNumber: number
    ): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}api/v1/blocks/${blockNumber}/burns`;

        return this.fetchApi<any>(urlStr);
    }

    public async getBlockRewards(
        blockNumber: number
    ): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}api/v1/blocks/${blockNumber}/rewards`;

        return this.fetchApi<any>(urlStr);
    }

    public async getInternalTransactionsOfBlock(
        blockNumber: number,
        page: number = 1,
        size: number = 20
    ): Promise<ApiResponse<any>> {
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];

        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);

        const urlStr = `${this.BASE_URL}api/v1/blocks/${blockNumber}/internal-transactions?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getBlocksByTimestamp(
        timestamp: number
    ): Promise<ApiResponse<any>> {
        if (timestamp <= 0) {
            throw new Error("Timestamp must be a positive integer");
        }

        const urlStr = `${this.BASE_URL}api/v1/blocks/timestamps/${timestamp}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getTransaction(transactionHash: string): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${Endpoints.transactionEndpoint}/${encodeURIComponent(transactionHash)}`;
        return this.fetchApi<any>(urlStr);
    }

    public async getTransactionReceiptStatus(transactionHash: string): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${Endpoints.transactionReceiptsEndpoint}/status?transactionHash=${encodeURIComponent(transactionHash)}`;
        return this.fetchApi<any>(urlStr);
    }

    public async getTransactionStatus(
        transactionHash: string
    ): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}api/v1/transactions/${encodeURIComponent(transactionHash)}/status`;

        return this.fetchApi<any>(urlStr);
    }

    public async getTransactionInputData(
        transactionHash: string
    ): Promise<ApiResponse<any>> {
        if (!transactionHash) {
            throw new Error("Transaction hash is required");
        }

        const urlStr = `${this.BASE_URL}api/v1/transactions/${transactionHash}/input-data`;

        return this.fetchApi<any>(urlStr);
    }

    public async getTransactionEventLogs(
        transactionHash: string,
        page: number = 1,
        size: number = 20,
        signature?: string
    ): Promise<ApiResponse<any>> {
        if (!transactionHash) {
            throw new Error("Transaction hash is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);
        if (signature) queryParams.push(`signature=${signature}`);

        const urlStr = `${this.BASE_URL}api/v1/transactions/${transactionHash}/event-logs?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getTransactionInternalTransactions(
        transactionHash: string,
        page: number = 1,
        size: number = 20
    ): Promise<ApiResponse<any>> {
        if (!transactionHash) {
            throw new Error("Transaction hash is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);

        const urlStr = `${this.BASE_URL}api/v1/transactions/${transactionHash}/internal-transactions?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getTransactionTokenTransfers(
        transactionHash: string,
        page: number = 1,
        size: number = 20
    ): Promise<ApiResponse<any>> {
        if (!transactionHash) {
            throw new Error("Transaction hash is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);

        const urlStr = `${this.BASE_URL}api/v1/transactions/${transactionHash}/token-transfers?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }

    public async getTransactionNftTransfers(
        transactionHash: string,
        page: number = 1,
        size: number = 20
    ): Promise<ApiResponse<any>> {
        if (!transactionHash) {
            throw new Error("Transaction hash is required");
        }
        if (page < 1) {
            throw new Error("Page must be >= 1");
        }
        if (size < 1 || size > 2000) {
            throw new Error("Size must be between 1 and 2000");
        }

        const queryParams: string[] = [];
        queryParams.push(`page=${page}`);
        queryParams.push(`size=${size}`);

        const urlStr = `${this.BASE_URL}api/v1/transactions/${transactionHash}/nft-transfers?${queryParams.join('&')}`;

        return this.fetchApi<any>(urlStr);
    }


}

export default KaiaScanSDK;