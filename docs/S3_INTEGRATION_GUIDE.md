# S3 Integration Guide - Vardaan Data Sciences

## Overview

This document describes the complete S3 integration system that handles file uploads, downloads, and exports using Render microservice with MySQL database tracking.

## 🚀 Features

### ✅ **Complete Python to JavaScript Conversion**
- **Upload**: Files are uploaded to S3 via Render microservice
- **Download**: Files can be downloaded from S3 with local saving
- **Export**: Data export in multiple formats (JSON, CSV, XML, TXT)
- **Database Tracking**: All operations tracked in MySQL database
- **Operation History**: Complete audit trail of all file operations
- **Statistics**: Comprehensive stats on file operations
- **Error Handling**: Robust error handling with operation status tracking

### ✅ **Job Application Integration**
- Resume files uploaded to S3 automatically
- File validation (PDF, DOC, DOCX only)
- Enhanced email notifications with S3 details
- Database tracking with S3 keys and operation IDs
- Secure file storage with access URLs

### ✅ **Database Features**
- **file_operations table**: Tracks all S3 operations
- **media_library table**: Organized media file storage
- **job_applications table**: Enhanced with S3 metadata
- **Indexes**: Optimized for performance
- **Operation Status**: pending, processing, completed, failed

## 📁 File Structure

```
src/backend/
├── s3Client.js          # Enhanced S3 client (converted from Python)
├── server.js            # Main server with S3 integration
├── testS3Integration.js # Comprehensive test suite
└── pricingService.js    # Additional services
```

## 🔧 Configuration

### Environment Variables

```bash
# Database Configuration
DB_HOST=vardaanwebsites.c1womgmu83di.ap-south-1.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=vardaanwebservices
DB_NAME=vardaan_ds
DB_PORT=3306

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_RECEIVER=admin@vardaan.com

# Application Configuration
NODE_ENV=production
PORT=5000
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

All required dependencies are already in `package.json`:
- `form-data`: For multipart uploads
- `axios`: HTTP client
- `mysql2`: Database connectivity
- `fs-extra`: Enhanced file operations
- `mime-types`: File type detection
- `uuid`: Unique identifier generation

### 2. Database Setup

The system automatically creates required tables:

```sql
-- File operations tracking
CREATE TABLE file_operations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operation_type ENUM('upload', 'download', 'export') NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    file_name VARCHAR(500) NOT NULL,
    s3_url TEXT,
    s3_key VARCHAR(1000),
    status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- ... additional fields with indexes
);

-- Media library
CREATE TABLE media_library (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_name VARCHAR(500) NOT NULL,
    s3_url TEXT NOT NULL,
    file_type ENUM('image', 'video', 'document') NOT NULL,
    category VARCHAR(100) NOT NULL,
    -- ... additional fields
);

-- Enhanced job applications
CREATE TABLE job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resume_file_path TEXT NOT NULL,
    resume_s3_key VARCHAR(1000),
    s3_operation_id INT,
    -- ... additional fields
);
```

### 3. Test the Integration

```bash
# Run the comprehensive test suite
node src/backend/testS3Integration.js
```

This will test:
- ✅ S3 connection via Render microservice
- ✅ MySQL database connectivity
- ✅ File upload functionality
- ✅ File download functionality
- ✅ Data export functionality
- ✅ Operation history tracking
- ✅ Statistics generation
- ✅ Job application flow simulation

## 📖 API Endpoints

### Core Functionality

#### **POST** `/api/job-application`
Enhanced job application with S3 upload

**Request**: Multipart form data
```javascript
{
    firstName: "John",
    lastName: "Doe", 
    email: "john@example.com",
    phone: "+1-555-0123",
    jobTitle: "Software Engineer",
    resume: [File] // PDF, DOC, or DOCX
}
```

**Response**:
```javascript
{
    success: true,
    message: "Application submitted successfully",
    application_id: 123,
    s3_operation_id: 456,
    resume_url: "https://s3.amazonaws.com/bucket/file.pdf",
    resume_s3_key: "uploads/user@email.com/resume.pdf",
    file_info: {
        original_name: "resume.pdf",
        size: 1234567,
        stored_name: "resume-uuid.pdf"
    },
    upload_platform: "Render",
    database_platform: "MySQL"
}
```

### S3 Operations Tracking

#### **GET** `/api/s3-operations`
Get operation history

**Query Parameters**:
- `user_id` (optional): Filter by user
- `limit` (optional): Number of results (default: 20)

**Response**:
```javascript
{
    success: true,
    operations: [
        {
            id: 1,
            operation_type: "upload",
            user_id: "user@email.com",
            file_name: "resume.pdf",
            s3_url: "https://s3.amazonaws.com/...",
            status: "completed",
            created_at: "2024-01-07T10:30:00.000Z"
        }
    ],
    count: 10
}
```

#### **GET** `/api/s3-stats`
Get comprehensive statistics

**Response**:
```javascript
{
    success: true,
    stats: {
        total_operations: 150,
        total_completed: 145,
        total_failed: 5,
        operations_by_type: [
            {
                operation_type: "upload",
                total_count: 100,
                completed_count: 98,
                failed_count: 2
            }
        ],
        recent_activity: [...]
    }
}
```

#### **GET** `/api/s3-test`
Test S3 connection health

**Response**:
```javascript
{
    success: true,
    test_results: {
        render_status: "connected",
        mysql_status: "connected", 
        overall_success: true
    }
}
```

## 💻 Usage Examples

### Using the S3 Client Directly

```javascript
const { createRenderMySQLClient } = require('./src/backend/s3Client');

// Create client
const s3Client = createRenderMySQLClient();

// Test connection
const result = await s3Client.testConnection();
console.log('Connection status:', result.overall_success);

// Upload a file
const uploadResult = await s3Client.upload(
    '/path/to/file.pdf',
    'user@email.com',
    'custom-filename.pdf',
    'job-applications'
);

if (uploadResult.success) {
    console.log('File uploaded:', uploadResult.file_info.url);
    console.log('Operation ID:', uploadResult.operation_id);
}

// Export data
const data = [
    { id: 1, name: 'Test', status: 'active' },
    { id: 2, name: 'Test 2', status: 'inactive' }
];

const exportResult = await s3Client.export(
    data,
    'json',
    'export-file.json',
    'admin-user'
);

// Get operation history
const history = await s3Client.getOperationHistory('user@email.com', 10);
console.log('Recent operations:', history);

// Get statistics
const stats = await s3Client.getOperationStats();
console.log('Total operations:', stats.total_operations);
```

### Frontend Integration (React)

```javascript
// In your career.js component
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('firstName', form.firstName);
    formData.append('lastName', form.lastName);
    formData.append('email', form.email);
    formData.append('phone', form.phone);
    formData.append('resume', form.resume);
    if (selectedJob) formData.append('jobTitle', selectedJob.title);
    
    try {
        const response = await fetch('/api/job-application', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('Application submitted!');
            console.log('S3 URL:', result.resume_url);
            console.log('Operation ID:', result.s3_operation_id);
        }
    } catch (error) {
        console.error('Upload failed:', error);
    }
};
```

## 🔍 Monitoring and Debugging

### Check Operation Status

```bash
# Get recent operations
curl "https://api.vardaands.com/api/s3-operations?limit=10"

# Get statistics
curl "https://api.vardaands.com/api/s3-stats"

# Test S3 health
curl "https://api.vardaands.com/api/s3-test"
```

### Database Queries

```sql
-- Check recent uploads
SELECT * FROM file_operations 
WHERE operation_type = 'upload' 
ORDER BY created_at DESC 
LIMIT 10;

-- Check failed operations
SELECT * FROM file_operations 
WHERE status = 'failed' 
ORDER BY created_at DESC;

-- Get upload statistics
SELECT 
    status,
    COUNT(*) as count,
    AVG(file_size) as avg_size
FROM file_operations 
WHERE operation_type = 'upload'
GROUP BY status;
```

### Log Monitoring

The system provides comprehensive logging:

```
📤 Uploading resume.pdf (1234567 bytes) via Render...
✅ Resume uploaded to S3: https://s3.amazonaws.com/bucket/file.pdf
💾 Job application saved to database with ID: 123
📝 Operation recorded in MySQL: ID 456
📸 Media file saved to library: resume.pdf
```

## 🛡️ Security Features

1. **File Validation**: Only PDF, DOC, DOCX files allowed for job applications
2. **Size Limits**: 10MB maximum file size
3. **Secure Storage**: Files stored in AWS S3 with proper access controls
4. **Operation Tracking**: Complete audit trail in database
5. **Error Handling**: Proper cleanup of temp files on failures
6. **CORS Protection**: Configured allowed origins

## 🚨 Error Handling

The system handles various error scenarios:

1. **File Upload Failures**: Temp files cleaned up, operation marked as failed
2. **Database Errors**: Graceful fallback, operation tracking continues
3. **S3 Service Unavailable**: Proper error responses with operation IDs
4. **Invalid File Types**: Files rejected with cleanup
5. **Network Timeouts**: Configurable timeouts with retry logic

## 📊 Performance Considerations

1. **Connection Pooling**: MySQL connections are pooled (10 connections)
2. **File Streaming**: Large files handled with streaming
3. **Async Operations**: All operations are asynchronous
4. **Cleanup**: Automatic temp file cleanup
5. **Indexes**: Database indexes for optimal query performance

## 🔄 Migration from Python

The JavaScript implementation includes all features from the original Python code:

| Python Feature | JavaScript Implementation | Status |
|----------------|---------------------------|---------|
| Upload to S3 | ✅ `upload()` method | Complete |
| Download from S3 | ✅ `download()` method | Complete |
| Data Export | ✅ `export()` method | Complete |
| MySQL Tracking | ✅ Enhanced database schema | Complete |
| Operation History | ✅ `getOperationHistory()` | Complete |
| Statistics | ✅ `getOperationStats()` | Complete |
| Error Handling | ✅ Comprehensive error handling | Complete |
| Connection Testing | ✅ `testConnection()` method | Complete |

## 🎯 Next Steps

1. **Production Deployment**: Deploy to your production environment
2. **Monitoring Setup**: Set up monitoring for S3 operations
3. **Backup Strategy**: Implement database backup for operation history
4. **Performance Tuning**: Monitor and optimize based on usage patterns
5. **Security Audit**: Regular security reviews of file handling

## 📞 Support

For issues or questions:
1. Check the test results: `node src/backend/testS3Integration.js`
2. Review server logs for error messages
3. Check database for operation status
4. Verify S3 service health via `/api/s3-test`

---

**✅ Your S3 integration is now complete and ready for production use!**

All files are automatically uploaded to S3, tracked in the database, and accessible via secure URLs. The system provides complete audit trails and comprehensive error handling. 