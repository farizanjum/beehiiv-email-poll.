🗳️ Beehiiv Email Poll (Free & Open Source)
A free, open-source poll system you can embed directly into your Beehiiv newsletters — no paid plan required.

Built with Next.js + Vercel KV (Upstash Redis), this lets your subscribers vote with a single click in your email. You get live results without touching Beehiiv’s subscription tiers.

✨ Features
✅ 100% Free – No need for Beehiiv’s paid poll feature.

✅ One-click voting – Buttons inside your email are just links.

✅ Live results page – Share or keep private.

✅ Optional deduping – One vote per subscriber (via email hash).

✅ Privacy-friendly – No raw emails stored, only hashed.

✅ Works everywhere – Outlook, Gmail, Apple Mail (VML + table-safe HTML).

✅ Deploy in minutes – Runs on Vercel free tier.

🚀 How It Works
Add a Custom HTML block in your Beehiiv newsletter.
Each poll option is a link like:
https://your-app.vercel.app/api/vote?choice=breakdowns&e={{email}}

choice = the unique identifier for the poll option.

e={{email}} = Beehiiv merge tag (optional, enables one-vote-per-subscriber).

When a reader clicks a button:

The vote is recorded in Vercel KV (Redis).

They are redirected to a thank you page.

Visit the /results path of your deployed app to see live counts and percentages.

🛠️ Tech Stack
Next.js (App Router)

Vercel (hosting)

Vercel KV (Upstash Redis under the hood)

Plain HTML email templates (table-based for maximum compatibility)

📦 Setup Guide
Clone this repo

git clone https://github.com/YOUR-USERNAME/beehiiv-email-poll.git
cd beehiiv-email-poll

Install dependencies

pnpm install
# or: npm install

Add KV storage
Go to Vercel → Marketplace → add Upstash Redis.
This will automatically inject two environment variables into your project:
KV_REST_API_URL
KV_REST_API_TOKEN

Deploy

vercel

Check live pages
/api/vote → vote endpoint
/thanks → thank you page
/results → results dashboard

📧 Example Email Block
The following is a complete, well-formatted HTML block designed for maximum compatibility across email clients. You can copy and paste this directly into a Beehiiv Custom HTML block.

Important: Remember to replace https://your-app.vercel.app with the URL of your deployed application.

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Poll</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #000000;">
    <!-- Main container table -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#000000">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <!-- Poll content container -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" style="padding: 10px 20px;">
                            <h2 style="color: #ffffff; font-size: 24px; margin: 0;">What should we cover next?</h2>
                            <p style="color: #cccccc; font-size: 16px; margin-top: 10px;">Click to cast your vote!</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-top: 20px;">
                            <!-- Option 1 Button -->
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
                            <!-- Option 2 Button -->
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
                            <!-- Option 3 Button -->
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

🔒 Privacy
Votes can be anonymous (by not including the &e={{email}} parameter). If email deduping is enabled, we hash emails with SHA-256 before storing — never the raw email addresses.

📊 Demo
Vote: your-app.vercel.app/api/vote?choice=breakdowns

Results: your-app.vercel.app/results

🙌 Contributing
We welcome contributions! Please open an issue or a pull request if you want to add features like:

Multi-poll support

CSV export of results

Fancy charts for the results page

📜 License
This project is licensed under the MIT License — it's free to use, modify, and share.

Built for the indie newsletter community 💌
