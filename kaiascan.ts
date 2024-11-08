
export type Address = string;

export interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string;
}

export interface TokenInfo {
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

export interface BlockInfo {
  number: number;
  hash: string;
  timestamp: number;
  parentHash: string;
  miner: string;
  gasUsed: string;
  gasLimit: string;
  transactions: string[];
}

export interface TransactionInfo {
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  gasPrice: string;
  status: boolean;
  input: string;
}

export interface NFTInfo {
  tokenId: string;
  owner: string;
  metadata: Record<string, any>;
  contractAddress: string;
}

// config.ts
export const CONFIG = {
  BASE_URL: "https://mainnet-oapi.kaiascan.io/",
  CHAIN_ID: "8217",
  ENDPOINTS: {
    TOKENS: "api/v1/tokens",
    NFTS: "api/v1/nfts",
    BLOCKS: "api/v1/blocks",
    TRANSACTIONS: "api/v1/transactions",
    CONTRACTS: "api/v1/contracts",
  },
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
} as const;

// api-client.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: number,
    public response?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(
    baseUrl: string = CONFIG.BASE_URL,
    headers: Record<string, string> = CONFIG.DEFAULT_HEADERS
  ) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  private async fetch<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: this.headers,
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data: ApiResponse<T> = await response.json();

    if (data.code !== 0) {
      throw new ApiError(data.msg, undefined, data.code, data);
    }

    return data;
  }

  public setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  public setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  public setHeaders(headers: Record<string, string>): void {
    this.headers = headers;
  }

  public async getFungibleToken(
    tokenAddress: Address
  ): Promise<ApiResponse<TokenInfo>> {
    return this.fetch<TokenInfo>(CONFIG.ENDPOINTS.TOKENS, {
      tokenAddress,
    });
  }

  public async getNftItem(
    nftAddress: Address,
    tokenId: string
  ): Promise<ApiResponse<NFTInfo>> {
    return this.fetch<NFTInfo>(CONFIG.ENDPOINTS.NFTS, {
      nftAddress,
      tokenId,
    });
  }

  public async getContractCreationCode(
    contractAddress: Address
  ): Promise<ApiResponse<string>> {
    return this.fetch<string>(`${CONFIG.ENDPOINTS.CONTRACTS}/creation-code`, {
      contractAddress,
    });
  }

  public async getLatestBlock(): Promise<ApiResponse<BlockInfo>> {
    return this.fetch<BlockInfo>(`${CONFIG.ENDPOINTS.BLOCKS}/latest`);
  }

  public async getBlock(blockNumber: number): Promise<ApiResponse<BlockInfo>> {
    return this.fetch<BlockInfo>(CONFIG.ENDPOINTS.BLOCKS, {
      blockNumber: blockNumber.toString(),
    });
  }

  public async getBlocks(): Promise<ApiResponse<BlockInfo[]>> {
    return this.fetch<BlockInfo[]>(CONFIG.ENDPOINTS.BLOCKS);
  }

  public async getTransactionsOfBlock(
    blockNumber: number
  ): Promise<ApiResponse<TransactionInfo[]>> {
    return this.fetch<TransactionInfo[]>(
      `${CONFIG.ENDPOINTS.BLOCKS}/${blockNumber}/transactions`
    );
  }

  public async getTransactionReceiptStatus(
    transactionHash: string
  ): Promise<ApiResponse<boolean>> {
    return this.fetch<boolean>(`${CONFIG.ENDPOINTS.TRANSACTIONS}/status`, {
      transactionHash,
    });
  }

  public async getTransaction(
    transactionHash: string
  ): Promise<ApiResponse<TransactionInfo>> {
    return this.fetch<TransactionInfo>(
      `${CONFIG.ENDPOINTS.TRANSACTIONS}/${transactionHash}`
    );
  }

  public async getContractSourceCode(
    contractAddress: Address
  ): Promise<ApiResponse<string>> {
    return this.fetch<string>(`${CONFIG.ENDPOINTS.CONTRACTS}/source-code`, {
      contractAddress,
    });
  }
}

// index.ts
export class KaiascanSDK {
  private client: ApiClient;

  constructor(config?: {
    baseUrl?: string;
    headers?: Record<string, string>;
  }) {
    this.client = new ApiClient(
      config?.baseUrl || CONFIG.BASE_URL,
      config?.headers || CONFIG.DEFAULT_HEADERS
    );
  }

  public get api(): ApiClient {
    return this.client;
  }

  public setConfig(config: {
    baseUrl?: string;
    headers?: Record<string, string>;
  }): void {
    if (config.baseUrl) {
      this.client.setBaseUrl(config.baseUrl);
    }
    if (config.headers) {
      this.client.setHeaders(config.headers);
    }
  }
}

// Usage example
const exampleUsage = async () => {
  try {
    const sdk = new KaiascanSDK();
    
    // Get token info
    const tokenInfo = await sdk.api.getFungibleToken("0x1234...");
    console.log("Token Info:", tokenInfo);
    
    // Get latest block
    const latestBlock = await sdk.api.getLatestBlock();
    console.log("Latest Block:", latestBlock);
    
    // Get NFT item
    const nftInfo = await sdk.api.getNftItem("0x5678...", "1");
    console.log("NFT Info:", nftInfo);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("API Error:", error.message, error.code);
    } else {
      console.error("Unknown Error:", error);
    }
  }
};