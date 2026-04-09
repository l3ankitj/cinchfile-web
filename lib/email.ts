import { Resend } from "resend";

export async function sendUploadNotificationEmail(params: {
  firmName: string;
  clientName: string;
  fileCount: number;
  requestId: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_TO;
  const from =
    process.env.NOTIFICATION_FROM ?? "Cinchfile <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[cinchfile] Skipping email: set RESEND_API_KEY and NOTIFICATION_TO"
      );
    }
    return;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to: [to],
    subject: `Cinchfile: files received for ${params.clientName}`,
    html: `
      <p>New upload completed.</p>
      <ul>
        <li><strong>Client:</strong> ${escapeHtml(params.clientName)}</li>
        <li><strong>Firm:</strong> ${escapeHtml(params.firmName)}</li>
        <li><strong>Files:</strong> ${params.fileCount}</li>
        <li><strong>Request ID:</strong> ${escapeHtml(params.requestId)}</li>
      </ul>
      <p>Open the admin dashboard to download files from the app.</p>
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
