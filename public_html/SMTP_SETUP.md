# SMTP Email Setup Guide for Contact Form

## Overview
This guide provides multiple options for setting up SMTP email functionality for your contact form.

## Option 1: Formspree (Recommended - Easiest)

### Setup Steps:
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Create a new form
4. Get your form endpoint URL (e.g., `https://formspree.io/f/xpzgkqyz`)
5. Update the JavaScript code:

```javascript
// In public_html/js/main.js, line 171:
const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
```

### Features:
- ✅ Uses SMTP behind the scenes
- ✅ 50 submissions/month free
- ✅ Spam protection
- ✅ Email notifications
- ✅ No server required

---

## Option 2: Netlify Forms (If hosting on Netlify)

### Setup Steps:
1. Deploy your site to Netlify
2. The form is already configured with `netlify` attribute
3. Go to Netlify dashboard → Forms
4. Configure email notifications in Settings

### Features:
- ✅ Built-in SMTP
- ✅ 100 submissions/month free
- ✅ Spam filtering
- ✅ Email notifications
- ✅ Form submissions dashboard

---

## Option 3: Custom SMTP Server (Advanced)

### Using Node.js + Nodemailer:

1. **Create a serverless function** (Vercel/Netlify Functions):

```javascript
// api/send-email.js
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { name, email, phone, company, service, budget, message } = JSON.parse(event.body);

    // Create SMTP transporter
    const transporter = nodemailer.createTransporter({
        host: 'smtp.gmail.com', // Your SMTP host
        port: 587,
        secure: false,
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-app-password' // Use App Password for Gmail
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'your-email@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send email' })
        };
    }
};
```

2. **Update the JavaScript** to call your function:

```javascript
// In sendEmailViaSMTP function:
const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});
```

---

## Option 4: Third-Party SMTP Services

### SendGrid:
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get API key
3. Use their API to send emails

### Mailgun:
1. Sign up at [mailgun.com](https://mailgun.com)
2. Get API key
3. Use their API to send emails

### AWS SES:
1. Set up AWS SES
2. Use AWS SDK to send emails

---

## Gmail SMTP Configuration

If using Gmail SMTP directly:

### SMTP Settings:
- **Host:** smtp.gmail.com
- **Port:** 587 (TLS) or 465 (SSL)
- **Security:** TLS/SSL
- **Authentication:** Required

### App Password Setup:
1. Enable 2-Factor Authentication on Gmail
2. Go to Google Account Settings
3. Security → App Passwords
4. Generate app password for "Mail"
5. Use this password instead of your regular password

---

## Testing Your Setup

1. **Fill out the contact form**
2. **Check browser console** for any errors
3. **Verify email delivery** in your inbox
4. **Test spam protection** (try submitting without filling required fields)

---

## Troubleshooting

### Common Issues:
- **CORS errors:** Make sure your API endpoint allows cross-origin requests
- **SMTP authentication failed:** Check your credentials and app password
- **Form not submitting:** Check browser console for JavaScript errors
- **Emails not received:** Check spam folder and SMTP configuration

### Debug Steps:
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Submit the form
4. Look for error messages
5. Check Network tab for failed requests

---

## Security Considerations

- **Never expose SMTP credentials** in frontend code
- **Use environment variables** for sensitive data
- **Implement rate limiting** to prevent spam
- **Validate and sanitize** all form inputs
- **Use HTTPS** for all communications

---

## Recommended Solution

For a static website, **Formspree** is the easiest and most reliable option:

1. Sign up at formspree.io
2. Get your form endpoint
3. Update the JavaScript with your endpoint
4. Test the form

This provides SMTP functionality without requiring server setup or complex configuration.
