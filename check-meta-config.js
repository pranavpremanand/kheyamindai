/**
 * Meta Tag Configuration Checker
 * 
 * This script checks the metadata configuration in server.js without requiring the server to be running.
 * It verifies that all paths have the correct metadata defined.
 */

const fs = require('fs');
const path = require('path');

// Read the server.js file
const serverJsPath = path.join(__dirname, 'server.js');
const serverJs = fs.readFileSync(serverJsPath, 'utf8');

// Extract the pageMetadata object
const pageMetadataMatch = serverJs.match(/const pageMetadata = \{([\s\S]*?)\};/);

if (!pageMetadataMatch) {
  console.error('Could not find pageMetadata object in server.js');
  process.exit(1);
}

// Parse the pageMetadata object
const pageMetadataStr = pageMetadataMatch[1];
const paths = [];

// Extract paths and their metadata
const pathRegex = /['"]([^'"]+)['"]\s*:\s*\{([^}]+)\}/g;
let match;

console.log('=== Page Metadata Configuration ===\n');

while ((match = pathRegex.exec(pageMetadataStr)) !== null) {
  const path = match[1];
  const metadataStr = match[2];
  
  // Extract title and description
  const titleMatch = metadataStr.match(/title\s*:\s*['"]([^'"]+)['"]/);
  const descriptionMatch = metadataStr.match(/description\s*:\s*['"](.*?)['"]/);
  
  const title = titleMatch ? titleMatch[1] : 'No title defined';
  const description = descriptionMatch ? descriptionMatch[1].replace(/\\"/g, '"') : 'No description defined';
  
  paths.push({ path, title, description });
  
  console.log(`Path: ${path}`);
  console.log(`Title: ${title}`);
  console.log(`Description: ${description}`);
  console.log('-----------------------------------');
}

// Check for important paths
const importantPaths = ['/', '', '/about-us', '/services', '/contact-us'];
const missingPaths = importantPaths.filter(p => !paths.some(item => item.path === p));

if (missingPaths.length > 0) {
  console.log('\n⚠️ WARNING: Some important paths are missing metadata:');
  missingPaths.forEach(p => console.log(`  - ${p}`));
} else {
  console.log('\n✅ All important paths have metadata defined.');
}

// Check for empty or very short descriptions
const shortDescriptions = paths.filter(p => 
  !p.description || 
  p.description === 'No description defined' || 
  p.description.length < 50
);

if (shortDescriptions.length > 0) {
  console.log('\n⚠️ WARNING: Some paths have missing or short descriptions:');
  shortDescriptions.forEach(p => console.log(`  - ${p.path}: ${p.description}`));
} else {
  console.log('\n✅ All paths have proper descriptions.');
}

console.log('\nTotal paths with metadata:', paths.length);