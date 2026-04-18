import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, company, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: "VoltScale Partners <james@voltscalepartners.com>",
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: email,
    subject: `New enquiry from ${name}${company ? ` at ${company}` : ""}`,
    text: `Name: ${name}\nCompany: ${company || "—"}\nEmail: ${email}\n\n${message}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#0f8a6b;margin-bottom:4px;">New Contact Form Submission</h2>
        <hr style="border:1px solid #e2e8f0;margin-bottom:24px;" />
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#64748b;width:100px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Company</td><td style="padding:8px 0;">${company || "—"}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#0f8a6b;">${email}</a></td></tr>
        </table>
        <hr style="border:1px solid #e2e8f0;margin:24px 0;" />
        <p style="color:#334155;line-height:1.6;white-space:pre-wrap;">${message}</p>
      </div>
    `,
  })

  if (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
