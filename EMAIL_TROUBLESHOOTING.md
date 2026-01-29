# Email Troubleshooting Guide

## Current Email Configuration

- **Sending Email**: `rupinirudroju@gmail.com`
- **Receiving Email (Admin)**: `rupinirudroju28@gmail.com`
- **SMTP Server**: Gmail (`smtp.gmail.com:587`)

## Common Issues and Solutions

### 1. Authentication Error (EAUTH)

**Problem**: Gmail is rejecting the login credentials.

**Solutions**:
1. **Use App Password instead of regular password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Enable 2-Step Verification first (if not already enabled)
   - Generate an App Password for "Mail"
   - Use the 16-character App Password (spaces will be removed automatically)

2. **Check if "Less secure app access" is enabled** (older Gmail accounts):
   - Go to: https://myaccount.google.com/lesssecureapps
   - Enable it (if available)

3. **Verify the email and password are correct**:
   - Make sure there are no extra spaces
   - The password should be the App Password, not your regular Gmail password

### 2. Connection Error (ECONNECTION/ETIMEDOUT)

**Problem**: Cannot connect to Gmail SMTP server.

**Solutions**:
1. Check internet connection
2. Check firewall settings - port 587 should be open
3. Try using port 465 with `secure: true` instead
4. Check if your network blocks SMTP connections

### 3. Emails Not Being Received

**Problem**: Emails are sent but not received.

**Solutions**:
1. Check spam/junk folder
2. Check email filters
3. Verify recipient email address is correct
4. Check Gmail sending limits (500 emails/day for free accounts)

## Testing Email Configuration

### Method 1: Use Test Endpoint

Visit or call:
```
GET http://localhost:5000/api/test-email
```

This will:
- Test the email connection
- Send a test email to the admin email
- Return detailed error information if it fails

### Method 2: Check Server Logs

When you submit the contact form, check the server console for:
- `📧 Starting email sending process...`
- `✅ Email connection verified successfully`
- `✅ User confirmation email sent successfully`
- `✅ Admin notification email sent successfully`

If you see errors, they will show:
- Error code (EAUTH, ECONNECTION, etc.)
- Detailed error message
- Troubleshooting suggestions

## Quick Fix Checklist

1. ✅ Verify Gmail App Password is being used (not regular password)
2. ✅ Check that 2-Step Verification is enabled
3. ✅ Verify email addresses are correct
4. ✅ Test using `/api/test-email` endpoint
5. ✅ Check server logs for detailed error messages
6. ✅ Check spam folder for test emails
7. ✅ Verify internet connection and firewall settings

## Environment Variables

You can override email settings using environment variables:

```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_RECEIVER=admin@example.com
```

## Still Not Working?

1. Check the server console logs for detailed error messages
2. Try the test endpoint: `GET /api/test-email`
3. Verify the App Password is correct
4. Check if Gmail account has any restrictions
5. Try sending from a different Gmail account

