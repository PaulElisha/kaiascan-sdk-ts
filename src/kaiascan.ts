import axios from 'axios';
import ChainInfo from './objects/chainInfo';
import Endpoints from './objects/endpoint';
import Address from './type/address';
import ApiResponse from './interfaces/ApiResponse';
import TokenInfo from './interfaces/TokenInfo';

class KaiascanSDK {
    public BASE_URL: string;
    public CHAIN_ID: string;

    constructor(isTestnet: boolean) {
        if (isTestnet) {
            this.BASE_URL = ChainInfo["BASE URL TESTNET"];
            this.CHAIN_ID = ChainInfo["CHAIN ID TESTNET"];
        } else {
            this.BASE_URL = ChainInfo["BASE URL MAINNET"];
            this.CHAIN_ID = ChainInfo["CHAIN ID MAINNET"];
        }
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

    public async getKaiaInfo(): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}api/v1/kaia`;
        return this.fetchApi<any>(urlStr);
    }

    public async getFungibleToken(tokenAddress: Address): Promise<ApiResponse<TokenInfo>> {
        const urlStr = `${this.BASE_URL}${Endpoints.tokensEndpoint}?tokenAddress=${encodeURIComponent(tokenAddress)}`;
        return this.fetchApi<TokenInfo>(urlStr);
    }

    public async getNftItem(nftAddress: Address, tokenId: string): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${Endpoints.nftsEndpoint}?nftAddress=${encodeURIComponent(nftAddress)}&tokenId=${encodeURIComponent(tokenId)}`;
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


}

export default KaiascanSDK;