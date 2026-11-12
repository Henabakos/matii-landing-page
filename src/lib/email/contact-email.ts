import { Resend } from "resend";

export type ContactEmailInquiry = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

/**
 * Emails a new inquiry to the team via Resend. Replies go straight to the sender.
 * Returns false (and never throws) when email is not configured or fails, since
 * the inquiry is already saved in /admin/inquiries.
 */
export async function sendContactInquiryEmail(inquiry: ContactEmailInquiry): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL?.split(",").map(address => address.trim()).filter(Boolean);
  if (!apiKey || !from || !to?.length) {
    console.warn("[contact] RESEND_API_KEY, CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL is not set; inquiry saved without email.");
    return false;
  }

  const rows: [string, string | null | undefined][] = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone],
    ["Company", inquiry.company],
    ["Service", inquiry.service],
    ["Budget", inquiry.budget],
  ];
  const filled = rows.filter((row): row is [string, string] => Boolean(row[1]));

  const text = [...filled.map(([label, value]) => `${label}: ${value}`), "", inquiry.message].join("\n");
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#292c2e">
      <h2 style="margin:0 0 16px;font-size:18px">New website inquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${filled.map(([label, value]) => `<tr><td style="color:#797f8b;vertical-align:top">${label}</td><td>${escapeHtml(value)}</td></tr>`).join("")}
      </table>
      <p style="margin:16px 0 4px;color:#797f8b">Message</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>
    </div>`;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: inquiry.email,
      subject: `New inquiry from ${inquiry.name}${inquiry.service ? ` · ${inquiry.service}` : ""}`,
      text,
      html,
    });
    if (error) {
      console.error("[contact] Resend rejected the inquiry email:", error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[contact] Unable to send inquiry email:", error instanceof Error ? error.message : error);
    return false;
  }
}
