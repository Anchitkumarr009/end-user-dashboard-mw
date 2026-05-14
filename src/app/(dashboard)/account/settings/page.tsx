import { PageHeader } from "@/components/dashboard/PageHeader";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Profile settings"
        description="Manage how you appear to artists and how we reach you."
      />
      <form className="max-w-lg space-y-5 rounded-2xl border border-zinc-200/80 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
        <label className="block text-sm font-medium">
          Full name
          <input
            className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            defaultValue="Aditi Sharma"
            name="name"
          />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input
            type="email"
            className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            defaultValue="aditi@example.com"
            name="email"
          />
        </label>
        <label className="block text-sm font-medium">
          Phone (WhatsApp)
          <input
            className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
            defaultValue="+91 98765 43210"
            name="phone"
          />
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" defaultChecked className="rounded border-zinc-300" />
          Booking updates via SMS
        </label>
        <button
          type="button"
          className="rounded-full bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
