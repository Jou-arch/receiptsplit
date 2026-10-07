export type Language = "en" | "id";

export const translations = {
  en: {
    // Navbar
    navSubtitle: "AI Bill Splitter • Firebase Backend • Zero-Gas AA on BSC Testnet (97)",
    historyBtn: "History",
    historyBtnTitle: "Open Receipt History from Cloud Firestore",
    telegramFrameOn: "Telegram Frame: ON",
    telegramFrameOff: "Telegram Frame",
    snapReceipt: "Snap Receipt",
    usdtZeroGas: "USDT • 0 tBNB Gas",
    firebaseUser: "Firebase User",
    cloudFirestoreActive: "Cloud Firestore Active",
    viewReceiptHistory: "View Receipt History",
    signOut: "Sign Out",
    googleSignIn: "Google Sign-In",
    signingIn: "Signing in...",
    googleSignInTitle: "Sign in with Google to save receipts to Cloud Firestore",

    // Hero Banner
    heroBadge1: "Hassle-Free Hangout Bill Splitting",
    heroBadge2: "Firebase Backend & Firestore",
    heroTitle: "Snap a Receipt, AI Splits Items, Friends Pay USDT With Zero Gas Fees.",
    heroDescription:
      "One person covers the cashier/QRIS upfront, AI (Gemini) itemizes who ordered what from receipt & group chat, safely saved in Cloud Firestore with Account Abstraction settlement on BSC Testnet (Chapel 97) (0 tBNB gas required).",
    snapNewReceiptAI: "Snap New Receipt (AI)",
    shareToGroup: "Share to Group",
    authPromptText:
      "Sign in with Google to automatically save receipts to Cloud Firestore and access them anytime.",
    signInWithGoogle: "Sign in with Google",

    // Bill Summary
    diningReceipt: "Dining / Receipt",
    firestoreSync: "Firestore Sync",
    saveToFirestore: "Save to Firestore",
    saving: "Saving...",
    savedToCloud: "Saved to Cloud",
    saveCloud: "Save Cloud",
    paidUpfrontBy: "Paid upfront by",
    copyHostWallet: "Copy host BNB Chain wallet address",
    viewProofOfSettlement: "View Proof of Settlement",
    viewProof: "View Proof",
    onChainSettlement: "On-Chain Settlement:",
    onChainStatus: "On-Chain Settlement Status:",
    settledOutOf: "{paid} of {total} Settled",
    subtotalMenu: "Items Subtotal",
    taxService: "PB1 Tax & Service",
    splitProportionally: "Split proportionally",
    exchangeRateRate: "USDT / IDR Rate",
    adjustRate: "Adjust Rate",
    grandTotalBill: "Grand Total Bill",
    itemBreakdown: "Item Breakdown ({count} Items)",
    hide: "Hide",
    show: "Show",
    reassignItemsAI: "Re-assign / AI Re-Assign",
    consumedBy: "Consumed by:",
    splitEquallyAll: "Split equally amongst all",

    // Participant Card
    menuPortion: "Menu: {item} + Tax/Serv: {tax}",
    settledOnChain: "SETTLED ON-CHAIN",
    unpaid: "UNPAID",
    totalShare: "Total Share",
    payCryptoUsdt: "Pay Crypto (USDT)",
    settleTime: "Settled at:",
    justNow: "Just now",
    txHashBscTestnet: "Tx Hash (BSC Testnet):",
    sponsoredPaymasterBadge:
      "Sponsored by ERC-4337 Paymaster (0 Gas Fee Paid by Friends)",
    payMyShareUsdt: "Pay my share with USDT",
    zeroBnbGas: "0 BNB Gas",
    instantQrPay: "Instant QR Pay",
    shareBill: "Share Bill",
    copied: "Copied!",
    copyReminderSuccess: "Bill reminder message copied!",
    reminderMessageTemplate:
      "Hi {name}! Your share for the bill on ReceiptSplit is {fiat} (~{usdt}).\nYou can pay crypto gas-free (0 BNB) on BNB Chain to host address: {address}",

    // Snap Modal
    snapAndParseReceiptAI: "Snap & Parse Receipt (AI)",
    snapModalSubtitle:
      "Gemini 3.8 Flash automatically parses receipts & group chat",
    popularPresets: "Popular Presets",
    uploadPhoto: "Upload Photo",
    liveCamera: "Live Camera",
    presetsInstruction:
      "Choose a realistic dining receipt sample for instant testing:",
    clickToUse: "Click to use",
    clickToUpload: "Click or drag to upload receipt photo",
    uploadFormats: "Supports JPG, PNG, or WEBP formats",
    cameraErrorMsg:
      "Camera access unavailable in iFrame / permission denied. Please use Upload Photo or Popular Presets above.",
    captureReceiptPhoto: "Capture Receipt Photo",
    receiptPhotoReady: "Receipt Photo Ready to Parse",
    successfullyLoaded: "Successfully loaded",
    changePhoto: "Change Photo",
    groupChatNotesLabel:
      "Group Chat Notes / Who Ordered What (Optional)",
    groupChatNotesDesc:
      "Paste WhatsApp / Telegram messages; AI will automatically assign items to each person:",
    groupChatNotesPlaceholder:
      "e.g. Alice ordered coffee and bagel, Bob ordered matcha, shared nachos together, split taxes evenly...",
    cancel: "Cancel",
    parseWithGeminiAI: "Parse with Gemini AI",
    geminiAiParsing: "Gemini AI Parsing...",

    // Item Assignment Modal
    itemAssignmentTitle: "Item Assignment & Who Ordered What",
    itemAssignmentSubtitle:
      "Check names or let AI auto-assign directly from chat messages",
    groupFriendsCount: "Group Friends ({count} People)",
    addFriend: "+ Add friend",
    aiQuickAutoAssign: "AI Quick Auto-Assign (Group Chat Parser)",
    aiQuickPlaceholder:
      "e.g. Alice had burger and tea, Bob had ramen, shared dim sum...",
    apply: "Apply",
    processing: "Processing...",
    selectWhoConsumed: "Select Who Consumed Each Item",
    portionsPerPerson: "Share: {count} people ({share}/person)",
    notSelected: "Not selected",
    saveAndRecalculate: "Save & Recalculate Shares",
    minParticipantAlert: "At least 1 participant is required.",

    // AA Paymaster Modal
    aaModalTitle: "ERC-4337 Account Abstraction",
    aaModalSubtitle:
      "Zero-Gas Paymaster Settlement on BSC Testnet (97)",
    payingShareFor: "Paying Share for:",
    activeGasSponsorship: "Active Gas Sponsorship: 0 tBNB Required",
    paymasterExplanation:
      "Friends don't need to worry about topping up tBNB for gas fees. This transaction is packaged into an ERC-4337 UserOperation and the ~0.00038 tBNB gas fee is sponsored directly by ReceiptSplit Paymaster Vault (BSC Testnet).",
    networkChainId: "Network & Chain ID:",
    senderSmartAccount: "Sender Smart Account:",
    recipientHost: "Recipient (Cashier / Host):",
    tokenUsdtContract: "Token USDT Contract (BEP-20):",
    settlementContract: "Settlement Smart Contract:",
    paymasterContract: "Paymaster Contract:",
    tBnbBalanceRequired: "Required tBNB Balance:",
    sponsoredForFree: "0.00 tBNB (SPONSORED FOR FREE)",
    wrappingUserOp: "Wrapping ERC-4337 UserOperation...",
    requestingSponsorship:
      "Requesting gas sponsorship from ReceiptSplit Paymaster on BNB Chain...",
    confirmingSettlement:
      "Confirming settlement on BNB Chain Smart Contract...",
    processingOnChain: "Processing On-Chain Settlement",
    bundlerSubtitle: "Wrapping ERC-4337 UserOp • BNB Chain Bundler",
    paymentSuccessSettled: "Payment Successful & Settled!",
    paymentSuccessDesc:
      "Share for {name} of {amount} is now recorded on BSC Testnet Smart Contract (Chain ID 97).",
    reputationBadgeEarned: "Reputation Badge Earned 🎖️",
    antiGhostingReputation: "+25 Anti-Ghosting Reputation on BSC Testnet",
    settlementStatus: "Settlement Status:",
    verifiedOnChain: "VERIFIED ON-CHAIN (BSC TESTNET)",
    bscTestnetBlock: "BSC Testnet Block:",
    smartContractLabel: "Smart Contract:",
    txHashProof: "TxHash Proof:",
    confirmPayAmount: "Confirm Pay {amount} (0 BNB Gas)",
    doneAndClose: "Done & Close",

    // Proof of Settlement Modal
    proofTitle: "Proof of Settlement (On-Chain)",
    proofSubtitle: "Hangout settlement proof & reputation badges on BNB Chain",
    verifiedBadgeHeader: "BSC TESTNET VERIFIED (CHAIN ID: 97)",
    settleId: "Settle ID:",
    cashierGrandTotal: "Cashier Grand Total:",
    totalCryptoUsdt: "Total Crypto (USDT):",
    collectedOnChain: "Collected On-Chain:",
    hostCashier: "Host QRIS/Cashier:",
    settlementContractBsc: "Settlement Contract (BSC Testnet):",
    copyContract: "Copy Contract",
    participantsSettlementStatus: "Participants Settlement Status",
    achievementsTitle: "Anti-Ghosting Reputation & On-Chain Achievements",
    fastestSettler: "Fastest Settler",
    fastestSettlerDesc: "Paid in < 5 mins",
    zeroGasPioneer: "Zero-Gas Pioneer",
    zeroGasPioneerDesc: "ERC-4337 Sponsored",
    close: "Close",
    copyGroupChatSummary: "Copy Group Chat Summary (Telegram/WhatsApp)",
    chatFormatCopied: "Chat Format Copied!",

    // Smart Wallet Modal
    walletModalTitle: "Wallet & Account Abstraction",
    walletModalSubtitle: "BSC Testnet (Chain ID 97) • ERC-4337",
    smartAccountGasless: "Smart Account (Gasless)",
    metamaskTrust: "MetaMask / Trust Wallet",
    smartAccountAddressBsc: "Smart Account Address (BSC):",
    verified: "Verified",
    salin: "Copy",
    tersalin: "Copied",
    saldoUsdt: "USDT Balance",
    faucet50Usdt: "+ Faucet 50 USDT",
    saldoTBnbGas: "tBNB Gas Balance",
    gasPaidByPaymaster: "Gas sponsored by Paymaster (0 tBNB OK)",
    smartContractsDirectory: "Smart Contracts (BSC Testnet 97)",
    chapelTestnet: "Chapel Testnet",
    whyZeroGasImportant: "Why Does Zero-Gas Paymaster Matter?",
    whyZeroGasAnswer:
      "Normally when friends are asked to pay with crypto, they get confused having to acquire BNB coins for gas fees. With ERC-4337 Account Abstraction on BSC Testnet, transactions are wrapped into UserOperations so friends can pay USDT directly without holding any tBNB balance!",

    // Bill History Modal
    historyModalTitle: "Receipt & Bill History",
    historyModalSubtitle: "Securely saved in your Firebase Firestore backend",
    loadingHistoryFirestore: "Loading history from Cloud Firestore...",
    noSavedReceiptsYet: "No Saved Receipts Yet",
    noSavedReceiptsDesc:
      "Receipts you snap or save will automatically sync to Cloud Firestore and appear here.",
    currentlyActive: "Currently Active",
    noDate: "No date",
    itemsAndFriendsCount: "{items} items • {friends} friends",
    settledRatio: "{paid}/{total} Settled ({percent}%)",
    openReceipt: "Open Receipt",
    currentlyOpen: "Currently Open",
    deleteFromFirestore: "Delete from Cloud Firestore",
    confirmDeletePrompt:
      'Delete receipt "{name}" from Cloud Firestore?',
    abacSecuredFooter: "Synchronized with Firebase Rules (ABAC Secured)",
    savedCount: "{count} Saved",

    // Instant QR Modal
    qrModalTitle: "Instant QR Payment (BNB Chain)",
    qrModalSubtitle: "Scan via Trust Wallet, Binance, or MetaMask",
    billForName: "Bill for {name}",
    generatingQr: "Generating QR Code...",
    tokenContractUsdt: "Token Contract USDT (BSC Testnet):",
    recipientWalletHost: "Recipient Wallet Address (Host):",
    simulateScanSuccess: "Simulate Scan Success",
    verifying: "Verifying...",

    // App state & toasts
    toastReceiptSaved: 'Receipt "{name}" successfully saved to Cloud Firestore!',
    toastItemChangesSaved: "Item distribution changes saved to Cloud Firestore.",
    toastSettlementSuccess:
      "Settlement completed & transaction proof recorded in Cloud Firestore!",
    toastSaveError: "Failed to save to Firestore. Please try again.",
    toastDeletedSuccess: "Receipt successfully deleted from Cloud Firestore.",
    toastDeleteError: "Failed to delete receipt from Firestore.",
    toastTelegramCopied:
      "Bill summary format for Telegram / WhatsApp group chat copied!",
    emptyNoReceiptTitle: "No Receipt Loaded Yet",
    emptyNoReceiptDesc:
      "Snap a restaurant receipt or choose a sample preset to see the magic of ReceiptSplit.",
    startWithNewReceipt: "Start with New Receipt",
    individualBreakdown: "Individual Breakdown",
    friendsCountPill: "{count} Friends",
    gaslessPayHint:
      'Click "Pay my share with USDT" for gasless instant settlement on BSC Testnet',
    aiAutoAssignChat: "AI Auto-Assign Chat",
    loadingReceiptDetails: "Loading receipt details & settlement status...",

    // Telegram share formatter
    telegramHeader: "🧾 *ReceiptSplit Bill Breakdown*",
    telegramTotal: "💵 Total: {fiat} (~{usdt})",
    telegramNetwork: "⛓️ Network: *BSC Testnet (Chain ID 97 - Zero-Gas ERC-4337)*",
    telegramContract: "📄 Contract: *{contract}*",
    telegramHost: "💳 Host: {name} ({address})",
    telegramFooter: "⚡ Pay gas-free with USDT on BSC Testnet via ReceiptSplit",
    telegramPaid: "✅ PAID",
    telegramPending: "⏳ PENDING",
  },
  id: {
    // Navbar
    navSubtitle: "AI Bill Splitter • Firebase Backend • Zero-Gas AA di BSC Testnet (97)",
    historyBtn: "Riwayat",
    historyBtnTitle: "Buka Riwayat Struk dari Cloud Firestore",
    telegramFrameOn: "Telegram Frame: ON",
    telegramFrameOff: "Telegram Frame",
    snapReceipt: "Snap Struk",
    usdtZeroGas: "USDT • 0 tBNB Gas",
    firebaseUser: "Pengguna Firebase",
    cloudFirestoreActive: "Cloud Firestore Aktif",
    viewReceiptHistory: "Lihat Riwayat Struk",
    signOut: "Keluar (Logout)",
    googleSignIn: "Google Sign-In",
    signingIn: "Masuk...",
    googleSignInTitle: "Masuk dengan Google untuk menyimpan struk ke Cloud Firestore",

    // Hero Banner
    heroBadge1: "Solusi Patungan Nongkrong Bebas Ribet",
    heroBadge2: "Firebase Backend & Firestore",
    heroTitle: "Snap Struk, AI Bagi Item, Teman Bayar USDT Tanpa Gas Fee.",
    heroDescription:
      "Satu orang talangi kasir/QRIS restoran, AI (Gemini) memecah siapa pesan apa dari struk & chat grup, lalu tersimpan aman di Cloud Firestore dengan settlement Account Abstraction di BSC Testnet (Chapel 97) (0 tBNB gas dibutuhkan).",
    snapNewReceiptAI: "Foto Struk Baru (AI)",
    shareToGroup: "Bagikan ke Grup",
    authPromptText:
      "Masuk dengan Google Sign-In agar struk otomatis tersimpan di Cloud Firestore dan dapat dibuka kapan saja.",
    signInWithGoogle: "Masuk dengan Google",

    // Bill Summary
    diningReceipt: "Restoran / Struk",
    firestoreSync: "Firestore Sync",
    saveToFirestore: "Simpan ke Firestore",
    saving: "Menyimpan...",
    savedToCloud: "Tersimpan di Cloud",
    saveCloud: "Simpan Cloud",
    paidUpfrontBy: "Kasir/QRIS ditalangi oleh",
    copyHostWallet: "Salin alamat dompet host BNB Chain",
    viewProofOfSettlement: "Lihat Proof of Settlement",
    viewProof: "Lihat Proof",
    onChainSettlement: "On-Chain Settlement:",
    onChainStatus: "Status Patungan On-Chain:",
    settledOutOf: "{paid} dari {total} Lunas",
    subtotalMenu: "Subtotal Menu",
    taxService: "PB1 Tax & Service",
    splitProportionally: "Dibagi proporsional",
    exchangeRateRate: "Kurs USDT / IDR",
    adjustRate: "Sesuaikan Kurs",
    grandTotalBill: "Grand Total Bill",
    itemBreakdown: "Rincian Item ({count} Menu)",
    hide: "Sembunyikan",
    show: "Tampilkan",
    reassignItemsAI: "Atur Ulang / AI Re-Assign",
    consumedBy: "Dimakan oleh:",
    splitEquallyAll: "Bagi rata semua",

    // Participant Card
    menuPortion: "Porsi Menu: {item} + Tax/Serv: {tax}",
    settledOnChain: "LUNAS ON-CHAIN",
    unpaid: "BELUM BAYAR",
    totalShare: "Total Tagihan",
    payCryptoUsdt: "Bayar Crypto (USDT)",
    settleTime: "Waktu Settle:",
    justNow: "Baru saja",
    txHashBscTestnet: "Tx Hash (BSC Testnet):",
    sponsoredPaymasterBadge:
      "Disponsori Paymaster ERC-4337 (0 Gas Fee Dibayar Teman)",
    payMyShareUsdt: "Pay my share with USDT",
    zeroBnbGas: "0 BNB Gas",
    instantQrPay: "QR Bayar Instan",
    shareBill: "Bagikan Tagihan",
    copied: "Disalin!",
    copyReminderSuccess: "Pesan pengingat tagihan berhasil disalin!",
    reminderMessageTemplate:
      "Halo {name}! Patungan makan di ReceiptSplit totalnya {fiat} atau setara {usdt}.\nBisa bayar crypto bebas gas fee (0 BNB) di BNB Chain ke alamat host: {address}",

    // Snap Modal
    snapAndParseReceiptAI: "Snap & Parse Struk (AI)",
    snapModalSubtitle: "Gemini 3.8 Flash membaca struk & chat grup otomatis",
    popularPresets: "Preset Populer",
    uploadPhoto: "Upload Foto",
    liveCamera: "Kamera Langsung",
    presetsInstruction:
      "Pilih contoh struk restoran nyata untuk pengujian cepat:",
    clickToUse: "Klik untuk pakai",
    clickToUpload: "Klik untuk unggah foto struk",
    uploadFormats: "Mendukung format JPG, PNG, atau WEBP",
    cameraErrorMsg:
      "Kamera tidak dapat diakses di iFrame / izin ditolak. Silakan gunakan fitur Upload Foto atau Preset Populer di atas.",
    captureReceiptPhoto: "Ambil Foto Struk",
    receiptPhotoReady: "Foto Struk Siap Dianalisis",
    successfullyLoaded: "Berhasil dimuat",
    changePhoto: "Ganti Foto",
    groupChatNotesLabel:
      "Catatan Chat Grup / Siapa Makan Apa (Opsional)",
    groupChatNotesDesc:
      "Bisa paste chat WhatsApp / Telegram, AI akan otomatis memecah item ke masing-masing orang:",
    groupChatNotesPlaceholder:
      "Contoh: Budi makan nasi goreng, Siti es teh + dimsum berdua sama Budi, sisanya biaya servis dan tax dibagi rata...",
    cancel: "Batal",
    parseWithGeminiAI: "Parse dengan Gemini AI",
    geminiAiParsing: "Gemini AI Sedang Parsing...",

    // Item Assignment Modal
    itemAssignmentTitle: "Atur Siapa Makan Apa",
    itemAssignmentSubtitle:
      "Centang nama atau biarkan AI auto-assign dari pesan chat",
    groupFriendsCount: "Daftar Teman Nongkrong ({count} Orang)",
    addFriend: "+ Tambah teman",
    aiQuickAutoAssign: "AI Quick Auto-Assign (Chat Grup Parser)",
    aiQuickPlaceholder:
      "Contoh: Budi makan Kopi Mantan + Toast, Siti Matcha, Dimsum berdua...",
    apply: "Terapkan",
    processing: "Memproses...",
    selectWhoConsumed: "Pilih Siapa yang Mengonsumsi Menu",
    portionsPerPerson: "Porsi: {count} orang ({share}/orang)",
    notSelected: "Belum dipilih",
    saveAndRecalculate: "Simpan & Hitung Ulang Proporsional",
    minParticipantAlert: "Minimal harus ada 1 peserta.",

    // AA Paymaster Modal
    aaModalTitle: "ERC-4337 Account Abstraction",
    aaModalSubtitle:
      "Zero-Gas Paymaster Settlement di BSC Testnet (97)",
    payingShareFor: "Bayar Bagian:",
    activeGasSponsorship: "Sponsor Gas Fee Aktif: 0 tBNB Dibutuhkan",
    paymasterExplanation:
      "Teman tidak perlu pusing isi saldo tBNB untuk gas fee. Transaksi ini dibungkus ERC-4337 UserOperation dan gas fee sebesar ~0.00038 tBNB disubsidi langsung oleh ReceiptSplit Paymaster Vault (BSC Testnet).",
    networkChainId: "Jaringan & Chain ID:",
    senderSmartAccount: "Smart Account Pengirim:",
    recipientHost: "Penerima (Kasir / Host):",
    tokenUsdtContract: "Token USDT Contract (BEP-20):",
    settlementContract: "Settlement Smart Contract:",
    paymasterContract: "Paymaster Contract:",
    tBnbBalanceRequired: "Saldo tBNB Dibutuhkan:",
    sponsoredForFree: "0.00 tBNB (GRATIS DI-SPONSOR)",
    wrappingUserOp: "Membungkus UserOperation ERC-4337...",
    requestingSponsorship:
      "Meminta sponsor gas ke ReceiptSplit Paymaster di BNB Chain...",
    confirmingSettlement:
      "Mengonfirmasi settlement di Smart Contract BNB Chain...",
    processingOnChain: "Memproses Settle On-Chain",
    bundlerSubtitle: "Membungkus UserOp ERC-4337 • Bundler BNB Chain",
    paymentSuccessSettled: "Pembayaran Sukses & Lunas!",
    paymentSuccessDesc:
      "Bagian {name} sebesar {amount} telah tercatat di Smart Contract BSC Testnet (Chain ID 97).",
    reputationBadgeEarned: "Reputation Badge Earned 🎖️",
    antiGhostingReputation: "+25 Reputasi Anti-Ghosting di BSC Testnet",
    settlementStatus: "Status Settlement:",
    verifiedOnChain: "VERIFIED ON-CHAIN (BSC TESTNET)",
    bscTestnetBlock: "Blok BSC Testnet:",
    smartContractLabel: "Smart Contract:",
    txHashProof: "Bukti TxHash:",
    confirmPayAmount: "Konfirmasi Bayar {amount} (0 BNB Gas)",
    doneAndClose: "Selesai & Tutup",

    // Proof of Settlement Modal
    proofTitle: "Proof of Settlement (On-Chain)",
    proofSubtitle: "Bukti patungan & reputasi badge di BNB Chain",
    verifiedBadgeHeader: "BSC TESTNET VERIFIED (CHAIN ID: 97)",
    settleId: "Settle ID:",
    cashierGrandTotal: "Grand Total Kasir:",
    totalCryptoUsdt: "Total Crypto (USDT):",
    collectedOnChain: "Terkumpul On-Chain:",
    hostCashier: "Host QRIS/Kasir:",
    settlementContractBsc: "Settlement Contract (BSC Testnet):",
    copyContract: "Salin Contract",
    participantsSettlementStatus: "Status Patungan Peserta",
    achievementsTitle: "Reputasi Anti-Ghosting & On-Chain Achievements",
    fastestSettler: "Paling Gercep",
    fastestSettlerDesc: "Bayar < 5 menit",
    zeroGasPioneer: "Zero-Gas Pioneer",
    zeroGasPioneerDesc: "ERC-4337 Sponsored",
    close: "Tutup",
    copyGroupChatSummary: "Salin Format Chat Grup (Telegram/WA)",
    chatFormatCopied: "Format Chat Disalin!",

    // Smart Wallet Modal
    walletModalTitle: "Dompet & Account Abstraction",
    walletModalSubtitle: "BSC Testnet (Chain ID 97) • ERC-4337",
    smartAccountGasless: "Smart Account (Gasless)",
    metamaskTrust: "MetaMask / Trust Wallet",
    smartAccountAddressBsc: "Alamat Smart Account (BSC):",
    verified: "Verified",
    salin: "Salin",
    tersalin: "Tersalin",
    saldoUsdt: "Saldo USDT",
    faucet50Usdt: "+ Faucet 50 USDT",
    saldoTBnbGas: "Saldo tBNB Gas",
    gasPaidByPaymaster: "Gas ditanggung Paymaster (0 tBNB OK)",
    smartContractsDirectory: "Smart Contracts (BSC Testnet 97)",
    chapelTestnet: "Chapel Testnet",
    whyZeroGasImportant: "Mengapa Zero-Gas Paymaster Penting?",
    whyZeroGasAnswer:
      "Biasanya saat teman diminta bayar crypto, mereka bingung harus punya koin BNB untuk bayar gas fee. Dengan ERC-4337 Account Abstraction di BSC Testnet, transaksi dibungkus UserOp sehingga teman bisa langsung bayar USDT tanpa perlu menyimpan saldo tBNB sama sekali!",

    // Bill History Modal
    historyModalTitle: "Riwayat Struk & Tagihan",
    historyModalSubtitle: "Tersimpan aman di backend Firebase Firestore Anda",
    loadingHistoryFirestore: "Memuat riwayat dari Cloud Firestore...",
    noSavedReceiptsYet: "Belum Ada Struk Tersimpan",
    noSavedReceiptsDesc:
      "Struk yang Anda foto atau simpan akan otomatis tersinkronisasi di Cloud Firestore dan muncul di sini.",
    currentlyActive: "Aktif Sekarang",
    noDate: "Tanpa tanggal",
    itemsAndFriendsCount: "{items} item • {friends} teman",
    settledRatio: "{paid}/{total} Lunas ({percent}%)",
    openReceipt: "Buka Struk",
    currentlyOpen: "Sedang Dibuka",
    deleteFromFirestore: "Hapus dari Cloud Firestore",
    confirmDeletePrompt:
      'Hapus struk "{name}" dari Cloud Firestore?',
    abacSecuredFooter: "Tersinkronisasi dengan Firebase Rules (ABAC Secured)",
    savedCount: "{count} Tersimpan",

    // Instant QR Modal
    qrModalTitle: "QR Bayar Instan (BNB Chain)",
    qrModalSubtitle: "Scan via Trust Wallet, Binance, atau MetaMask",
    billForName: "Tagihan untuk {name}",
    generatingQr: "Membuat QR Code...",
    tokenContractUsdt: "Contract Token USDT (BSC Testnet):",
    recipientWalletHost: "Alamat Dompet Penerima (Host):",
    simulateScanSuccess: "Simulasikan Scan Sukses",
    verifying: "Memverifikasi...",

    // App state & toasts
    toastReceiptSaved: 'Struk "{name}" berhasil disimpan ke Cloud Firestore!',
    toastItemChangesSaved: "Perubahan pembagian item disimpan ke Cloud Firestore.",
    toastSettlementSuccess:
      "Status lunas & bukti transaksi tercatat di Cloud Firestore!",
    toastSaveError: "Gagal menyimpan ke Firestore. Silakan coba lagi.",
    toastDeletedSuccess: "Struk berhasil dihapus dari Cloud Firestore.",
    toastDeleteError: "Gagal menghapus struk dari Firestore.",
    toastTelegramCopied:
      "Format ringkasan tagihan untuk chat grup Telegram / WhatsApp berhasil disalin!",
    emptyNoReceiptTitle: "Belum Ada Struk yang Dimuat",
    emptyNoReceiptDesc:
      "Ambil foto struk restoran atau pilih contoh preset untuk melihat keajaiban ReceiptSplit.",
    startWithNewReceipt: "Mulai dengan Struk Baru",
    individualBreakdown: "Rincian Pembagian per Orang",
    friendsCountPill: "{count} Teman",
    gaslessPayHint:
      'Klik "Pay my share with USDT" untuk transaksi gasless langsung di BSC Testnet',
    aiAutoAssignChat: "AI Auto-Assign Chat",
    loadingReceiptDetails: "Memuat rincian struk & status settlement...",

    // Telegram share formatter
    telegramHeader: "🧾 *ReceiptSplit Bill Breakdown*",
    telegramTotal: "💵 Total: {fiat} (~{usdt})",
    telegramNetwork: "⛓️ Network: *BSC Testnet (Chain ID 97 - Zero-Gas ERC-4337)*",
    telegramContract: "📄 Contract: *{contract}*",
    telegramHost: "💳 Host: {name} ({address})",
    telegramFooter: "⚡ Pay gas-free with USDT on BSC Testnet via ReceiptSplit",
    telegramPaid: "✅ LUNAS",
    telegramPending: "⏳ BELUM",
  },
} as const;

export type TranslationKeys = keyof typeof translations.en;
export type TranslationSchema = Record<TranslationKeys, string>;
