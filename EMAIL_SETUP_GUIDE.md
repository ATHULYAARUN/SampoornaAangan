# 📧 Email Configuration Guide

## Quick Setup for Worker Email Notifications

### 1. Gmail Configuration (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Copy the 16-character password

3. **Update Backend Environment**:
   Edit `/backend/.env`:
   ```bash
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=abcd-efgh-ijkl-mnop  # Your 16-character app password
   EMAIL_FROM=noreply@sampoornaangan.gov.in
   FRONTEND_URL=https://sampoornaangen.com
   ```

### 2. Alternative Email Services

#### SendGrid (Production Recommended)
```bash
EMAIL_SERVICE=SendGrid
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

#### AWS SES
```bash
EMAIL_SERVICE=SES
EMAIL_USER=your-aws-access-key
EMAIL_PASS=your-aws-secret-key
```

### 3. Test Email Configuration

Run the test script to verify setup:
```bash
cd backend
node test-email.js
```

### 4. Troubleshooting

**Common Issues:**

1. **"Invalid login"** → Check app password, not regular password
2. **"Self-signed certificate"** → Normal in development, works in production
3. **"Connection refused"** → Check firewall/antivirus settings
4. **"Rate limited"** → Gmail has sending limits, use SendGrid for production

### 5. Email Template Customization

To customize the email template, edit the `sendWorkerWelcomeEmail` function in:
`/backend/routes/admin.js` (lines ~1205-1285)

---

**Need Help?** Check the full implementation details in `WORKER_EMAIL_IMPLEMENTATION.md`