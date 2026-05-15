import { PageHeader } from "@/components/dashboard/PageHeader";
import { WalletPanel } from "@/components/dashboard/WalletPanel";
import {
  walletBalanceInr,
  walletExpenseSummary,
  walletOffers,
  walletTransactions,
} from "@/lib/mock-data";

export default function WalletPage() {
  return (
    <div>
      <PageHeader
        title="Wallet"
        description="Track your MehndiWalaa wallet balance, spending, and credits. Activate offer codes to add money for your next booking."
      />
      <WalletPanel
        baseBalanceInr={walletBalanceInr}
        expenseSummary={walletExpenseSummary}
        initialTransactions={walletTransactions}
        offers={walletOffers}
      />
    </div>
  );
}
