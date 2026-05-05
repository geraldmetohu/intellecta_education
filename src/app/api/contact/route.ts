import { NextResponse } from "next/server";
import { siteContact } from "@/lib/siteContact";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  studyLevel: string;
  intake: string;
  message: string;
  company?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactPayload;

    if (data.company?.trim()) {
      return NextResponse.json({ ok: true, message: "Thanks for your enquiry." });
    }

    const name = data.name?.trim() ?? "";
    const email = data.email?.trim().toLowerCase() ?? "";
    const phone = data.phone?.trim() ?? "";
    const studyLevel = data.studyLevel?.trim() ?? "";
    const intake = data.intake?.trim() ?? "";
    const message = data.message?.trim() ?? "";

    if (!name || !email || !phone || !studyLevel || !intake || !message) {
      return NextResponse.json(
        { ok: false, message: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const resendFrom =
      process.env.RESEND_FROM?.trim() || "Intellecta Education <onboarding@resend.dev>";
    const enquiryRecipient = process.env.CONTACT_TO?.trim() || siteContact.email;

    if (!resendApiKey) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Email sending is almost ready. Add your RESEND_API_KEY and a verified RESEND_FROM sender in .env.local to activate the enquiry form.",
        },
        { status: 500 }
      );
    }

    const subject = `New Intellecta enquiry from ${name}`;
    const text = [
      "New Intellecta enquiry",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone/WhatsApp: ${phone}`,
      `Study level: ${studyLevel}`,
      `Target intake: ${intake}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <h2>New Intellecta enquiry</h2>
        <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><strong>Phone/WhatsApp</strong></td><td>${escapeHtml(phone)}</td></tr>
          <tr><td><strong>Study level</strong></td><td>${escapeHtml(studyLevel)}</td></tr>
          <tr><td><strong>Target intake</strong></td><td>${escapeHtml(intake)}</td></tr>
        </table>
        <h3 style="margin-top:16px;">Message</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [enquiryRecipient],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error("Resend send failed:", errorText);

      return NextResponse.json(
        {
          ok: false,
          message:
            "The enquiry could not be sent. Please check your Resend API key, verified sender address, and recipient inbox setup.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Your enquiry has been sent. We will get back to you shortly.",
    });
  } catch (error) {
    console.error("Contact API failed:", error);

    return NextResponse.json(
      { ok: false, message: "Something went wrong while sending your enquiry." },
      { status: 500 }
    );
  }
}
