-----

## 🗳️ Beehiiv Email Poll (Free & Open Source)

A free, open-source poll system you can embed directly into your **Beehiiv** newsletters, no paid plan required.

Built with **Next.js** and **Vercel KV (Upstash Redis)**, this system allows your subscribers to vote with a single click inside your email. You get live results without needing Beehiiv’s subscription tiers.

### Features

  - **100% Free**: No need for Beehiiv’s paid poll feature.
  - **One-click voting**: Buttons inside your email are simple links.
  - **Live results page**: You can choose to share this page publicly or keep it private.
  - **Optional deduping**: Limit votes to one per subscriber by using their email hash.
  - **Privacy-friendly**: We store hashed emails, not raw email addresses.
  - **Works everywhere**: Compatible with Outlook, Gmail, Apple Mail, and other major email clients (using VML and table-safe HTML).
  - **Deploy in minutes**: Runs easily on the Vercel free tier.

-----

### How It Works

1.  Add a **Custom HTML block** to your Beehiiv newsletter.
2.  Each poll option is a link structured like this:
    `https://your-app.vercel.app/api/vote?choice=breakdowns&e={{email}}`
      - `choice` = the unique identifier for the poll option.
      - `e={{email}}` = a Beehiiv merge tag that enables one-vote-per-subscriber functionality (optional).
3.  When a reader clicks a button:
      - The vote is recorded in **Vercel KV (Redis)**.
      - They are then redirected to a "thank you" page.
4.  To see live counts and percentages, visit the `/results` path of your deployed app.

-----

### Tech Stack

  - Next.js (App Router)
  - Vercel (hosting)
  - Vercel KV (Upstash Redis under the hood)
  - Plain HTML email templates (table-based for maximum compatibility)

-----

### Setup Guide

1.  **Clone this repo:**
    ```bash
    git clone https://github.com/YOUR-USERNAME/beehiiv-email-poll.git
    cd beehiiv-email-poll
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    # or: npm install
    ```
3.  **Add KV storage:**
      - Go to the Vercel Marketplace and add **Upstash Redis**.
      - This will automatically inject two environment variables into your project: `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
4.  **Deploy:**
    ```bash
    vercel
    ```
5.  **Check live pages:**
      - `/api/vote` → vote endpoint
      - `/thanks` → thank you page
      - `/results` → results dashboard

-----

### 📧 Example Email Block

This is a complete, well-formatted HTML block designed for maximum compatibility across email clients. You can copy and paste this directly into a Beehiiv Custom HTML block.

**Important**: Remember to replace `https://your-app.vercel.app` with the URL of your deployed application.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Poll</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #000000;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#000000">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" style="padding: 10px 20px;">
                            <h2 style="color: #ffffff; font-size: 24px; margin: 0;">What should we cover next?</h2>
                            <p style="color: #cccccc; font-size: 16px; margin-top: 10px;">Click to cast your vote!</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 20px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="background-color: #ffffff; border-radius: 8px;">
                                        <a href="https://your-app.vercel.app/api/vote?choice=breakdowns&e={{email}}" target="_blank" style="font-size: 16px; font-weight: bold; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; display: inline-block; padding: 12px 24px; border-radius: 8px;">
                                            Company Breakdowns
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 15px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="background-color: #ffffff; border-radius: 8px;">
                                        <a href="https://your-app.vercel.app/api/vote?choice=tactical&e={{email}}" target="_blank" style="font-size: 16px; font-weight: bold; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; display: inline-block; padding: 12px 24px; border-radius: 8px;">
                                            Tactical Tuesday
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 15px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="background-color: #ffffff; border-radius: 8px;">
                                        <a href="https://your-app.vercel.app/api/vote?choice=both&e={{email}}" target="_blank" style="font-size: 16px; font-weight: bold; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #000000; text-decoration: none; display: inline-block; padding: 12px 24px; border-radius: 8px;">
                                            Both / Alternate Weekly
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
```

-----

### Privacy

Votes can be anonymous by simply not including the `&e={{email}}` parameter. If email deduping is enabled, we use **SHA-256** to hash emails before storing them, ensuring that raw email addresses are never saved.

-----

### Demo

  - **Vote**: `your-app.vercel.app/api/vote?choice=breakdowns`
  - **Results**: `your-app.vercel.app/results`

-----

### 🙌 Contributing

We welcome contributions\! Please open an issue or a pull request if you want to add features like:

  - Multi-poll support
  - CSV export of results
  - Fancy charts for the results page

-----

### License

This project is licensed under the **MIT License**—it's free to use, modify, and share.

Built for the indie newsletter community 💌
