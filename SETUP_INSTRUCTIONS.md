# Contact Form Setup Instructions

## Environment Configuration (.env file)

1. Copy `env-template.txt` to `.env`:
   ```bash
   cp env-template.txt .env
   ```

2. Edit `.env` file with your actual credentials:
   ```env
   # reCAPTCHA Configuration
   RECAPTCHA_SITE_KEY=your_actual_site_key_here
   RECAPTCHA_SECRET_KEY=your_actual_secret_key_here
   
   # SMTP Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM_EMAIL=your-email@gmail.com
   SMTP_FROM_NAME=DigitalXBrand Contact Form
   
   # Email Recipients
   RECIPIENT_EMAIL=aavi10111@gmail.com
   ```

## reCAPTCHA Setup

1. Go to https://www.google.com/recaptcha/admin
2. Create a new site or use existing one
3. Choose reCAPTCHA v2 "I'm not a robot" Checkbox
4. Add your domain (e.g., localhost, yourdomain.com)
5. Copy the Site Key and Secret Key
6. Update your `.env` file with the actual keys

## SMTP Email Setup

### For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Update `.env` file with your Gmail credentials

### For other email providers:
- Update `SMTP_HOST` in `.env` to your provider's SMTP server
- Update `SMTP_PORT` if needed (587 for TLS, 465 for SSL)

## Testing

1. Make sure your web server supports PHP
2. Ensure `.env` file exists and has correct values
3. Test the contact form
4. Check that emails are received
5. Verify reCAPTCHA is working

## Security Notes

- The `.env` file is excluded from git for security
- Never commit actual credentials to version control
- The `env-template.txt` serves as a template for setup
- Environment variables provide better security than hardcoded values
