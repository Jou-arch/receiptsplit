export function formatCurrency(amount: number, currency: string = "IDR"): string {
  if (currency === "IDR") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatUsdt(amount: number): string {
  return `${amount.toFixed(2)} USDT`;
}

export function truncateAddress(address: string, chars: number = 4): string {
  if (!address) return "";
  if (address.length <= chars * 2 + 2) return address;
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

export function generateTelegramShareMessage(bill: any, lang: "en" | "id" = "en"): string {
  const isEn = lang === "en";
  const lines: string[] = [];
  lines.push(`🧾 *ReceiptSplit Bill Breakdown*`);
  lines.push(`📍 *${bill.merchantName}* (${bill.date})`);
  lines.push(`💵 Total: ${formatCurrency(bill.grandTotal, bill.currency)} (~${(bill.grandTotal / bill.exchangeRate).toFixed(2)} USDT)`);
  lines.push(`⛓️ Network: *BSC Testnet (Chain ID 97 - Zero-Gas ERC-4337)*`);
  lines.push(`📄 Contract: *0x33de6Adf9Ce0f4Ae96fB03e1AB6D16577c89A47F*`);
  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);

  bill.participants.forEach((p: any) => {
    const statusIcon = p.isPaid ? (isEn ? "✅ PAID" : "✅ LUNAS") : (isEn ? "⏳ UNPAID" : "⏳ BELUM");
    lines.push(`${statusIcon} *${p.name}*: ${formatCurrency(p.totalFiat, bill.currency)} (*${p.totalUsdt.toFixed(2)} USDT*)`);
    if (p.badge) {
      lines.push(`   └ 🎖️ ${p.badge}`);
    }
  });

  lines.push(`━━━━━━━━━━━━━━━━━━━━━`);
  lines.push(`💳 Host: ${bill.payerName} (${truncateAddress(bill.payerAddress)})`);
  lines.push(isEn ? `⚡ Pay gas-free with USDT on BSC Testnet via ReceiptSplit` : `⚡ Bayar bebas gas fee dengan USDT di BSC Testnet via ReceiptSplit`);
  return lines.join("\n");
}
