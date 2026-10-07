import React, { useState } from "react";
import { Wallet, ShieldCheck, Zap, X, Check, Copy, ExternalLink, PlusCircle, Sparkles, Layers } from "lucide-react";
import { SmartWalletInfo } from "../types";
import { truncateAddress } from "../utils/formatters";
import { BSC_TESTNET_CONFIG, getBscScanAddressUrl, getBscScanTokenUrl } from "../constants/contracts";
import { useLanguage } from "../i18n/LanguageContext";

interface SmartWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  smartWallet: SmartWalletInfo;
  onTopUpUsdt: (amount: number) => void;
  onSwitchWalletType: (type: "ERC-4337 Smart Account" | "EOA (MetaMask / Trust)") => void;
}

export const SmartWalletModal: React.FC<SmartWalletModalProps> = ({
  isOpen,
  onClose,
  smartWallet,
  onTopUpUsdt,
  onSwitchWalletType,
}) => {
  const { t } = useLanguage();
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(smartWallet.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 bg-slate-950/70">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
              <Wallet className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{t.walletModalTitle}</h3>
              <p className="text-xs text-slate-400">{t.walletModalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Wallet Type Switcher */}
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800">
            <button
              onClick={() => onSwitchWalletType("ERC-4337 Smart Account")}
              className={`rounded-lg py-2 text-xs font-semibold transition ${
                smartWallet.type === "ERC-4337 Smart Account"
                  ? "bg-amber-500 text-slate-950 shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {t.smartAccountGasless}
            </button>
            <button
              onClick={() => onSwitchWalletType("EOA (MetaMask / Trust)")}
              className={`rounded-lg py-2 text-xs font-semibold transition ${
                smartWallet.type === "EOA (MetaMask / Trust)"
                  ? "bg-amber-500 text-slate-950 shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {t.metamaskTrust}
            </button>
          </div>

          {/* Address Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400">{t.smartAccountAddressBsc}</span>
              <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                <ShieldCheck className="h-3 w-3" />
                {t.verified}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-amber-300 font-semibold">
                {truncateAddress(smartWallet.address, 8)}
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={getBscScanAddressUrl(smartWallet.address)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs text-amber-400 hover:underline"
                  title="View on BscScan Testnet"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>BscScan</span>
                </a>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 transition"
                >
                  {copiedAddress ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedAddress ? t.tersalin : t.salin}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <span className="text-[11px] text-slate-400 block">{t.saldoUsdt}</span>
              <span className="font-mono text-lg font-bold text-slate-100 block mt-0.5">
                {smartWallet.usdtBalance.toFixed(2)} USDT
              </span>
              <button
                onClick={() => onTopUpUsdt(50)}
                className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:underline"
              >
                <PlusCircle className="h-3 w-3" />
                <span>{t.faucet50Usdt}</span>
              </button>
            </div>

            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3">
              <span className="text-[11px] text-emerald-300 block">{t.saldoTBnbGas}</span>
              <span className="font-mono text-lg font-bold text-emerald-400 block mt-0.5">
                {smartWallet.bnbBalance.toFixed(4)} tBNB
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">
                {t.gasPaidByPaymaster}
              </span>
            </div>
          </div>

          {/* BSC Testnet Contracts Directory */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Layers className="h-3.5 w-3.5" />
                <span>{t.smartContractsDirectory}</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">{t.chapelTestnet}</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">USDT (BEP-20):</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] text-slate-200">
                    {truncateAddress(BSC_TESTNET_CONFIG.contracts.usdtToken, 6)}
                  </span>
                  <a
                    href={getBscScanTokenUrl(BSC_TESTNET_CONFIG.contracts.usdtToken)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:text-amber-300"
                    title="Open on BscScan Testnet"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">ReceiptSplit Settlement:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] text-slate-200">
                    {truncateAddress(BSC_TESTNET_CONFIG.contracts.receiptSplitSettlement, 6)}
                  </span>
                  <a
                    href={getBscScanAddressUrl(BSC_TESTNET_CONFIG.contracts.receiptSplitSettlement)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:text-amber-300"
                    title="Open on BscScan Testnet"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Paymaster Vault:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] text-slate-200">
                    {truncateAddress(BSC_TESTNET_CONFIG.contracts.paymasterVault, 6)}
                  </span>
                  <a
                    href={getBscScanAddressUrl(BSC_TESTNET_CONFIG.contracts.paymasterVault)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:text-amber-300"
                    title="Open on BscScan Testnet"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">EntryPoint ERC-4337:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] text-slate-200">
                    {truncateAddress(BSC_TESTNET_CONFIG.contracts.entryPoint, 6)}
                  </span>
                  <a
                    href={getBscScanAddressUrl(BSC_TESTNET_CONFIG.contracts.entryPoint)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 hover:text-amber-300"
                    title="Open on BscScan Testnet"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Paymaster Info */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5 space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <Zap className="h-3.5 w-3.5 fill-amber-300" />
              <span>{t.whyZeroGasImportant}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {t.whyZeroGasAnswer}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 bg-slate-950/80 px-5 py-3.5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
