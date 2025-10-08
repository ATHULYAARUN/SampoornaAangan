# 📧 Email Configuration Guide for Firebase + MongoDB Setup

## Current Setup
Your SampoornaAngan system uses:
- **Authentication**: Firebase (for user login/logout)
- **Database**: MongoDB (for storing user data)
- **Email Service**: Gmail SMTP (for sending credentials)

## Quick Fix for Email Issue

### Step 1: Configure Gmail for App Passwords

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**:
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy the 16-character password generated

### Step 2: Update Environment Variables

Edit your `backend/.env` file:

```env
# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM=noreply@sampoornaangan.gov.in
FRONTEND_URL=http://localhost:3000
```

### Step 3: Test Email Configuration

1. **Restart your backend server**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Test using the provided test file**:
   - Open `test-worker-management.html` in your browser
   - Authenticate as admin
   - Click "Check Email Service"
   - If successful, try resending credentials

## Alternative Email Solutions

### Option 1: Use SendGrid (Recommended for Production)

1. **Install SendGrid**:
   ```bash
   npm install @sendgrid/mail
   ```

2. **Update emailService.js**:
   ```javascript
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   ```

3. **Environment variables**:
   ```env
   SENDGRID_API_KEY=your-sendgrid-api-key
   ```

### Option 2: Use Firebase Extensions

1. **Install Firebase Trigger Email Extension**:
   - Go to Firebase Console > Extensions
   - Install "Trigger Email" extension
   - Configure with your email provider

2. **Update code to use Firebase Functions**:
   ```javascript
   // Use Firebase Firestore triggers to send emails
   ```

### Option 3: Use Nodemailer with Other Providers

Update `services/emailService.js`:

```javascript
// For Outlook/Hotmail
this.transporter = nodemailer.createTransporter({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// For custom SMTP
this.transporter = nodemailer.createTransporter({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Troubleshooting

### Common Issues:

1. **"Authentication failed"**:
   - Check if 2FA is enabled
   - Verify app password is correct
   - Try generating a new app password

2. **"Email service not configured"**:
   - Check environment variables
   - Restart the server after changes
   - Verify .env file is in backend folder

3. **"Connection timeout"**:
   - Check firewall settings
   - Try different SMTP ports (587, 465, 25)
   - Verify internet connection

### Testing Commands:

```bash
# Test email configuration
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  http://localhost:5005/api/admin/check-email-config

# Test resend credentials
curl -X POST \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"workerId": "USER_ID"}' \
  http://localhost:5005/api/admin/resend-worker-credentials
```

## Security Notes

- **Never commit real credentials** to version control
- **Use environment variables** for all sensitive data
- **Rotate app passwords** regularly
- **Monitor email usage** to prevent abuse

## Current System Status

✅ **Firebase Authentication**: Working  
✅ **MongoDB Database**: Working  
❌ **Email Service**: Needs Configuration  

Once you configure the email credentials, the resend credentials functionality will work perfectly!