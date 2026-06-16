const { execSync } = require('child_process');
const path = require('path');

console.log('=== STARTING MASTER HYDROLOGY DATABASE MERGE ===');
try {
  console.log('\n[1/4] Merging Rivers & Streams...');
  execSync('node scripts/merge-rivers.js', { stdio: 'inherit' });

  console.log('\n[2/4] Merging Springs...');
  execSync('node scripts/merge-springs.js', { stdio: 'inherit' });

  console.log('\n[3/4] Merging Wetlands & Lakes...');
  execSync('node "C:/Users/Fayaz/.gemini/antigravity-cli/brain/2f702963-7bcc-47d5-9cf9-4db320a60d31/scratch/migrate_wetlands_and_lakes_v3.js"', { stdio: 'inherit' });

  console.log('\n[4/4] Merging Watersheds...');
  execSync('node scripts/merge-watersheds.js', { stdio: 'inherit' });

  console.log('\n=== MASTER HYDROLOGY DATABASE MERGE COMPLETED SUCCESSFULLY ===');
} catch (error) {
  console.error('\n!!! MASTER HYDROLOGY DATABASE MERGE FAILED !!!');
  console.error(error.message);
  process.exit(1);
}
