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

export class KaiascanSDK {
    private readonly BASE_URL = "https://mainnet-oapi.kaiascan.io/";
    private readonly CHAIN_ID = "8217";
    private readonly tokensEndpoint = "api/v1/tokens";
    private readonly nftsEndpoint = "api/v1/nfts";

    private async fetchApi<T>(url: string): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.BASE_URL}${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apiResponse: ApiResponse<T> = await response.json();

            if (apiResponse.code !== 0) {
                throw new Error(`API error! code: ${apiResponse.code}, message: ${apiResponse.msg}`);
            }

            return apiResponse;
        } catch (error) {
            throw new Error(`Error making request to ${url}: ${error}`);
        }
    }

    public async getFungibleToken(tokenAddress: Address): Promise<ApiResponse<TokenInfo>> {
        const url = `${this.tokensEndpoint}?tokenAddress=${encodeURIComponent(tokenAddress)}`;
        return this.fetchApi<TokenInfo>(url);
    }

    public async getNftItem(nftAddress: Address, tokenId: string): Promise<ApiResponse<any>> {
        const url = `${this.nftsEndpoint}?nftAddress=${encodeURIComponent(nftAddress)}&tokenId=${encodeURIComponent(tokenId)}`;
        return this.fetchApi<any>(url);
    }

    public async getContractCreationCode(contractAddress: Address): Promise<ApiResponse<any>> {
        const url = `api/v1/contracts/creation-code?contractAddress=${encodeURIComponent(contractAddress)}`;
        return this.fetchApi<any>(url);
    }

    public async getLatestBlock(): Promise<ApiResponse<any>> {
        const url = `api/v1/blocks/latest`;
        return this.fetchApi<any>(url);
    }

    public async getBlock(blockNumber: number): Promise<ApiResponse<any>> {
        const url = `api/v1/blocks?blockNumber=${blockNumber}`;
        return this.fetchApi<any>(url);
    }

    public async getBlocks(): Promise<ApiResponse<any>> {
        const url = `api/v1/blocks`;
        return this.fetchApi<any>(url);
    }

    public async getTransactionsOfBlock(blockNumber: number): Promise<ApiResponse<any>> {
        const url = `api/v1/blocks/${blockNumber}/transactions`;
        return this.fetchApi<any>(url);
    }

    public async getTransactionReceiptStatus(transactionHash: string): Promise<ApiResponse<any>> {
        const url = `api/v1/transaction-receipts/status?transactionHash=${encodeURIComponent(transactionHash)}`;
        return this.fetchApi<any>(url);
    }

    public async getTransaction(transactionHash: string): Promise<ApiResponse<any>> {
        const url = `api/v1/transactions/${encodeURIComponent(transactionHash)}`;
        return this.fetchApi<any>(url);
    }

    public async getContractSourceCode(contractAddress: Address): Promise<ApiResponse<any>> {
        const url = `api/v1/contracts/source-code?contractAddress=${encodeURIComponent(contractAddress)}`;
        return this.fetchApi<any>(url);
    }
}
