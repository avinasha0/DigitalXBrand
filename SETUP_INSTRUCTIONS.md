# Contact Form Setup Instructions

## reCAPTCHA Setup

1. Go to https://www.google.com/recaptcha/admin
2. Create a new site or use existing one
3. Choose reCAPTCHA v2 "I'm not a robot" Checkbox
4. Add your domain (e.g., localhost, yourdomain.com)
5. Copy the Site Key
6. Edit `recaptcha-config.php` and replace the test key with your actual site key:
   ```php
   $recaptcha_site_key = 'YOUR_ACTUAL_SITE_KEY_HERE';
   ```

## SMTP Email Setup

1. Edit `send-email-simple.php`
2. Update the SMTP settings:
   ```php
   $smtp_host = 'smtp.gmail.com'; // Your SMTP host
   $smtp_username = 'your-email@gmail.com'; // Your email
   $smtp_password = 'your-app-password'; // Your app password
   $smtp_from_email = 'your-email@gmail.com'; // Your email
   $recipient_email = 'aavi10111@gmail.com'; // Where to receive emails
   ```

### For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password as $smtp_password

### For other email providers:
- Update $smtp_host to your provider's SMTP server
- Update $smtp_port if needed (587 for TLS, 465 for SSL)

## Testing

1. Make sure your web server supports PHP
2. Test the contact form
3. Check that emails are received
4. Verify reCAPTCHA is working

## Security Notes

- The configuration files are excluded from git for security
- Never commit actual credentials to version control
- Use environment variables in production
