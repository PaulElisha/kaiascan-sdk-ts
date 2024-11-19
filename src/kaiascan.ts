import axios from 'axios';

const BASE_URL_MAINNET = "https://mainnet-oapi.kaiascan.io/";
const BASE_URL_TESTNET = "https://kairos-oapi.kaiascan.io/";
const CHAIN_ID_MAINNET = "8217";
const CHAIN_ID_TESTNET = "1001";

const tokensEndpoint = "api/v1/tokens";
const nftsEndpoint = "api/v1/nfts";
const blocksEndpoint = "api/v1/blocks";
const transactionEndpoint = "api/v1/transactions";
const contractEndpoint = "api/v1/contracts";
const transactionReceiptsEndpoint = "api/v1/transaction-receipts";

type Address = string;

interface ApiResponse<T> {
    code: number;
    data: T;
    msg: string;
}

interface TokenInfo {
    contractType: string;
    name: string;
    symbol: string;
    icon: string;
    decimal: number;
    totalSupply: number;
    totalTransfers: number;
    officialSite: string;
    burnAmount: number;
    totalBurns: number;
}

class KaiascanSDK {
    public BASE_URL: string;
    public CHAIN_ID: string;

    constructor(isTestnet: boolean) {
        if (isTestnet) {
            this.BASE_URL = BASE_URL_TESTNET;
            this.CHAIN_ID = CHAIN_ID_TESTNET;
        } else {
            this.BASE_URL = BASE_URL_MAINNET;
            this.CHAIN_ID = CHAIN_ID_MAINNET;
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

    public async getFungibleToken(tokenAddress: Address): Promise<ApiResponse<TokenInfo>> {
        const urlStr = `${this.BASE_URL}${tokensEndpoint}?tokenAddress=${encodeURIComponent(tokenAddress)}`;
        return this.fetchApi<TokenInfo>(urlStr);
    }

    public async getNftItem(nftAddress: Address, tokenId: string): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${nftsEndpoint}?nftAddress=${encodeURIComponent(nftAddress)}&tokenId=${encodeURIComponent(tokenId)}`;
        return this.fetchApi<any>(urlStr);
    }

    public async getContractCreationCode(contractAddress: Address): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${contractEndpoint}/creation-code?contractAddress=${encodeURIComponent(contractAddress)}`;
        return this.fetchApi<any>(urlStr);
    }

    public async getLatestBlock(): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${blocksEndpoint}/latest`;
        return this.fetchApi<any>(urlStr);
    }

    public async getBlock(blockNumber: number): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${blocksEndpoint}?blockNumber=${blockNumber}`;
        return this.fetchApi<any>(urlStr);
    }

    public async getTransactionsOfBlock(blockNumber: number): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${blocksEndpoint}/${blockNumber}/transactions`;
        return this.fetchApi<any>(urlStr);
    }

    public async getTransaction(transactionHash: string): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${transactionEndpoint}/${encodeURIComponent(transactionHash)}`;
        return this.fetchApi<any>(urlStr);
    }

    public async getTransactionReceiptStatus(transactionHash: string): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${transactionReceiptsEndpoint}/status?transactionHash=${encodeURIComponent(transactionHash)}`;
        return this.fetchApi<any>(urlStr);
    }

    public async getContractSourceCode(contractAddress: Address): Promise<ApiResponse<any>> {
        const urlStr = `${this.BASE_URL}${contractEndpoint}/source-code?contractAddress=${encodeURIComponent(contractAddress)}`;
        return this.fetchApi<any>(urlStr);
    }
}

export default KaiascanSDK;