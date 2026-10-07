export interface ContractConfig {
  chainId: number;
  chainName: string;
  rpcUrl: string;
  currencySymbol: string;
  blockExplorerUrl: string;
  contracts: {
    // Binance-Peg BSC-USD (USDT BEP-20) on BSC Testnet
    usdtToken: string;
    // Official ERC-4337 v0.6 EntryPoint
    entryPoint: string;
    // ReceiptSplit Settlement & Reputation Smart Contract
    receiptSplitSettlement: string;
    // ReceiptSplit ERC-4337 Zero-Gas Paymaster Vault
    paymasterVault: string;
  };
}

export const BSC_TESTNET_CONFIG: ContractConfig = {
  chainId: 97,
  chainName: "BNB Smart Chain Testnet (Chapel)",
  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  currencySymbol: "tBNB",
  blockExplorerUrl: "https://testnet.bscscan.com",
  contracts: {
    // Official Binance-Peg USDT contract on BSC Testnet (BEP-20)
    usdtToken: "0x337610d27c682E347C9cD608137943050B300684",
    // Standard ERC-4337 v0.6 EntryPoint
    entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    // ReceiptSplit On-Chain Settlement Smart Contract on BSC Testnet
    receiptSplitSettlement: "0x33de6Adf9Ce0f4Ae96fB03e1AB6D16577c89A47F",
    // ReceiptSplit Paymaster Contract on BSC Testnet
    paymasterVault: "0x7B9C4961858546b5a79664e16ffc0Ac6403d6dC0",
  },
};

export function getBscScanTxUrl(txHash: string): string {
  return `${BSC_TESTNET_CONFIG.blockExplorerUrl}/tx/${txHash}`;
}

export function getBscScanAddressUrl(address: string): string {
  return `${BSC_TESTNET_CONFIG.blockExplorerUrl}/address/${address}`;
}

export function getBscScanTokenUrl(tokenAddress: string = BSC_TESTNET_CONFIG.contracts.usdtToken): string {
  return `${BSC_TESTNET_CONFIG.blockExplorerUrl}/token/${tokenAddress}`;
}
