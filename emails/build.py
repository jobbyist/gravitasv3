"""
Builds the GRAVITAS.WTF email templates into emails/dist/.

Email clients ignore most CSS, so every template is a table layout with inline
styles, a system font stack (Space Grotesk / Inter where installed) and one
hosted image (the emblem). Run:  python3 emails/build.py

Supabase Auth templates use Go template variables ({{ .ConfirmationURL }} etc.)
and are pasted into Supabase > Authentication > Email Templates. Transactional
and marketing templates use {{double_brace}} placeholders that the Resend sender
fills in.
"""

import pathlib

ROOT = pathlib.Path(__file__).parent
DIST = ROOT / "dist"
ASSET_BASE = "https://gravitas.wtf/email"

OBSIDIAN = "#090909"
GRAPHITE = "#171717"
BORDER = "#303030"
MUTED = "#8B8B8B"
PAPER = "#FFFFFF"
VIOLET = "#8B7BFF"
GRADIENT = "linear-gradient(110deg,#BFC4D0 0%,#8B7BFF 52%,#BCEBFF 100%)"
DISPLAY = "'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif"
BODY = "Inter,'Helvetica Neue',Helvetica,Arial,sans-serif"


def button(label, href):
    # bgcolor fallback for clients without gradient support (Outlook).
    return f"""<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 8px">
  <tr><td bgcolor="{VIOLET}" style="border-radius:999px;background:{VIOLET};background-image:{GRADIENT}">
    <a href="{href}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:{BODY};font-size:15px;font-weight:600;color:{OBSIDIAN};text-decoration:none;border-radius:999px">{label}</a>
  </td></tr></table>"""


def p(text, muted=False, size=15):
    color = MUTED if muted else "#E6E6E6"
    return f'<p style="margin:0 0 16px;font-family:{BODY};font-size:{size}px;line-height:1.65;color:{color}">{text}</p>'


def h1(text):
    return f'<h1 style="margin:0 0 16px;font-family:{DISPLAY};font-size:28px;line-height:1.15;font-weight:700;letter-spacing:-0.02em;color:{PAPER}">{text}</h1>'


def eyebrow(text):
    return f'<p style="margin:0 0 14px;font-family:{BODY};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:{MUTED}">{text}</p>'


def rows(pairs):
    cells = "".join(
        f'<tr><td style="padding:10px 0;border-bottom:1px solid {BORDER};font-family:{BODY};font-size:13px;color:{MUTED}">{k}</td>'
        f'<td align="right" style="padding:10px 0;border-bottom:1px solid {BORDER};font-family:{BODY};font-size:13px;color:{PAPER}">{v}</td></tr>'
        for k, v in pairs
    )
    return f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 20px;border-top:1px solid {BORDER}">{cells}</table>'


def fallback_link(href):
    return p(
        f'If the button doesn’t work, paste this link into your browser:<br><a href="{href}" style="color:{VIOLET};word-break:break-all">{href}</a>',
        muted=True,
        size=12,
    )


def layout(preheader, content, footer_note, unsubscribe=False):
    unsub = (
        f' · <a href="{{{{unsubscribe_url}}}}" style="color:{MUTED};text-decoration:underline">Unsubscribe</a>'
        if unsubscribe
        else ""
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>GRAVITAS.WTF</title>
</head>
<body style="margin:0;padding:0;background:{OBSIDIAN}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">{preheader}&#8202;&#8202;&#8202;&#8202;&#8202;&#8202;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{OBSIDIAN}" style="background:{OBSIDIAN}">
<tr><td align="center" style="padding:40px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px">
    <tr><td style="padding:0 4px 28px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="vertical-align:middle"><img src="{ASSET_BASE}/emblem-96.png" width="32" height="32" alt="" style="display:block;border:0"></td>
        <td style="vertical-align:middle;padding-left:12px;font-family:{DISPLAY};font-size:13px;font-weight:500;letter-spacing:0.42em;color:{PAPER}">GRAVITAS<span style="color:{MUTED};font-size:9px;letter-spacing:0.2em;vertical-align:top">.WTF</span></td>
      </tr></table>
    </td></tr>
    <tr><td bgcolor="{GRAPHITE}" style="background:{GRAPHITE};border:1px solid {BORDER};border-radius:16px;overflow:hidden">
      <div style="height:3px;line-height:3px;font-size:0;background:{VIOLET};background-image:{GRADIENT}">&nbsp;</div>
      <div style="padding:36px 32px 28px">{content}</div>
    </td></tr>
    <tr><td style="padding:24px 4px 0">
      <p style="margin:0 0 8px;font-family:{BODY};font-size:12px;line-height:1.6;color:{MUTED}">{footer_note}</p>
      <p style="margin:0;font-family:{BODY};font-size:11px;line-height:1.6;color:#5f5f5f">Gravitas Industries (Pty) Ltd · Reg. 2024/596436/07 · South Africa<br>
      <a href="https://gravitas.wtf" style="color:{MUTED};text-decoration:none">gravitas.wtf</a> · <a href="mailto:hey@gravitas.wtf" style="color:{MUTED};text-decoration:none">hey@gravitas.wtf</a>{unsub}</p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>
"""


AUTH_FOOTER = "You received this email because someone used this address on gravitas.wtf. If that wasn’t you, you can safely ignore it."

templates = {
    # --------------------------- Supabase Auth ---------------------------
    "supabase/magic-link.html": (
        "Your Gravitas sign-in link",
        "Your sign-in link for gravitas.wtf. It expires in one hour.",
        eyebrow("Sign in")
        + h1("Your sign-in link")
        + p("Use the button below to sign in to Gravitas. No password needed.")
        + button("Sign in to Gravitas", "{{ .ConfirmationURL }}")
        + p("This link expires in one hour and can only be used once.", muted=True, size=13)
        + fallback_link("{{ .ConfirmationURL }}"),
        AUTH_FOOTER,
    ),
    "supabase/confirm-signup.html": (
        "Confirm your Gravitas account",
        "Confirm your email to finish creating your Gravitas account.",
        eyebrow("Welcome")
        + h1("Confirm your email")
        + p("Thanks for joining Gravitas. Confirm this address and your account is ready.")
        + button("Confirm email", "{{ .ConfirmationURL }}")
        + fallback_link("{{ .ConfirmationURL }}"),
        AUTH_FOOTER,
    ),
    "supabase/invite.html": (
        "You’re invited to Gravitas",
        "You’ve been invited to a Gravitas account.",
        eyebrow("Invitation")
        + h1("You’re invited")
        + p("The Gravitas team has created an account for you on gravitas.wtf, where you can follow your project, review deliverables and manage invoices.")
        + button("Accept invitation", "{{ .ConfirmationURL }}")
        + fallback_link("{{ .ConfirmationURL }}"),
        "You received this because the Gravitas team invited this address. Not expecting it? Reply to hey@gravitas.wtf.",
    ),
    "supabase/change-email.html": (
        "Confirm your new email address",
        "Confirm the change of email on your Gravitas account.",
        eyebrow("Account")
        + h1("Confirm your new email")
        + p("You asked to change the email on your Gravitas account from {{ .Email }} to {{ .NewEmail }}. Confirm to complete the change.")
        + button("Confirm new email", "{{ .ConfirmationURL }}")
        + fallback_link("{{ .ConfirmationURL }}"),
        AUTH_FOOTER,
    ),
    "supabase/reset-password.html": (
        "Reset your Gravitas password",
        "A link to reset the password on your Gravitas account.",
        eyebrow("Account")
        + h1("Reset your password")
        + p("Gravitas sign-in is passwordless, but if you set a password you can reset it here.")
        + button("Reset password", "{{ .ConfirmationURL }}")
        + fallback_link("{{ .ConfirmationURL }}"),
        AUTH_FOOTER,
    ),
    "supabase/reauthentication.html": (
        "Your Gravitas verification code",
        "Your one-time verification code.",
        eyebrow("Verification")
        + h1("Confirm it’s you")
        + p("Enter this code to continue:")
        + f'<p style="margin:8px 0 24px;font-family:{DISPLAY};font-size:34px;font-weight:700;letter-spacing:0.3em;color:{PAPER}">{{{{ .Token }}}}</p>'
        + p("The code expires shortly. Never share it with anyone.", muted=True, size=13),
        AUTH_FOOTER,
    ),
    # ---------------------------- Transactional ----------------------------
    "transactional/enquiry-received.html": (
        "We’ve received your project enquiry",
        "Thanks for reaching out. Here’s what happens next.",
        eyebrow("Studio")
        + h1("Thanks, {{first_name}}. We’ve got it.")
        + p("Your project enquiry has reached the Gravitas Studio team. We read every enquiry ourselves and aim to reply within two business days.")
        + rows([("Reference", "{{reference}}"), ("Service", "{{service}}"), ("Timeline", "{{timeline}}"), ("Budget range", "{{budget}}")])
        + p("Want to talk sooner? Book a consultation and we’ll walk through it together.")
        + button("Book a consultation", "https://gravitas.wtf/contact"),
        "You received this because you submitted an enquiry on gravitas.wtf. Reply to this email to add details.",
    ),
    "transactional/consultation-confirmed.html": (
        "Your consultation is confirmed",
        "Your consultation with Gravitas is booked.",
        eyebrow("Consultation")
        + h1("You’re booked in")
        + p("Thanks, {{first_name}}. Your consultation with Gravitas is confirmed.")
        + rows([("Date", "{{date}}"), ("Time", "{{time}} (SAST)"), ("Duration", "{{duration}}"), ("Where", "{{meeting_link}}")])
        + p("If something comes up, reply to this email and we’ll find another time.", muted=True, size=13)
        + button("Add to calendar", "{{calendar_url}}"),
        "You received this because you booked a consultation on gravitas.wtf.",
    ),
    "transactional/invoice-issued.html": (
        "Invoice {{invoice_number}} from Gravitas",
        "A new invoice is ready in your client portal.",
        eyebrow("Billing")
        + h1("Invoice {{invoice_number}}")
        + p("Hi {{first_name}}, a new invoice for {{project_name}} is ready.")
        + rows([("Amount due", "{{amount_due}}"), ("Issued", "{{issue_date}}"), ("Due", "{{due_date}}")])
        + button("View and pay invoice", "{{invoice_url}}")
        + p("Questions about this invoice? Contact <a href=\"mailto:billing@gravitas.wtf\" style=\"color:#8B7BFF\">billing@gravitas.wtf</a>.", muted=True, size=13),
        "Sent by Gravitas Industries (Pty) Ltd to the billing contact on this account.",
    ),
    "transactional/payment-receipt.html": (
        "Payment received, thank you",
        "We’ve received your payment.",
        eyebrow("Receipt")
        + h1("Payment received")
        + p("Thanks, {{first_name}}. We’ve received your payment for invoice {{invoice_number}}.")
        + rows([("Amount paid", "{{amount_paid}}"), ("Paid on", "{{paid_date}}"), ("Method", "{{payment_method}}"), ("Reference", "{{payment_reference}}")])
        + button("Download receipt", "{{receipt_url}}"),
        "Keep this email for your records. Billing questions: billing@gravitas.wtf.",
    ),
    "transactional/admin-new-lead.html": (
        "New enquiry: {{company}} · {{service}}",
        "A new Studio enquiry needs a reply.",
        eyebrow("New lead · internal")
        + h1("{{name}} at {{company}}")
        + rows([("Email", "{{email}}"), ("Service", "{{service}}"), ("Budget", "{{budget}}"), ("Timeline", "{{timeline}}")])
        + p("{{message}}")
        + button("Open in admin", "https://gravitas.wtf/admin"),
        "Internal notification for the Gravitas team.",
    ),
    # ------------------------------- Marketing -------------------------------
    "marketing/dispatch-digest.html": (
        "This week on Dispatch",
        "New from inside Gravitas: {{lead_title}}",
        eyebrow("Dispatch · Weekly")
        + h1("The signal from inside Gravitas")
        + f'<a href="{{{{lead_url}}}}" style="text-decoration:none"><img src="{{{{lead_image}}}}" width="496" alt="" style="display:block;width:100%;max-width:496px;height:auto;border:1px solid {BORDER};border-radius:12px;margin:8px 0 18px"></a>'
        + f'<p style="margin:0 0 6px;font-family:{BODY};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:{MUTED}">{{{{lead_category}}}} · {{{{lead_date}}}}</p>'
        + f'<h2 style="margin:0 0 10px;font-family:{DISPLAY};font-size:22px;line-height:1.2;color:{PAPER}"><a href="{{{{lead_url}}}}" style="color:{PAPER};text-decoration:none">{{{{lead_title}}}}</a></h2>'
        + p("{{lead_dek}}")
        + button("Read the article", "{{lead_url}}")
        + f'<div style="height:1px;background:{BORDER};margin:24px 0"></div>'
        + eyebrow("Also on Dispatch")
        + p('<a href="{{item_2_url}}" style="color:#FFFFFF;text-decoration:none;font-weight:600">{{item_2_title}}</a><br><span style="color:#8B8B8B">{{item_2_dek}}</span>')
        + p('<a href="{{item_3_url}}" style="color:#FFFFFF;text-decoration:none;font-weight:600">{{item_3_title}}</a><br><span style="color:#8B8B8B">{{item_3_dek}}</span>'),
        "You’re receiving this because you subscribed to Dispatch on gravitas.wtf.",
        True,
    ),
    "marketing/welcome.html": (
        "Welcome to Gravitas",
        "Thanks for subscribing. Here’s what to expect.",
        eyebrow("Welcome")
        + h1("Building things that probably shouldn’t exist.")
        + p("Thanks for subscribing. You’ll get Dispatch, our editorial from inside an operating venture studio: AI, product development, venture building and what we’re shipping next.")
        + p("Coming January 2027: Community, Origin and Season 2 of the Building Gravitas podcast. Subscribers hear first.")
        + button("Start with: A New Gravitas", "https://gravitas.wtf/dispatch/a-new-gravitas"),
        "You’re receiving this because you subscribed on gravitas.wtf.",
        True,
    ),
}


def main():
    for rel, spec in templates.items():
        subject, preheader, content, footer, *rest = spec
        unsubscribe = bool(rest and rest[0])
        out = DIST / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        html = layout(preheader, content, footer, unsubscribe)
        out.write_text(f"<!-- Subject: {subject} -->\n" + html)
        print(rel)


if __name__ == "__main__":
    main()
