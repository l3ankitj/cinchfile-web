import { Resend } from "resend";
import { formatPaise } from "@/lib/pricing";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[cinchfile] Skipping email: RESEND_API_KEY is not set");
    }
    return null;
  }
  return new Resend(apiKey);
}

/** Sent to the customer, only if they provided an email at checkout. */
export async function sendOrderConfirmationEmail(params: {
  toEmail: string;
  customerName: string;
  orderNumber: string;
  totalPaise: number;
  etaMinDays: number;
  etaMaxDays: number;
}) {
  const resend = getResend();
  if (!resend) return;

  const from = process.env.NOTIFICATION_FROM ?? "Cinchfile <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to: [params.toEmail],
    subject: `Order confirmed — ${params.orderNumber}`,
    html: `
      <p>Hi ${escapeHtml(params.customerName)},</p>
      <p>Your print order <strong>${escapeHtml(params.orderNumber)}</strong> is confirmed and being processed.</p>
      <ul>
        <li><strong>Amount paid:</strong> ${formatPaise(params.totalPaise)}</li>
        <li><strong>Estimated delivery:</strong> ${params.etaMinDays}–${params.etaMaxDays} business days</li>
      </ul>
      <p>Track your order anytime with your order number and phone number.</p>
    `,
  });
}

/** Internal notification to the ops inbox when a paid order needs fulfillment. */
export async function sendStaffOrderNotificationEmail(params: {
  orderNumber: string;
  customerName: string;
  totalPaise: number;
  fileCount: number;
}) {
  const resend = getResend();
  const to = process.env.NOTIFICATION_TO;
  if (!resend || !to) return;

  const from = process.env.NOTIFICATION_FROM ?? "Cinchfile <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to: [to],
    subject: `New paid order: ${params.orderNumber}`,
    html: `
      <p>A new order is ready for fulfillment.</p>
      <ul>
        <li><strong>Order:</strong> ${escapeHtml(params.orderNumber)}</li>
        <li><strong>Customer:</strong> ${escapeHtml(params.customerName)}</li>
        <li><strong>Total:</strong> ${formatPaise(params.totalPaise)}</li>
        <li><strong>Files:</strong> ${params.fileCount}</li>
      </ul>
      <p>Open the admin dashboard to view and download files.</p>
    `,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
