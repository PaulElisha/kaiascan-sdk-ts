import KaiascanSDK from '../src/kaiascan';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('KaiascanSDK', () => {
    let sdk: KaiascanSDK;
    let mockAxios: MockAdapter;

    beforeAll(() => {
        sdk = new KaiascanSDK(false);
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    test('should fetch the latest block', async () => {
        const mockResponse = {
            code: 0,
            data: { blockNumber: 12345678 },
            msg: 'success'
        };

        mockAxios.onGet(`${sdk.BASE_URL}api/v1/blocks/latest`).reply(200, mockResponse);

        const response = await sdk.getLatestBlock();
        expect(response).toEqual(mockResponse);
    });

    test('should fetch a block by block number', async () => {
        const blockNumber = 100;
        const mockResponse = {
            code: 0,
            data: { blockNumber: 100, transactions: [] },
            msg: 'success'
        };

        mockAxios.onGet(`${sdk.BASE_URL}api/v1/blocks?blockNumber=${blockNumber}`).reply(200, mockResponse);

        const response = await sdk.getBlock(blockNumber);
        expect(response).toEqual(mockResponse);
    });

    test('should fetch a transaction by hash', async () => {
        const transactionHash = '0xSampleTransactionHash';
        const mockResponse = {
            code: 0,
            data: { hash: transactionHash, status: 'confirmed' },
            msg: 'success'
        };

        mockAxios.onGet(`${sdk.BASE_URL}api/v1/transactions/${transactionHash}`).reply(200, mockResponse);

        const response = await sdk.getTransaction(transactionHash);
        expect(response).toEqual(mockResponse);
    });

    test('should fetch fungible token info', async () => {
        const tokenAddress = '0x12345abcde';
        const mockResponse = {
            code: 0,
            data: {
                contractType: 'ERC20',
                name: 'Mock Token',
                symbol: 'MTK',
                icon: 'https://example.com/icon.png',
                decimal: 18,
                totalSupply: 1000000,
                totalTransfers: 500,
                officialSite: 'https://example.com',
                burnAmount: 100,
                totalBurns: 5
            },
            msg: 'success'
        };

        mockAxios.onGet(`${sdk.BASE_URL}api/v1/tokens?tokenAddress=${encodeURIComponent(tokenAddress)}`).reply(200, mockResponse);

        const response = await sdk.getFungibleToken(tokenAddress);
        expect(response).toEqual(mockResponse);
    });

});