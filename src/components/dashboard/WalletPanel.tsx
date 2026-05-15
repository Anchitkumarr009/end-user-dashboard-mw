"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { WalletOffer, WalletTransaction } from "@/lib/types";
import {
  COUPON_CREDITS_INR,
  normalizeCouponCode,
} from "@/lib/wallet-coupons";

const STORAGE_KEY = "mehndiwalaa-wallet-demo";

const TOPUP_PRESETS = [500, 1000, 2000, 5000, 10000] as const;

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI" },
  { id: "card", label: "Card" },
  { id: "netbanking", label: "Net banking" },
] as const;

type Stored = {
  redeemed: string[];
  extraTransactions: WalletTransaction[];
};

function loadStored(): Stored {
  if (typeof window === "undefined") return { redeemed: [], extraTransactions: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { redeemed: [], extraTransactions: [] };
    const v = JSON.parse(raw) as Stored;
    if (!Array.isArray(v.redeemed) || !Array.isArray(v.extraTransactions)) {
      return { redeemed: [], extraTransactions: [] };
    }
    return v;
  } catch {
    return { redeemed: [], extraTransactions: [] };
  }
}

function saveStored(s: Stored) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

function formatInr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function ledgerDelta(transactions: WalletTransaction[]) {
  return transactions.reduce(
    (sum, t) => sum + (t.type === "credit" ? t.amountInr : -t.amountInr),
    0,
  );
}

export function WalletPanel(props: {
  baseBalanceInr: number;
  expenseSummary: {
    thisMonthInr: number;
    lifetimeSpendInr: number;
    creditsEarnedInr: number;
  };
  initialTransactions: WalletTransaction[];
  offers: WalletOffer[];
}) {
  const [stored, setStored] = useState<Stored>({
    redeemed: [],
    extraTransactions: [],
  });
  const [hydrated, setHydrated] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const [selectedPreset, setSelectedPreset] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [payMethod, setPayMethod] =
    useState<(typeof PAYMENT_METHODS)[number]["id"]>("upi");
  const [topUpError, setTopUpError] = useState<string | null>(null);
  const [topUpSuccess, setTopUpSuccess] = useState<string | null>(null);

  useEffect(() => {
    setStored(loadStored());
    setHydrated(true);
  }, []);

  const balanceInr = useMemo(() => {
    return props.baseBalanceInr + ledgerDelta(stored.extraTransactions);
  }, [props.baseBalanceInr, stored.extraTransactions]);

  const allTransactions = useMemo(() => {
    const merged = [...props.initialTransactions, ...stored.extraTransactions];
    return merged.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [props.initialTransactions, stored.extraTransactions]);

  const effectiveTopUpAmount = useMemo(() => {
    const custom = parseInt(customAmount.replace(/,/g, ""), 10);
    if (!Number.isNaN(custom) && custom > 0) return custom;
    return selectedPreset ?? 0;
  }, [customAmount, selectedPreset]);

  const applyStored = useCallback((update: Stored | ((prev: Stored) => Stored)) => {
    setStored((prev) => {
      const next = typeof update === "function" ? update(prev) : update;
      saveStored(next);
      return next;
    });
  }, []);

  const redeem = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setFormError(null);
      setFormSuccess(null);
      const code = normalizeCouponCode(codeInput);
      if (!code) {
        setFormError("Enter a coupon or offer code.");
        return;
      }
      const credit = COUPON_CREDITS_INR[code];
      if (credit == null) {
        setFormError("This code is not valid or has expired.");
        return;
      }
      if (stored.redeemed.includes(code)) {
        setFormError("You have already activated this code.");
        return;
      }
      const tx: WalletTransaction = {
        id: `coupon-${code}-${Date.now()}`,
        type: "credit",
        category: "coupon",
        title: "Coupon activated",
        subtitle: code,
        amountInr: credit,
        createdAt: new Date().toISOString(),
      };
      applyStored((prev) => ({
        redeemed: [...prev.redeemed, code],
        extraTransactions: [tx, ...prev.extraTransactions],
      }));
      setCodeInput("");
      setFormSuccess(`${formatInr(credit)} added to your wallet.`);
    },
    [codeInput, stored.redeemed, applyStored],
  );

  const recharge = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setTopUpError(null);
      setTopUpSuccess(null);
      setFormError(null);
      setFormSuccess(null);

      const raw = customAmount.trim() ? customAmount : String(selectedPreset ?? "");
      const amount = parseInt(raw.replace(/,/g, ""), 10);
      if (Number.isNaN(amount) || amount < 100) {
        setTopUpError("Enter at least ₹100 to recharge.");
        return;
      }
      if (amount > 200_000) {
        setTopUpError("For amounts above ₹2,00,000 please contact support.");
        return;
      }

      const methodLabel =
        PAYMENT_METHODS.find((m) => m.id === payMethod)?.label ?? "UPI";
      const tx: WalletTransaction = {
        id: `topup-${Date.now()}`,
        type: "credit",
        category: "top_up",
        title: "Wallet recharge",
        subtitle: `Demo · ${methodLabel}`,
        amountInr: amount,
        createdAt: new Date().toISOString(),
      };
      applyStored((prev) => ({
        ...prev,
        extraTransactions: [tx, ...prev.extraTransactions],
      }));
      setTopUpSuccess(`${formatInr(amount)} added — demo only, no charge.`);
      setCustomAmount("");
      setSelectedPreset(5000);
    },
    [customAmount, selectedPreset, payMethod, applyStored],
  );

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-2xl border border-[#e8e0d6] bg-gradient-to-br from-[#4A1414] via-[#5c1c1c] to-[#3a1010] p-6 text-white shadow-lg sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#d4a84b]/25 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-white/70">
              Available balance
            </p>
            <p className="mt-2 font-serif text-4xl font-semibold tabular-nums sm:text-5xl">
              {formatInr(balanceInr)}
            </p>
            {!hydrated ? (
              <p className="mt-2 text-xs text-white/50">Loading wallet…</p>
            ) : (
              <p className="mt-2 max-w-md text-sm text-white/65">
                Includes recharges and offer credits saved on this device (demo).
              </p>
            )}
          </div>
          <a
            href="#wallet-recharge"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#4A1414] shadow-md transition hover:bg-[#FFF9F0]"
          >
            Recharge wallet
          </a>
        </div>
      </section>

      <section
        id="wallet-recharge"
        className="scroll-mt-24 rounded-2xl border border-[#e8e0d6] bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="flex flex-col gap-2 border-b border-[#f0ebe4] pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#4A1414]">
              Recharge or top-up
            </h2>
            <p className="mt-1 text-sm text-[#4A1414]/60">
              Pick an amount and a payment method. This build simulates success —
              wire your gateway (Razorpay, Stripe, etc.) here.
            </p>
          </div>
          <p className="rounded-lg bg-[#FFF9F0] px-3 py-1.5 text-xs font-medium text-[#854d0e] ring-1 ring-[#fde68a]">
            Demo: no real money is collected
          </p>
        </div>

        <form onSubmit={recharge} className="mt-5 space-y-5">
          <div>
            <p className="text-sm font-medium text-[#4A1414]">Quick amounts</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {TOPUP_PRESETS.map((amt) => {
                const active =
                  !customAmount.trim() && selectedPreset === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedPreset(amt);
                      setCustomAmount("");
                      setTopUpError(null);
                      setTopUpSuccess(null);
                    }}
                    className={
                      active
                        ? "rounded-full bg-[#4A1414] px-4 py-2 text-sm font-semibold text-white shadow-sm"
                        : "rounded-full border border-[#e8e0d6] bg-[#FFFDF5] px-4 py-2 text-sm font-semibold text-[#4A1414] transition hover:border-[#d4c4b8]"
                    }
                  >
                    {formatInr(amt)}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="block text-sm font-medium text-[#4A1414]">
            Or enter custom amount (₹)
            <input
              inputMode="numeric"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value.replace(/[^\d]/g, ""));
                setTopUpError(null);
                setTopUpSuccess(null);
                if (e.target.value) setSelectedPreset(null);
              }}
              placeholder="e.g. 3500"
              className="mt-2 w-full max-w-xs rounded-xl border border-[#e8e0d6] bg-[#FFFDF5] px-3 py-2.5 text-sm tabular-nums text-[#4A1414] outline-none focus:border-[#b8892c] focus:ring-2 focus:ring-[#d4a84b]/30"
            />
          </label>

          <div>
            <p className="text-sm font-medium text-[#4A1414]">Pay with</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayMethod(m.id)}
                  className={
                    payMethod === m.id
                      ? "rounded-full bg-[#4A1414] px-4 py-2 text-sm font-semibold text-white"
                      : "rounded-full border border-[#e8e0d6] bg-white px-4 py-2 text-sm font-medium text-[#4A1414]/85 hover:bg-[#FFF9F0]"
                  }
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#f0ebe4] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#4A1414]/70">
              You will add{" "}
              <span className="font-semibold tabular-nums text-[#4A1414]">
                {formatInr(effectiveTopUpAmount > 0 ? effectiveTopUpAmount : 0)}
              </span>{" "}
              {effectiveTopUpAmount > 0 ? "to your wallet" : "— pick or enter an amount"}
            </p>
            <button
              type="submit"
              disabled={effectiveTopUpAmount < 100}
              className="rounded-full bg-[#b8892c] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#9a7224] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Pay & add money
            </button>
          </div>
          {topUpError ? (
            <p className="text-sm font-medium text-red-700">{topUpError}</p>
          ) : null}
          {topUpSuccess ? (
            <p className="text-sm font-medium text-emerald-700">{topUpSuccess}</p>
          ) : null}
        </form>
      </section>

      <section>
        <h2 className="mb-3 font-serif text-lg font-semibold text-[#4A1414]">
          Spending overview
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#e8e0d6] bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#4A1414]/50">
              This month
            </p>
            <p className="mt-2 text-xl font-semibold tabular-nums text-[#4A1414]">
              {formatInr(props.expenseSummary.thisMonthInr)}
            </p>
            <p className="mt-1 text-xs text-[#4A1414]/55">Paid from wallet</p>
          </div>
          <div className="rounded-2xl border border-[#e8e0d6] bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#4A1414]/50">
              Lifetime spend
            </p>
            <p className="mt-2 text-xl font-semibold tabular-nums text-[#4A1414]">
              {formatInr(props.expenseSummary.lifetimeSpendInr)}
            </p>
            <p className="mt-1 text-xs text-[#4A1414]/55">Via MehndiWalaa wallet</p>
          </div>
          <div className="rounded-2xl border border-[#e8e0d6] bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#4A1414]/50">
              Credits earned
            </p>
            <p className="mt-2 text-xl font-semibold tabular-nums text-emerald-700">
              {formatInr(props.expenseSummary.creditsEarnedInr)}
            </p>
            <p className="mt-1 text-xs text-[#4A1414]/55">Cashback & promos</p>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-5">
        <section className="lg:col-span-3">
          <h2 className="mb-3 font-serif text-lg font-semibold text-[#4A1414]">
            Transaction history
          </h2>
          <div className="overflow-hidden rounded-2xl border border-[#e8e0d6] bg-white shadow-sm">
            <ul className="divide-y divide-[#f0ebe4]">
              {allTransactions.map((t) => (
                <li
                  key={t.id}
                  className="flex flex-wrap items-start justify-between gap-3 px-4 py-3.5 sm:px-5"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-[#4A1414]">{t.title}</p>
                    {t.subtitle ? (
                      <p className="text-sm text-[#4A1414]/55">{t.subtitle}</p>
                    ) : null}
                    <p className="mt-1 text-xs text-[#4A1414]/45">
                      {new Date(t.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={
                        t.type === "credit"
                          ? "text-base font-semibold tabular-nums text-emerald-700"
                          : "text-base font-semibold tabular-nums text-[#4A1414]"
                      }
                    >
                      {t.type === "credit" ? "+" : "−"}
                      {formatInr(t.amountInr)}
                    </span>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#4A1414]/40">
                      {t.category.replace(/_/g, " ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-6 lg:col-span-2">
          <div>
            <h2 className="mb-3 font-serif text-lg font-semibold text-[#4A1414]">
              Offers & coupons
            </h2>
            <ul className="space-y-3">
              {props.offers.map((o) => (
                <li
                  key={o.id}
                  className={
                    o.highlight === "green"
                      ? "rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-4"
                      : "rounded-2xl border border-[#e8e0d6] bg-[#FFF9F0] p-4"
                  }
                >
                  <p className="font-semibold text-[#4A1414]">{o.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#4A1414]/70">
                    {o.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    {o.code ? (
                      <span className="rounded-lg bg-white px-2 py-1 font-mono font-semibold text-[#4A1414] ring-1 ring-[#e8e0d6]">
                        {o.code}
                      </span>
                    ) : null}
                    {o.expiresAt ? (
                      <span className="text-[#4A1414]/50">
                        Valid till{" "}
                        {new Date(o.expiresAt).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#e8e0d6] bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-[#4A1414]">Activate a code</h3>
            <p className="mt-1 text-sm text-[#4A1414]/60">
              Try demo codes:{" "}
              <span className="font-mono text-xs font-semibold text-[#b8892c]">
                WELCOME500
              </span>
              ,{" "}
              <span className="font-mono text-xs font-semibold text-[#b8892c]">
                FIRST1000
              </span>
              ,{" "}
              <span className="font-mono text-xs font-semibold text-[#b8892c]">
                MEHNDI250
              </span>
              ,{" "}
              <span className="font-mono text-xs font-semibold text-[#b8892c]">
                BRIDAL750
              </span>
              .
            </p>
            <form onSubmit={redeem} className="mt-4 space-y-3">
              <label className="block text-sm font-medium text-[#4A1414]">
                Coupon or offer code
                <input
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="e.g. WELCOME500"
                  className="mt-2 w-full rounded-xl border border-[#e8e0d6] bg-[#FFFDF5] px-3 py-2.5 text-sm font-mono uppercase text-[#4A1414] outline-none ring-0 placeholder:text-[#4A1414]/35 focus:border-[#b8892c] focus:ring-2 focus:ring-[#d4a84b]/30"
                  autoComplete="off"
                />
              </label>
              {formError ? (
                <p className="text-sm font-medium text-red-700">{formError}</p>
              ) : null}
              {formSuccess ? (
                <p className="text-sm font-medium text-emerald-700">{formSuccess}</p>
              ) : null}
              <button
                type="submit"
                className="w-full rounded-full bg-[#4A1414] py-2.5 text-sm font-semibold text-white transition hover:bg-[#3a1010]"
              >
                Apply to wallet
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
