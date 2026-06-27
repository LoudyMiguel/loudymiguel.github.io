# 📧 EmailJS Setup (2 minutes)

Your contact form is wired to **EmailJS**. You already have your **Service ID**
(`service_twi2jbn`). You just need two more values: the **Template ID** and the
**Public Key**. Here's exactly where to find them.

---

## Step 1 — Log in
Go to **https://dashboard.emailjs.com** and sign in (same account where you made
the service `service_twi2jbn`).

## Step 2 — Get your Public Key
1. Click your account / **Account** in the left sidebar.
2. Open the **General** tab.
3. Copy the value under **Public Key** (looks like `AbC123xYz...`).

## Step 3 — Create / get your Template ID
1. Click **Email Templates** in the left sidebar.
2. If you don't have one yet, click **Create New Template**.
3. In the template body, use these variables so the form fields map correctly:

   ```
   Subject:  New message: {{subject}}

   From:     {{from_name}} <{{reply_to}}>

   {{message}}
   ```

   > These names must match the form: `from_name`, `reply_to`, `subject`, `message`.

4. Set the **"To Email"** to `loudymigueltorrejas2023@gmail.com`.
5. Set the **"Reply To"** field to `{{reply_to}}`.
6. **Save**, then copy the **Template ID** at the top (looks like `template_xxxxxxx`).

## Step 4 — Paste both values into the code
Open **`js/main.js`** and edit the top block:

```js
const EMAILJS_CONFIG = {
  serviceID:  "service_twi2jbn",          // already correct
  templateID: "template_xxxxxxx",          // ⬅ paste your Template ID
  publicKey:  "AbC123xYz...",              // ⬅ paste your Public Key
};
```

## Step 5 — Test
Open `index.html`, scroll to **Contact**, send yourself a test message.
You should see a green "Message sent" toast and the email in your inbox.

---

### Notes
- The **Public Key is meant to be public** — it's safe in client-side JS. EmailJS
  protects you with domain/rate limits, not by hiding this key.
- Free tier allows **200 emails/month**, which is plenty for a portfolio.
- Until you fill in the two values, the form shows a friendly "not configured yet"
  message instead of failing silently.

---

## 🔒 Security — do these in the EmailJS dashboard

The site already has client-side protection (honeypot, time-trap, rate limiting,
validation). But client-side checks can be bypassed by a determined bot, so the
**real** protection is server-side, configured in EmailJS:

1. **Restrict to your domain (most important).**
   Account → **Security** → enable **"Allowed origins / domains"** and add:
   ```
   https://loudymiguel.github.io
   http://localhost:5500
   ```
   This stops anyone who copies your keys from sending email from another site.

2. **Turn on bot protection.**
   Account → Security → enable **reCAPTCHA** (or the built-in anti-bot), and add the
   reCAPTCHA field to the template if prompted.

3. **Set a monthly quota / usage alert** so a flood can't drain your 200/month or
   rack up costs — Account → usage limits.

4. **Use the "Block headless browsers"** option if available — it filters most
   automated abuse.

> Client-side rate limit (in `js/main.js` → `RL`): 1 send / 45s, max 5 / hour.
> Tune those numbers there if needed.
