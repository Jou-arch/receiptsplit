import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import crypto from "crypto";

dotenv.config();

const app = express();
const portArgIndex = process.argv.indexOf("--port");
const argPort = portArgIndex !== -1 ? parseInt(process.argv[portArgIndex + 1], 10) : NaN;
const PORT = !isNaN(argPort) ? argPort : 3000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// In-memory bills storage for collaborative settlement
interface BillParticipant {
  id: string;
  name: string;
  avatar?: string;
  address?: string;
  itemsShare: number;
  taxAndServiceShare: number;
  totalFiat: number;
  totalUsdt: number;
  isPaid: boolean;
  paidAt?: string;
  txHash?: string;
  badge?: string;
}

interface BillItem {
  id: string;
  name: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  assignedTo: string[]; // participant names
}

interface Bill {
  id: string;
  title: string;
  merchantName: string;
  date: string;
  currency: string;
  exchangeRate: number; // e.g. 16250 IDR per USDT
  items: BillItem[];
  subtotal: number;
  tax: number;
  serviceCharge: number;
  discount: number;
  grandTotal: number;
  payerName: string;
  payerAddress: string;
  network: "BNB Testnet" | "BNB Chain (BSC)";
  participants: BillParticipant[];
  createdAt: string;
}

const billsDatabase: Map<string, Bill> = new Map();

// Initialize AI Client lazily
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Preset samples for fast instant demo / testing
const SAMPLE_PRESETS_EN = [
  {
    title: "Kenangan Heritage Cafe (Hangout Settle)",
    merchantName: "Kenangan Heritage Cafe",
    date: new Date().toISOString().split("T")[0],
    currency: "IDR",
    exchangeRate: 16300,
    subtotal: 184000,
    tax: 18400,
    serviceCharge: 9200,
    discount: 15000,
    grandTotal: 196600,
    payerName: "Host (Alex)",
    payerAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    items: [
      { id: "item-1", name: "2x Iced Vanilla Latte (Large)", quantity: 2, pricePerUnit: 26000, totalPrice: 52000, assignedTo: ["Bob", "Alex"] },
      { id: "item-2", name: "1x Matcha Espresso Fusion", quantity: 1, pricePerUnit: 34000, totalPrice: 34000, assignedTo: ["Sarah"] },
      { id: "item-3", name: "1x Cold Brew Americano", quantity: 1, pricePerUnit: 24000, totalPrice: 24000, assignedTo: ["Ryan"] },
      { id: "item-4", name: "1x Smoked Beef & Cheese Toast", quantity: 1, pricePerUnit: 38000, totalPrice: 38000, assignedTo: ["Bob", "Sarah", "Ryan", "Alex"] },
      { id: "item-5", name: "1x Red Velvet Choco Roll", quantity: 1, pricePerUnit: 36000, totalPrice: 36000, assignedTo: ["Sarah", "Ryan"] },
    ],
    participants: ["Alex", "Bob", "Sarah", "Ryan"]
  },
  {
    title: "Sushi Tei Japanese Dining",
    merchantName: "Sushi Tei Dining",
    date: new Date().toISOString().split("T")[0],
    currency: "IDR",
    exchangeRate: 16300,
    subtotal: 420000,
    tax: 42000,
    serviceCharge: 21000,
    discount: 0,
    grandTotal: 483000,
    payerName: "Kevin (Host)",
    payerAddress: "0x33de6Adf9Ce0f4Ae96fB03e1AB6D16577c89A47F",
    items: [
      { id: "item-1", name: "Salmon Sashimi 5 pcs", quantity: 1, pricePerUnit: 88000, totalPrice: 88000, assignedTo: ["Kevin", "Alex"] },
      { id: "item-2", name: "Tuna Salad Crispy Roll", quantity: 1, pricePerUnit: 75000, totalPrice: 75000, assignedTo: ["Kevin", "Alex", "Nadia"] },
      { id: "item-3", name: "Chicken Teriyaki Bento", quantity: 1, pricePerUnit: 95000, totalPrice: 95000, assignedTo: ["Nadia"] },
      { id: "item-4", name: "Spicy Miso Ramen", quantity: 1, pricePerUnit: 82000, totalPrice: 82000, assignedTo: ["Alex"] },
      { id: "item-5", name: "4x Green Tea Refill", quantity: 4, pricePerUnit: 20000, totalPrice: 80000, assignedTo: ["Kevin", "Alex", "Nadia"] },
    ],
    participants: ["Kevin", "Alex", "Nadia"]
  }
];

const SAMPLE_PRESETS_ID = [
  {
    title: "Kopi Kenangan Senopati (Makan Bareng)",
    merchantName: "Kopi Kenangan Senopati",
    date: new Date().toISOString().split("T")[0],
    currency: "IDR",
    exchangeRate: 16300,
    subtotal: 184000,
    tax: 18400,
    serviceCharge: 9200,
    discount: 15000,
    grandTotal: 196600,
    payerName: "Taufik (Host)",
    payerAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    items: [
      { id: "item-1", name: "2x Kopi Kenangan Mantan (Large)", quantity: 2, pricePerUnit: 26000, totalPrice: 52000, assignedTo: ["Budi", "Taufik"] },
      { id: "item-2", name: "1x Matcha Espresso Jam", quantity: 1, pricePerUnit: 34000, totalPrice: 34000, assignedTo: ["Siti"] },
      { id: "item-3", name: "1x Americano Cold Brew", quantity: 1, pricePerUnit: 24000, totalPrice: 24000, assignedTo: ["Rian"] },
      { id: "item-4", name: "1x Toast Smoked Beef Cheese", quantity: 1, pricePerUnit: 38000, totalPrice: 38000, assignedTo: ["Budi", "Siti", "Rian", "Taufik"] },
      { id: "item-5", name: "1x Red Velvet Choco Roll", quantity: 1, pricePerUnit: 36000, totalPrice: 36000, assignedTo: ["Siti", "Rian"] },
    ],
    participants: ["Taufik", "Budi", "Siti", "Rian"]
  },
  {
    title: "Sushi Tei Grand Indonesia",
    merchantName: "Sushi Tei Restaurant",
    date: new Date().toISOString().split("T")[0],
    currency: "IDR",
    exchangeRate: 16300,
    subtotal: 420000,
    tax: 42000,
    serviceCharge: 21000,
    discount: 0,
    grandTotal: 483000,
    payerName: "Kevin (Host)",
    payerAddress: "0x33de6Adf9Ce0f4Ae96fB03e1AB6D16577c89A47F",
    items: [
      { id: "item-1", name: "Salmon Sashimi 5 pcs", quantity: 1, pricePerUnit: 88000, totalPrice: 88000, assignedTo: ["Kevin", "Adit"] },
      { id: "item-2", name: "Tuna Salad Crispy Roll", quantity: 1, pricePerUnit: 75000, totalPrice: 75000, assignedTo: ["Kevin", "Adit", "Nadia"] },
      { id: "item-3", name: "Chicken Teriyaki Bento", quantity: 1, pricePerUnit: 95000, totalPrice: 95000, assignedTo: ["Nadia"] },
      { id: "item-4", name: "Spicy Miso Ramen", quantity: 1, pricePerUnit: 82000, totalPrice: 82000, assignedTo: ["Adit"] },
      { id: "item-5", name: "4x Ocha Refill", quantity: 4, pricePerUnit: 20000, totalPrice: 80000, assignedTo: ["Kevin", "Adit", "Nadia"] },
    ],
    participants: ["Kevin", "Adit", "Nadia"]
  }
];

const SAMPLE_PRESETS = SAMPLE_PRESETS_EN;

function calculateBillParticipants(
  items: BillItem[],
  subtotal: number,
  tax: number,
  serviceCharge: number,
  discount: number,
  grandTotal: number,
  exchangeRate: number,
  participantNames: string[]
): BillParticipant[] {
  const map: Record<string, { itemsShare: number; isPaid: boolean }> = {};
  
  participantNames.forEach((name) => {
    map[name] = { itemsShare: 0, isPaid: false };
  });

  // Calculate items share
  items.forEach((item) => {
    const assignees = item.assignedTo && item.assignedTo.length > 0 ? item.assignedTo : participantNames;
    const share = item.totalPrice / (assignees.length || 1);
    assignees.forEach((person) => {
      if (!map[person]) {
        map[person] = { itemsShare: 0, isPaid: false };
      }
      map[person].itemsShare += share;
    });
  });

  const netExtras = (tax || 0) + (serviceCharge || 0) - (discount || 0);

  return Object.keys(map).map((name, index) => {
    const data = map[name];
    // Proportion of extras based on item spend
    const proportion = subtotal > 0 ? data.itemsShare / subtotal : 1 / participantNames.length;
    const taxAndServiceShare = Math.round(netExtras * proportion);
    const totalFiat = Math.round(data.itemsShare + taxAndServiceShare);
    const totalUsdt = Number((totalFiat / exchangeRate).toFixed(2));

    return {
      id: `p-${index + 1}-${Date.now().toString(36)}`,
      name,
      itemsShare: Math.round(data.itemsShare),
      taxAndServiceShare,
      totalFiat,
      totalUsdt,
      isPaid: false,
    };
  });
}

// Seed initial bill so users have instant rich data
const initialPreset = SAMPLE_PRESETS[0];
const initialBillId = "demo-kenangan-101";
const initialParticipants = calculateBillParticipants(
  initialPreset.items,
  initialPreset.subtotal,
  initialPreset.tax,
  initialPreset.serviceCharge,
  initialPreset.discount,
  initialPreset.grandTotal,
  initialPreset.exchangeRate,
  initialPreset.participants
);
// Mark host as paid/payer
if (initialParticipants[0]) {
  initialParticipants[0].isPaid = true;
  initialParticipants[0].paidAt = new Date().toISOString();
  initialParticipants[0].txHash = "0x82f5b8a1c97f123d4567e9b1123456789abcdef0123456789abcdef012345678";
  initialParticipants[0].badge = "Receipt Host";
}

billsDatabase.set(initialBillId, {
  id: initialBillId,
  title: initialPreset.title,
  merchantName: initialPreset.merchantName,
  date: initialPreset.date,
  currency: initialPreset.currency,
  exchangeRate: initialPreset.exchangeRate,
  items: initialPreset.items,
  subtotal: initialPreset.subtotal,
  tax: initialPreset.tax,
  serviceCharge: initialPreset.serviceCharge,
  discount: initialPreset.discount,
  grandTotal: initialPreset.grandTotal,
  payerName: initialPreset.payerName,
  payerAddress: initialPreset.payerAddress,
  network: "BNB Chain (BSC)",
  participants: initialParticipants,
  createdAt: new Date().toISOString(),
});

// API Routes
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    network: "BNB Chain (BSC)",
    model: "gemini-3.8-flash",
  });
});

// Get bills
app.get("/api/bills", (req, res) => {
  const bills = Array.from(billsDatabase.values());
  res.json({ bills });
});

// Get specific bill
app.get("/api/bills/:id", (req, res) => {
  const bill = billsDatabase.get(req.params.id);
  if (!bill) {
    return res.status(404).json({ error: "Bill not found" });
  }
  res.json({ bill });
});

// Create bill
app.post("/api/bills", (req, res) => {
  const billData: Partial<Bill> = req.body;
  const billId = billData.id || `bill-${Date.now()}`;
  
  const exchangeRate = billData.exchangeRate || 16300;
  const items = billData.items || [];
  const subtotal = billData.subtotal || items.reduce((acc, it) => acc + (it.totalPrice || it.pricePerUnit * it.quantity), 0);
  const tax = billData.tax || 0;
  const serviceCharge = billData.serviceCharge || 0;
  const discount = billData.discount || 0;
  const grandTotal = billData.grandTotal || (subtotal + tax + serviceCharge - discount);

  const participantNames = billData.participants && billData.participants.length > 0
    ? billData.participants.map((p) => (typeof p === "string" ? p : p.name))
    : ["Taufik", "Budi", "Siti"];

  const calculatedParticipants = calculateBillParticipants(
    items,
    subtotal,
    tax,
    serviceCharge,
    discount,
    grandTotal,
    exchangeRate,
    participantNames
  );

  const fullBill: Bill = {
    id: billId,
    title: billData.title || billData.merchantName || "Nongkrong Settle Bill",
    merchantName: billData.merchantName || "Restoran / Kafe",
    date: billData.date || new Date().toISOString().split("T")[0],
    currency: billData.currency || "IDR",
    exchangeRate,
    items,
    subtotal,
    tax,
    serviceCharge,
    discount,
    grandTotal,
    payerName: billData.payerName || "Host",
    payerAddress: billData.payerAddress || "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    network: billData.network || "BNB Testnet",
    participants: calculatedParticipants,
    createdAt: new Date().toISOString(),
  };

  billsDatabase.set(billId, fullBill);
  res.json({ success: true, bill: fullBill });
});

// AI Receipt Parser (via photo upload or camera base64)
app.post("/api/receipts/parse", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/jpeg", groupNotes = "", currency = "IDR", lang = "en" } = req.body;
    const ai = getAI();
    const isEn = lang !== "id";

    // Fallback if no image provided or no AI key
    if (!ai || !imageBase64) {
      // Use realistic template with dynamic adjustments
      const presets = isEn ? SAMPLE_PRESETS_EN : SAMPLE_PRESETS_ID;
      const chosen = presets[Math.floor(Math.random() * presets.length)];
      return res.json({
        success: true,
        source: ai ? "mock_or_preset" : "fallback_no_api_key",
        data: chosen,
      });
    }

    // Clean base64 string
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");

    const prompt = `You are an expert AI Receipt Parser for a dining bill splitter app called ReceiptSplit.
Analyze this restaurant / cafe receipt image.
Target language for output: ${isEn ? "English" : "Indonesian"}.
Also consider these optional group split notes from group chat: "${groupNotes}".

Extract and return STRICT JSON with this exact schema:
{
  "merchantName": "Name of the restaurant/cafe/store",
  "date": "YYYY-MM-DD (or current date if not visible)",
  "currency": "${currency}",
  "subtotal": 0,
  "tax": 0,
  "serviceCharge": 0,
  "discount": 0,
  "grandTotal": 0,
  "items": [
    {
      "name": "Item Name",
      "quantity": 1,
      "pricePerUnit": 0,
      "totalPrice": 0,
      "assignedTo": ["Name1", "Name2"]
    }
  ],
  "participants": ["Name1", "Name2", "Name3"]
}

Guidelines:
1. Numerical values must be clean integers or floats without currency symbols (e.g. 52000, not Rp 52.000).
2. If taxes (PB1/VAT 10-11%) or Service Charge (5-10%) are present on receipt, extract them accurately.
3. If groupNotes mentions who ordered what, assign the item to those participants.
4. If no group notes are provided, suggest 3-4 sensible participant names (${isEn ? 'e.g. "Alice", "Bob", "Sarah", "Ryan"' : 'e.g. "Budi", "Siti", "Rian", "Taufik"'}) and distribute items or assign them fairly.
5. All text fields (merchantName, items.name, etc.) should be in ${isEn ? "English" : "Indonesian"}.
6. Return pure valid JSON only, no markdown ticks.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType || "image/jpeg",
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);

    // Ensure item IDs
    if (Array.isArray(parsedData.items)) {
      const defaultParticipants = isEn ? ["Alice", "Bob", "Charlie", "Host"] : ["Budi", "Siti", "Rian", "Host"];
      parsedData.items = parsedData.items.map((it: any, idx: number) => ({
        ...it,
        id: `parsed-item-${idx + 1}-${Date.now().toString(36)}`,
        assignedTo: it.assignedTo || parsedData.participants || defaultParticipants,
      }));
    }

    parsedData.exchangeRate = currency === "IDR" ? 16300 : currency === "MYR" ? 4.45 : currency === "SGD" ? 1.35 : 1;

    res.json({
      success: true,
      source: "gemini-3.8-flash",
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Receipt parsing error:", error);
    // Return fallback sample preset so user workflow never breaks
    const fallback = SAMPLE_PRESETS[0];
    res.json({
      success: true,
      source: "fallback_error_recovery",
      warning: error.message,
      data: fallback,
    });
  }
});

// AI Chat Text Splitter & Item Auto-Assigner
app.post("/api/receipts/ai-assign", async (req, res) => {
  try {
    const { items, chatText, currentParticipants = [], lang = "en" } = req.body;
    const ai = getAI();
    const isEn = lang !== "id";

    if (!ai || !chatText) {
      return res.status(400).json({ error: "Missing chatText or AI service unavailable" });
    }

    const prompt = `You are an AI bill organizer.
Target language for reasoning: ${isEn ? "English" : "Indonesian"}.
Given the list of receipt items:
${JSON.stringify(items, null, 2)}

And the user's natural language group chat or notes:
"${chatText}"

Existing participants: ${JSON.stringify(currentParticipants)}

Assign each item by its id to the correct participant(s). If an item is mentioned as shared, add multiple participants. If someone says "split remainder equally" or "sisanya dibagi rata" or an item is not mentioned, assign to all participants.
Extract all mentioned participant names.

Return STRICT JSON:
{
  "participants": ["Name1", "Name2", ...],
  "assignments": [
    { "itemId": "item-id", "assignedTo": ["Name1", "Name2"] }
  ],
  "reasoning": "Short 1-sentence explanation in ${isEn ? "English" : "Indonesian"}"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json({ success: true, result });
  } catch (err: any) {
    console.error("AI assign error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ERC-4337 Account Abstraction Paymaster / Bundler Sponsorship Endpoint
app.post("/api/aa/sponsor-userop", async (req, res) => {
  try {
    const {
      billId,
      participantId,
      participantName,
      recipientAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      amountUsdt,
      userSmartAccountAddress,
      token = "USDT (BEP-20)",
      paymasterMode = "ZERO_GAS_SPONSORED", // or "PAY_GAS_IN_USDT"
      lang = "en",
    } = req.body;

    const isEn = lang !== "id";

    // Simulate ERC-4337 UserOperation validation & bundler inclusion on BNB Chain
    const bnbGasFee = 0.00038; // BNB
    const bnbGasUsd = Number((bnbGasFee * 620).toFixed(2)); // BSC BNB at ~$620
    const txHash = "0x" + crypto.randomBytes(32).toString("hex");

    // Reputational badge selection based on speed & interaction
    const badges = isEn
      ? [
          "Fastest Settler ⚡",
          "Zero-Gas Pioneer 🛡️",
          "Anti-Ghosting Hero 🎖️",
          "BNB Native Settler ✨",
          "Bill Hero 👑",
        ]
      : [
          "Paling Gercep ⚡",
          "Zero-Gas Pioneer 🛡️",
          "Anti-Ghosting Hero 🎖️",
          "BNB Native Settle ✨",
          "Bill Hero 👑",
        ];
    const awardedBadge = badges[Math.floor(Math.random() * badges.length)];

    // Update bill participant status in memory if billId is present
    if (billId && billsDatabase.has(billId)) {
      const bill = billsDatabase.get(billId)!;
      const targetP = bill.participants.find((p) => p.id === participantId || p.name.toLowerCase() === participantName?.toLowerCase());
      if (targetP) {
        targetP.isPaid = true;
        targetP.paidAt = new Date().toISOString();
        targetP.txHash = txHash;
        targetP.badge = awardedBadge;
      }
    }

    res.json({
      success: true,
      network: "BNB Smart Chain Testnet (Chapel)",
      chainId: 97,
      userOp: {
        sender: userSmartAccountAddress || "0x33de6Adf9Ce0f4Ae96fB03e1AB6D16577c89A47F",
        entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
        recipient: recipientAddress,
        tokenContract: "0x337610d27c682E347C9cD608137943050B300684", // Binance-Peg BSC-USD (USDT) on BSC Testnet
        settlementContract: "0x33de6Adf9Ce0f4Ae96fB03e1AB6D16577c89A47F", // ReceiptSplit Settlement Contract (BSC Testnet)
        amount: amountUsdt,
        nonce: Math.floor(Math.random() * 1000) + 1,
        paymasterAndData: "0x7B9C4961858546b5a79664e16ffc0Ac6403d6dC0000000000000000000000000", // Paymaster Vault (BSC Testnet)
        paymasterSponsorship: {
          isSponsored: true,
          sponsorName: "ReceiptSplit Paymaster Vault (BSC Testnet)",
          gasSavedBnb: `${bnbGasFee} tBNB`,
          gasSavedUsd: `$${bnbGasUsd}`,
          userBnbBalanceRequired: "0 tBNB (Zero Gas Friction)",
        },
      },
      settlement: {
        txHash,
        status: "COMPLETED",
        blockNumber: 42890124 + Math.floor(Math.random() * 500),
        bscScanUrl: `https://testnet.bscscan.com/tx/${txHash}`,
        contractAddress: "0x33de6Adf9Ce0f4Ae96fB03e1AB6D16577c89A47F",
        paidAt: new Date().toISOString(),
        awardedBadge,
        reputationScoreAdded: +25,
      },
    });
  } catch (error: any) {
    console.error("AA sponsor error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ReceiptSplit server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
