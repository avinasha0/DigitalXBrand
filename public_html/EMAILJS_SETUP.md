# EmailJS Setup Guide for Contact Form

## Overview
This guide will help you set up EmailJS to enable the contact form to send emails to your Gmail address.

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Gmail Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail" from the list
4. Follow the setup instructions to connect your Gmail account
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact Form Submission from {{fullName}}

**Content:**
```
Hello,

You have received a new contact form submission:

Name: {{fullName}}
Email: {{email}}
Phone: {{phone}}
Company: {{company}}
Service Interested In: {{service}}
Project Budget: {{budget}}

Message:
{{message}}

Best regards,
DigitalXBrand Website
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (e.g., `user_abcdef123456`)

## Step 5: Update the Code
Replace the placeholder values in `public_html/js/main.js`:

```javascript
// Line 119: Replace YOUR_PUBLIC_KEY
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual public key

// Line 145: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
```

**Example:**
```javascript
emailjs.init('user_abcdef123456');
emailjs.send('service_abc123', 'template_xyz789', formData)
```

## Step 6: Test the Form
1. Open `contact.html` in your browser
2. Fill out the contact form
3. Click "Send Message"
4. Check your Gmail inbox for the email

## Troubleshooting
- Make sure all IDs are correct (no extra spaces or characters)
- Check browser console for error messages
- Verify Gmail service is active in EmailJS dashboard
- Ensure template variables match the form data structure

## Security Notes
- The public key is safe to use in frontend code
- EmailJS handles the email sending securely
- No sensitive information is exposed in the client-side code

## Free Plan Limits
- 200 emails per month
- Perfect for small to medium websites
- Upgrade to paid plans for higher limits

## Support
If you need help, check the EmailJS documentation or contact their support team.
