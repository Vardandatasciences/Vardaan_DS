const { createRenderMySQLClient } = require('./s3Client');
const path = require('path');
const fs = require('fs-extra');

// Accordion videos configuration
const accordionVideos = [
    {
        fileName: 'Dashboard.mp4',
        displayName: 'Dashboard',
        category: 'Home-Accordion',
        displayOrder: 1,
        isActive: 1
    },
    {
        fileName: 'Time Lapse.mp4',
        displayName: 'Time Lapse',
        category: 'Home-Accordion',
        displayOrder: 2,
        isActive: 1
    },
    {
        fileName: 'about_vardaan_hero.mp4',
        displayName: 'About Vardaan Hero',
        category: 'Home-Accordion',
        displayOrder: 3,
        isActive: 1
    },
    {
        fileName: 'ai1.mp4',
        displayName: 'AI Demo',
        category: 'Home-Accordion',
        displayOrder: 4,
        isActive: 1
    },
    {
        fileName: 'data_engineeing_herov.mp4',
        displayName: 'Data Engineering Hero',
        category: 'Home-Accordion',
        displayOrder: 5,
        isActive: 1
    },
    {
        fileName: 'data_science1.mp4',
        displayName: 'Data Science Demo',
        category: 'Home-Accordion',
        displayOrder: 6,
        isActive: 1
    },
    {
        fileName: 'data_strategy_herov.mp4',
        displayName: 'Data Strategy Hero',
        category: 'Home-Accordion',
        displayOrder: 7,
        isActive: 1
    },
    {
        fileName: 'end-to-end-dev.mp4',
        displayName: 'End-to-End Development',
        category: 'Home-Accordion',
        displayOrder: 8,
        isActive: 1
    },
    {
        fileName: 'grc.mp4',
        displayName: 'RiskaVaire Platform',
        category: 'Home-Accordion',
        displayOrder: 9,
        isActive: 1
    },
    {
        fileName: 'image_processing1.mp4',
        displayName: 'Image Processing',
        category: 'Home-Accordion',
        displayOrder: 10,
        isActive: 1
    }
];

async function updateMediaLibraryTable() {
    const client = createRenderMySQLClient();
    
    try {
        // Test connection first
        const connectionTest = await client.testConnection();
        console.log('🔍 Connection test result:', connectionTest);
        
        if (!connectionTest.overall_success) {
            throw new Error('Database connection failed');
        }
        
        // Update media_library table to add display fields
        const connection = await client.dbPool.getConnection();
        
        try {
            // Add new columns for display configuration
            await connection.execute(`
                ALTER TABLE media_library 
                ADD COLUMN IF NOT EXISTS display_name VARCHAR(255) NULL,
                ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0,
                ADD COLUMN IF NOT EXISTS is_active TINYINT(1) DEFAULT 1,
                ADD COLUMN IF NOT EXISTS content_disposition VARCHAR(50) DEFAULT 'inline'
            `);
            
            console.log('✅ Media library table updated with display fields');
            
        } catch (error) {
            console.log('ℹ️ Table already has display fields or update not needed:', error.message);
        } finally {
            connection.release();
        }
        
    } catch (error) {
        console.error('❌ Failed to update media library table:', error);
        throw error;
    }
}

async function uploadAccordionVideos() {
    const client = createRenderMySQLClient();
    const videosDir = path.join(__dirname, '../../assets/videos');
    
    try {
        // Update table structure first
        await updateMediaLibraryTable();
        
        console.log('🚀 Starting accordion videos upload...');
        console.log(`📁 Videos directory: ${videosDir}`);
        
        const results = [];
        
        for (const videoConfig of accordionVideos) {
            const videoPath = path.join(videosDir, videoConfig.fileName);
            
            // Check if file exists
            if (!await fs.pathExists(videoPath)) {
                console.warn(`⚠️ File not found: ${videoPath}`);
                continue;
            }
            
            console.log(`\n📤 Uploading: ${videoConfig.fileName}`);
            console.log(`📝 Display Name: ${videoConfig.displayName}`);
            console.log(`🏷️ Category: ${videoConfig.category}`);
            
            try {
                // Upload video with display configuration
                const displayConfig = {
                    display_name: videoConfig.displayName,
                    display_order: videoConfig.displayOrder,
                    is_active: videoConfig.isActive,
                    content_disposition: 'inline'
                };
                
                const uploadResult = await client.uploadWithMediaLibrary(
                    videoPath,
                    'accordion-uploader',
                    videoConfig.fileName,
                    videoConfig.category,
                    displayConfig
                );
                
                if (uploadResult.success) {
                    console.log('✅ Upload successful');
                    
                    results.push({
                        fileName: videoConfig.fileName,
                        success: true,
                        s3Url: uploadResult.file_info.url,
                        displayName: videoConfig.displayName
                    });
                    
                } else {
                    console.error('❌ Upload failed:', uploadResult.error);
                    results.push({
                        fileName: videoConfig.fileName,
                        success: false,
                        error: uploadResult.error
                    });
                }
                
            } catch (error) {
                console.error(`❌ Error uploading ${videoConfig.fileName}:`, error.message);
                results.push({
                    fileName: videoConfig.fileName,
                    success: false,
                    error: error.message
                });
            }
        }
        
        // Summary
        console.log('\n📊 Upload Summary:');
        const successful = results.filter(r => r.success);
        const failed = results.filter(r => !r.success);
        
        console.log(`✅ Successful: ${successful.length}`);
        console.log(`❌ Failed: ${failed.length}`);
        
        if (successful.length > 0) {
            console.log('\n✅ Successfully uploaded videos:');
            successful.forEach(result => {
                console.log(`  - ${result.displayName} (${result.fileName})`);
                console.log(`    URL: ${result.s3Url}`);
            });
        }
        
        if (failed.length > 0) {
            console.log('\n❌ Failed uploads:');
            failed.forEach(result => {
                console.log(`  - ${result.fileName}: ${result.error}`);
            });
        }
        
        return results;
        
    } catch (error) {
        console.error('❌ Upload process failed:', error);
        throw error;
    }
}

async function verifyUploads() {
    const client = createRenderMySQLClient();
    
    try {
        const connection = await client.dbPool.getConnection();
        
        try {
            // Get all accordion videos from database
            const [rows] = await connection.execute(`
                SELECT id, original_name, s3_url, display_name, display_order, is_active, content_disposition
                FROM media_library 
                WHERE category = 'Home-Accordion'
                ORDER BY display_order
            `);
            
            console.log('\n🔍 Verification Results:');
            console.log(`📊 Total accordion videos in database: ${rows.length}`);
            
            rows.forEach(row => {
                console.log(`\n📹 Video ID: ${row.id}`);
                console.log(`📝 Original Name: ${row.original_name}`);
                console.log(`🏷️ Display Name: ${row.display_name || 'NULL'}`);
                console.log(`📊 Display Order: ${row.display_order}`);
                console.log(`✅ Active: ${row.is_active ? 'Yes' : 'No'}`);
                console.log(`🎬 Content Disposition: ${row.content_disposition || 'inline'}`);
                console.log(`🔗 S3 URL: ${row.s3_url}`);
            });
            
        } finally {
            connection.release();
        }
        
    } catch (error) {
        console.error('❌ Verification failed:', error);
    }
}

// Main execution
async function main() {
    try {
        console.log('🎬 Accordion Videos Upload Script');
        console.log('================================');
        
        // Upload videos
        await uploadAccordionVideos();
        
        // Verify uploads
        await verifyUploads();
        
        console.log('\n🎉 Script completed successfully!');
        
    } catch (error) {
        console.error('❌ Script failed:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    uploadAccordionVideos,
    verifyUploads,
    accordionVideos
}; 