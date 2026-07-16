export default function PaystackInfo() {
  return (
    <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
      <div className="flex gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-blue-400"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-body text-xs font-semibold text-blue-300">
            Secure Payment
          </p>
          <p className="mt-0.5 font-body text-xs text-cream-dim/80">
            Your payment is encrypted and secure with Paystack.
          </p>
        </div>
      </div>
    </div>
  );
}
