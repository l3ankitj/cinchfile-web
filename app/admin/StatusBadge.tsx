const STYLES: Record<string, string> = {
  draft: "bg-surface-muted text-muted",
  pending_payment: "bg-warning/10 text-warning",
  unpaid: "bg-warning/10 text-warning",
  processing: "bg-primary/10 text-primary",
  paid: "bg-success/10 text-success",
  printed: "bg-accent/10 text-accent-hover",
  shipped: "bg-primary/10 text-primary",
  delivered: "bg-success/10 text-success",
  cancelled: "bg-danger/10 text-danger",
  failed: "bg-danger/10 text-danger",
  refunded: "bg-danger/10 text-danger",
};

const LABELS: Record<string, string> = {
  pending_payment: "Pending Payment",
};

export default function StatusBadge({ value }: { value: string }) {
  const style = STYLES[value] ?? "bg-surface-muted text-muted";
  const label = LABELS[value] ?? value.charAt(0).toUpperCase() + value.slice(1);
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold capitalize ${style}`}>
      {label}
    </span>
  );
}
