"use client";

import { useState } from "react";
import { CryptoTaxSDK, type Wallet } from "@awakentax/crypto-tax";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [wallets, setWallets] = useState<Wallet[]>([
    { address: "", name: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ code: string; url: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const addWallet = () => {
    setWallets([...wallets, { address: "", name: "" }]);
  };

  const removeWallet = (index: number) => {
    setWallets(wallets.filter((_, i) => i !== index));
  };

  const updateWallet = (index: number, field: keyof Wallet, value: string) => {
    const updated = [...wallets];
    updated[index] = { ...updated[index], [field]: value };
    setWallets(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Filter out empty wallets
      const validWallets = wallets.filter(
        (w) => w.address.trim() !== ""
      ) as Wallet[];

      if (validWallets.length === 0) {
        throw new Error("Please add at least one wallet address");
      }

      if (!apiKey.trim()) {
        throw new Error("Please enter your API key");
      }

      // Initialize SDK
      const sdk = new CryptoTaxSDK({ apiKey: apiKey.trim() , baseUrl: "http://localhost:8080" });

      // Create link
      const response = await sdk.createLink({ wallets: validWallets });

      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-start py-16 px-8 bg-white dark:bg-black">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-zinc-50">
            Crypto Tax SDK Example
          </h1>
          <p className="text-lg mb-8 text-zinc-600 dark:text-zinc-400">
            This Next.js example demonstrates how to use the{" "}
            <code className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-sm">
              @awakentax/crypto-tax
            </code>{" "}
            package to create tax calculation links.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium mb-2 text-black dark:text-zinc-50"
              >
                API Key
              </label>
              <input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Get your API key from{" "}
                <a
                  href="mailto:andrew@awaken.tax"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  andrew@awaken.tax
                </a>
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-black dark:text-zinc-50">
                  Wallet Addresses
                </label>
                <button
                  type="button"
                  onClick={addWallet}
                  className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  + Add Wallet
                </button>
              </div>

              <div className="space-y-3">
                {wallets.map((wallet, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-start p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900"
                  >
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={wallet.address}
                        onChange={(e) =>
                          updateWallet(index, "address", e.target.value)
                        }
                        placeholder="0x..."
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={wallet.name || ""}
                        onChange={(e) =>
                          updateWallet(index, "name", e.target.value)
                        }
                        placeholder="Wallet name (optional)"
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {wallets.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWallet(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Creating Link..." : "Create Tax Link"}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 font-medium">
                Error: {error}
              </p>
            </div>
          )}

          {result && (
            <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
                Link Created Successfully!
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                    Link Code:
                  </p>
                  <code className="block px-3 py-2 bg-white dark:bg-zinc-800 rounded border border-green-200 dark:border-green-700 text-green-800 dark:text-green-200">
                    {result.code}
                  </code>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">
                    Link URL:
                  </p>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 bg-white dark:bg-zinc-800 rounded border border-green-200 dark:border-green-700 text-blue-600 dark:text-blue-400 hover:underline break-all"
                  >
                    {result.url}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
