// Check database for INR pricing data
const mysql = require('mysql2/promise');

const DB_CONFIG = {
    host: 'vardaanwebsites.c1womgmu83di.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'vardaanwebsites',
    database: 'vardaan_ds',
    port: 3306,
    charset: 'utf8mb4'
};

async function checkDatabase() {
    console.log('🔍 Checking Database for INR Pricing Data...\n');
    
    try {
        const connection = await mysql.createConnection(DB_CONFIG);
        
        // Check 1: Count total records
        console.log('1️⃣ Total records in victaa_pricing:');
        const [totalRows] = await connection.execute('SELECT COUNT(*) as total FROM victaa_pricing');
        console.log(`   Total records: ${totalRows[0].total}`);
        
        // Check 2: Count by currency
        console.log('\n2️⃣ Records by currency:');
        const [currencyRows] = await connection.execute(`
            SELECT currency, COUNT(*) as count
            FROM victaa_pricing 
            GROUP BY currency
            ORDER BY currency
        `);
        
        currencyRows.forEach(row => {
            console.log(`   ${row.currency}: ${row.count} records`);
        });
        
        // Check 3: Check INR data specifically
        console.log('\n3️⃣ INR pricing data:');
        const [inrRows] = await connection.execute(`
            SELECT plan_name, duration_type, price, currency, country_code
            FROM victaa_pricing 
            WHERE currency = 'INR'
            ORDER BY plan_name, duration_type
        `);
        
        if (inrRows.length > 0) {
            console.log(`   Found ${inrRows.length} INR records:`);
            inrRows.forEach(row => {
                console.log(`     ${row.plan_name} - ${row.duration_type}: ₹${row.price} (${row.country_code})`);
            });
        } else {
            console.log('   ❌ No INR records found!');
        }
        
        // Check 4: Check USD data
        console.log('\n4️⃣ USD pricing data:');
        const [usdRows] = await connection.execute(`
            SELECT plan_name, duration_type, price, currency, country_code
            FROM victaa_pricing 
            WHERE currency = 'USD'
            ORDER BY plan_name, duration_type
        `);
        
        if (usdRows.length > 0) {
            console.log(`   Found ${usdRows.length} USD records:`);
            usdRows.forEach(row => {
                console.log(`     ${row.plan_name} - ${row.duration_type}: $${row.price} (${row.country_code})`);
            });
        } else {
            console.log('   ❌ No USD records found!');
        }
        
        // Check 5: Check for missing currency combinations
        console.log('\n5️⃣ Checking for missing currency combinations:');
        const [missingRows] = await connection.execute(`
            SELECT 
                p1.plan_name,
                p1.duration_type,
                p1.currency as has_currency,
                CASE 
                    WHEN p1.currency = 'USD' THEN 'INR'
                    WHEN p1.currency = 'INR' THEN 'USD'
                    ELSE 'UNKNOWN'
                END as missing_currency
            FROM victaa_pricing p1
            LEFT JOIN victaa_pricing p2 ON 
                p1.plan_name = p2.plan_name AND 
                p1.duration_type = p2.duration_type AND 
                p1.currency != p2.currency
            WHERE p2.currency IS NULL
            ORDER BY p1.plan_name, p1.duration_type
        `);
        
        if (missingRows.length > 0) {
            console.log('   ⚠️ Missing currency combinations:');
            missingRows.forEach(row => {
                console.log(`     ${row.plan_name} - ${row.duration_type}: Has ${row.has_currency}, missing ${row.missing_currency}`);
            });
        } else {
            console.log('   ✅ All plans have both USD and INR records');
        }
        
        await connection.end();
        
        console.log('\n📋 Summary:');
        if (inrRows.length > 0) {
            console.log('✅ INR data exists in database');
            console.log('✅ Backend should be able to serve INR pricing');
        } else {
            console.log('❌ No INR data found in database');
            console.log('💡 You need to add INR records to the database');
        }
        
    } catch (error) {
        console.error('❌ Database error:', error.message);
        console.log('\n🔧 Alternative: Check if backend server is running and test API directly');
    }
}

checkDatabase(); 