class ChainConfig {
    // The ChainInfo class is used to provide the base URLs and chain IDs for both mainnet and testnet.
    // It is initialized with the mainnet and testnet URLs and chain IDs.

    public getBaseMainnet() {
        const ChainInfo = {
            "mainnet": "https://mainnet-oapi.kaiascan.io/",
            "chainIdMainnet": "8217"
        }

        return ChainInfo;
    }

    public getBaseTestnet() {
        const ChainInfo = {
            "testnet": "https://kairos-oapi.kaiascan.io/",
            "chainIdTestnet": "1001"
        }

        return ChainInfo;
    }
}

const chainConfig = new ChainConfig()

export { chainConfig };