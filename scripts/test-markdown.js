#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple markdown parsing functions (simplified versions for testing)
function sanitizeHtml(html) {
  if (!html) return '';
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function parseFeatures(markdown, productType) {
  const lines = markdown.split('\n');
  const features = [];
  let currentCategory = '';
  let inTable = false;
  let currentFeature = null;
  let collectingNotes = false;
  
  for (const line of lines) {
    if (line.trim().startsWith('## ')) {
      currentCategory = sanitizeHtml(line.trim().substring(3).trim());
      inTable = false;
      collectingNotes = false;
      if (currentFeature && currentFeature.id) {
        features.push(currentFeature);
        currentFeature = null;
      }
      continue;
    }
    
    if (line.includes('| ID | Name | Description |')) {
      inTable = true;
      collectingNotes = false;
      if (currentFeature && currentFeature.id) {
        features.push(currentFeature);
        currentFeature = null;
      }
      continue;
    }
    
    if (line.includes('|----')) {
      continue;
    }
    
    if (inTable && line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (currentFeature && currentFeature.id) {
        features.push(currentFeature);
      }
      
      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
      if (cells.length >= 3) {
        currentFeature = {
          id: sanitizeHtml(cells[0]),
          name: sanitizeHtml(cells[1]),
          description: sanitizeHtml(cells[2]),
          category: currentCategory,
          productType: productType
        };
        collectingNotes = true;
      } else {
        currentFeature = null;
        collectingNotes = false;
      }
      continue;
    }
    
    if (collectingNotes && currentFeature && line.trim() && !line.trim().startsWith('|')) {
      if (line.trim().startsWith('> ') || line.trim().startsWith('- ') || line.startsWith('  ')) {
        const noteLine = sanitizeHtml(line.trim().replace(/^[>-]\s+/, '').trim());
        if (currentFeature.notes) {
          currentFeature.notes += '\n' + noteLine;
        } else {
          currentFeature.notes = noteLine;
        }
      } else {
        collectingNotes = false;
      }
    }
  }
  
  if (currentFeature && currentFeature.id) {
    features.push(currentFeature);
  }
  
  return features;
}

function extractProductType(markdown) {
  const lines = markdown.split('\n');
  for (const line of lines) {
    if (line.trim().startsWith('type: ')) {
      return line.trim().substring(6).trim();
    }
  }
  return 'unknown';
}

function extractVendorName(markdown) {
  const lines = markdown.split('\n');
  for (const line of lines) {
    if (line.trim().startsWith('# ')) {
      return sanitizeHtml(line.trim().substring(2).trim());
    }
  }
  return 'Unknown Vendor';
}

function parseVendorProducts(markdown, vendorName, productType) {
  const lines = markdown.split('\n');
  const products = [];
  let inProduct = false;
  let inFeatures = false;
  let currentProduct = null;
  let currentFeatureId = null;
  let currentFeatureValue = null;
  let currentFeatureNotes = null;
  
  for (const line of lines) {
    if (line.trim().startsWith('## ')) {
      if (currentProduct && currentProduct.id) {
        products.push(currentProduct);
      }
      
      currentProduct = {
        id: '',
        name: sanitizeHtml(line.trim().substring(3).trim()),
        vendor: vendorName,
        website: '',
        features: {},
        featureNotes: {},
        defaultVisible: false,
        productType: productType,
        last_updated_date: undefined
      };
      inProduct = true;
      inFeatures = false;
      currentFeatureId = null;
    } else if (line.trim().startsWith('- id: ')) {
      if (currentProduct) {
        currentProduct.id = sanitizeHtml(line.trim().substring(6).trim());
      }
    } else if (line.trim().startsWith('- website: ')) {
      if (currentProduct) {
        currentProduct.website = sanitizeHtml(line.trim().substring(11).trim());
      }
    } else if (line.trim().startsWith('- defaultVisible: ')) {
      if (currentProduct) {
        currentProduct.defaultVisible = line.trim().substring(18).trim() === 'true';
      }
    } else if (line.trim().startsWith('### Features')) {
      inFeatures = true;
    } else if (inFeatures && line.trim().startsWith('- ') && line.includes(':')) {
      const featureLine = line.trim().substring(2);
      const colonIndex = featureLine.indexOf(':');
      if (colonIndex > 0) {
        currentFeatureId = sanitizeHtml(featureLine.substring(0, colonIndex).trim());
        currentFeatureValue = sanitizeHtml(featureLine.substring(colonIndex + 1).trim());
        currentFeatureNotes = null;
        
        if (currentProduct && currentFeatureId) {
          currentProduct.features[currentFeatureId] = currentFeatureValue;
        }
      }
    } else if (inFeatures && line.trim().startsWith('  > ')) {
      const noteLine = sanitizeHtml(line.trim().substring(4).trim());
      if (currentProduct && currentFeatureId) {
        if (currentProduct.featureNotes[currentFeatureId]) {
          currentProduct.featureNotes[currentFeatureId] += '\n' + noteLine;
        } else {
          currentProduct.featureNotes[currentFeatureId] = noteLine;
        }
      }
    }
  }
  
  if (currentProduct && currentProduct.id) {
    products.push(currentProduct);
  }
  
  return products;
}

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  errors: [],
  warnings: [],
  summary: []
};

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function addResult(type, message, details = null) {
  if (type === 'error') {
    testResults.failed++;
    testResults.errors.push({ message, details });
    log(`❌ ${message}`, 'red');
  } else if (type === 'warning') {
    testResults.warnings.push({ message, details });
    log(`⚠️  ${message}`, 'yellow');
  } else if (type === 'success') {
    testResults.passed++;
    log(`✅ ${message}`, 'green');
  }
  
  if (details) {
    log(`   ${details}`, 'blue');
  }
}

function validateFeaturesFile(filePath, productType) {
  const errors = [];
  const warnings = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const features = parseFeatures(content, productType);
    
    // Check for required structure
    let hasValidStructure = false;
    let categoryCount = 0;
    let tableCount = 0;
    let lastTableLine = -1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      
      if (line.trim().startsWith('## ')) {
        categoryCount++;
      }
      if (line.includes('| ID | Name | Description |')) {
        tableCount++;
        hasValidStructure = true;
        lastTableLine = lineNum;
      }
    }
    
    if (!hasValidStructure) {
      errors.push({
        line: 1,
        message: 'Missing required table header "| ID | Name | Description |"',
        type: 'structure'
      });
    }
    
    if (categoryCount === 0) {
      errors.push({
        line: 1,
        message: 'No categories found - features must be organized under ## category headers',
        type: 'structure'
      });
    }
    
    // Validate table structure more thoroughly
    let inTable = false;
    let currentCategory = '';
    let tableStartLine = -1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      
      if (line.trim().startsWith('## ')) {
        currentCategory = line.trim().substring(3).trim();
        inTable = false;
        tableStartLine = -1;
      } else if (line.includes('| ID | Name | Description |')) {
        inTable = true;
        tableStartLine = lineNum;
      } else if (inTable && line.includes('|----')) {
        // Check separator line
        if (!line.match(/\|\s*-+\s*\|\s*-+\s*\|\s*-+\s*\|/)) {
          errors.push({
            line: lineNum,
            message: 'Invalid table separator format - should be |----|------|-------------|',
            type: 'table_format'
          });
        }
      } else if (inTable && line.trim().startsWith('|') && line.trim().endsWith('|')) {
        // Check table row format
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
        if (cells.length < 3) {
          errors.push({
            line: lineNum,
            message: `Table row has only ${cells.length} columns, expected at least 3 (ID, Name, Description)`,
            type: 'table_format'
          });
        }
        if (cells.length > 0 && !cells[0].trim()) {
          errors.push({
            line: lineNum,
            message: 'Table row missing ID (first column is empty)',
            type: 'table_format'
          });
        }
        if (cells.length > 1 && !cells[1].trim()) {
          errors.push({
            line: lineNum,
            message: 'Table row missing Name (second column is empty)',
            type: 'table_format'
          });
        }
        if (cells.length > 2 && !cells[2].trim()) {
          errors.push({
            line: lineNum,
            message: 'Table row missing Description (third column is empty)',
            type: 'table_format'
          });
        }
      } else if (inTable && line.trim() && !line.trim().startsWith('|') && !line.trim().startsWith('>') && !line.trim().startsWith('-')) {
        // Check for content outside table that might indicate table ended
        if (line.trim().startsWith('##')) {
          inTable = false;
        }
      }
    }
    
    // Validate each feature
    if (features.length === 0) {
      warnings.push({
        line: 1,
        message: 'No features found in file',
        type: 'content'
      });
    } else {
      for (const feature of features) {
        if (!feature.id || !feature.name || !feature.description) {
          errors.push({
            line: -1, // We don't have line numbers for parsed features
            message: `Feature missing required fields: ID="${feature.id}", Name="${feature.name}", Description="${feature.description}"`,
            type: 'feature_validation'
          });
        }
        
        if (!feature.category) {
          warnings.push({
            line: -1,
            message: `Feature "${feature.id}" has no category`,
            type: 'feature_validation'
          });
        }
        
        // Check for empty or invalid feature IDs
        if (feature.id && (feature.id.trim() === '' || feature.id.includes(' '))) {
          errors.push({
            line: -1,
            message: `Feature ID "${feature.id}" is invalid - should be non-empty and contain no spaces`,
            type: 'feature_validation'
          });
        }
      }
    }
    
    // Report all errors and warnings
    errors.forEach(error => {
      addResult('error', `${filePath}:${error.line} - ${error.message}`, `Type: ${error.type}`);
    });
    
    warnings.forEach(warning => {
      addResult('warning', `${filePath}:${warning.line} - ${warning.message}`, `Type: ${warning.type}`);
    });
    
    if (errors.length === 0) {
      addResult('success', `Features file validated: ${filePath}`, `${features.length} features in ${categoryCount} categories`);
    }
    
  } catch (error) {
    addResult('error', `Failed to parse features file: ${filePath}`, `Line: ${error.line || 'unknown'}, Message: ${error.message}`);
  }
}

function validateVendorFile(filePath, expectedProductType) {
  const errors = [];
  const warnings = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const vendorName = extractVendorName(content);
    const productType = extractProductType(content);
    const products = parseVendorProducts(content, vendorName, productType);
    
    // Check for required structure
    let hasHeader = false;
    let hasTypeDeclaration = false;
    let typeDeclarationLine = -1;
    let headerLine = -1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      
      if (line.trim().startsWith('# ')) {
        hasHeader = true;
        headerLine = lineNum;
      }
      if (line.trim().startsWith('type: ')) {
        hasTypeDeclaration = true;
        typeDeclarationLine = lineNum;
      }
    }
    
    if (!hasHeader) {
      errors.push({
        line: 1,
        message: 'Missing main header - file should start with "# Vendor Name"',
        type: 'structure'
      });
    }
    
    if (!hasTypeDeclaration) {
      errors.push({
        line: 1,
        message: 'Missing type declaration - file should include "type: product_type"',
        type: 'structure'
      });
    }
    
    // Check product type consistency
    if (productType !== expectedProductType) {
      errors.push({
        line: typeDeclarationLine > 0 ? typeDeclarationLine : 1,
        message: `Product type mismatch - Expected: "${expectedProductType}", Found: "${productType}"`,
        type: 'product_type'
      });
    }
    
    // Validate vendor name
    if (!vendorName || vendorName === 'Unknown Vendor') {
      errors.push({
        line: headerLine > 0 ? headerLine : 1,
        message: 'Invalid or missing vendor name in header',
        type: 'structure'
      });
    }
    
    // Check for products
    if (products.length === 0) {
      warnings.push({
        line: 1,
        message: 'No products found in vendor file',
        type: 'content'
      });
    } else {
      // Validate each product
      for (const product of products) {
        if (!product.id || !product.name || !product.vendor) {
          errors.push({
            line: -1, // We don't have line numbers for parsed products
            message: `Product missing required fields: ID="${product.id}", Name="${product.name}", Vendor="${product.vendor}"`,
            type: 'product_validation'
          });
        }
        
        if (Object.keys(product.features).length === 0) {
          warnings.push({
            line: -1,
            message: `Product "${product.name}" has no features defined`,
            type: 'product_validation'
          });
        }
        
        // Check for empty or invalid product IDs
        if (product.id && (product.id.trim() === '' || product.id.includes(' '))) {
          errors.push({
            line: -1,
            message: `Product ID "${product.id}" is invalid - should be non-empty and contain no spaces`,
            type: 'product_validation'
          });
        }
      }
    }
    
    // Check for proper markdown structure
    let inProduct = false;
    let inFeatures = false;
    let currentProduct = '';
    let productStartLine = -1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      
      if (line.trim().startsWith('## ')) {
        inProduct = true;
        inFeatures = false;
        currentProduct = line.trim().substring(3).trim();
        productStartLine = lineNum;
      } else if (line.trim().startsWith('### Features')) {
        inFeatures = true;
      } else if (inFeatures && line.trim().startsWith('- ') && line.includes(':')) {
        // Check feature line format
        const featureLine = line.trim().substring(2);
        const colonIndex = featureLine.indexOf(':');
        if (colonIndex <= 0) {
          errors.push({
            line: lineNum,
            message: `Invalid feature line format - should be "- feature_id: value"`,
            type: 'feature_format'
          });
        } else {
          const featureId = featureLine.substring(0, colonIndex).trim();
          const featureValue = featureLine.substring(colonIndex + 1).trim();
          
          if (!featureId) {
            errors.push({
              line: lineNum,
              message: 'Feature line missing feature ID',
              type: 'feature_format'
            });
          }
          
          if (!featureValue) {
            errors.push({
              line: lineNum,
              message: `Feature "${featureId}" has no value`,
              type: 'feature_format'
            });
          }
        }
      } else if (inFeatures && line.trim().startsWith('  > ')) {
        // Check note format
        const noteContent = line.trim().substring(4).trim();
        if (!noteContent) {
          errors.push({
            line: lineNum,
            message: 'Empty feature note',
            type: 'feature_format'
          });
        }
      }
    }
    
    // Report all errors and warnings
    errors.forEach(error => {
      addResult('error', `${filePath}:${error.line} - ${error.message}`, `Type: ${error.type}`);
    });
    
    warnings.forEach(warning => {
      addResult('warning', `${filePath}:${warning.line} - ${warning.message}`, `Type: ${warning.type}`);
    });
    
    if (errors.length === 0) {
      addResult('success', `Vendor file validated: ${filePath}`, `${products.length} products for vendor: ${vendorName}`);
    }
    
  } catch (error) {
    addResult('error', `Failed to parse vendor file: ${filePath}`, `Line: ${error.line || 'unknown'}, Message: ${error.message}`);
  }
}

function validateMarkdownStructure(filePath) {
  const errors = [];
  const warnings = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Check for basic markdown structure
    let hasHeader = false;
    let hasTypeDeclaration = false;
    let headerLine = -1;
    let typeDeclarationLine = -1;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      
      if (line.trim().startsWith('# ')) {
        hasHeader = true;
        headerLine = lineNum;
      }
      if (line.trim().startsWith('type: ')) {
        hasTypeDeclaration = true;
        typeDeclarationLine = lineNum;
      }
    }
    
    if (!hasHeader) {
      warnings.push({
        line: 1,
        message: 'No main header found - files should start with a # header',
        type: 'structure'
      });
    }
    
    // For vendor files, check for type declaration
    if (filePath.includes('/vendors/') && !hasTypeDeclaration) {
      errors.push({
        line: 1,
        message: 'Missing type declaration - vendor files must include "type: product_type"',
        type: 'structure'
      });
    }
    
    // Check for common markdown issues
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      
      // Check for empty lines that might indicate formatting issues
      if (line.trim() === '' && i > 0 && i < lines.length - 1) {
        const prevLine = lines[i - 1].trim();
        const nextLine = lines[i + 1].trim();
        
        // Check for missing blank lines between sections
        if (prevLine.startsWith('## ') && nextLine.startsWith('|')) {
          warnings.push({
            line: lineNum,
            message: 'Consider adding a blank line after section header for better readability',
            type: 'formatting'
          });
        }
      }
      
      // Check for inconsistent table formatting
      if (line.includes('|') && !line.includes('|----')) {
        const cellCount = (line.match(/\|/g) || []).length - 1;
        if (cellCount > 0 && cellCount < 3) {
          errors.push({
            line: lineNum,
            message: `Table row has ${cellCount} columns, expected at least 3`,
            type: 'table_format'
          });
        }
      }
    }
    
    // Report all errors and warnings
    errors.forEach(error => {
      addResult('error', `${filePath}:${error.line} - ${error.message}`, `Type: ${error.type}`);
    });
    
    warnings.forEach(warning => {
      addResult('warning', `${filePath}:${warning.line} - ${warning.message}`, `Type: ${warning.type}`);
    });
    
  } catch (error) {
    addResult('error', `Failed to read file: ${filePath}`, `Line: ${error.line || 'unknown'}, Message: ${error.message}`);
  }
}

function scanMatrixDirectory() {
  // Check if we're running from within a matrix directory (like src/matrix)
  const currentDir = process.cwd();
  const isInMatrixDir = fs.existsSync(path.join(currentDir, 'rmm')) || 
                       fs.existsSync(path.join(currentDir, 'backup')) ||
                       fs.existsSync(path.join(currentDir, 'dns'));
  
  const projectRoot = isInMatrixDir ? currentDir : path.join(__dirname, '..');
  
  // Check if we have changed files to focus on
  const changedFiles = process.env.CHANGED_FILES ? 
    process.env.CHANGED_FILES.split('\n').filter(f => f.trim()) : 
    null;
  
  const changedCount = process.env.CHANGED_COUNT || '0';
  
  if (changedFiles && changedFiles.length > 0) {
    log(`\n🎯 Focused testing on ${changedCount} changed file(s)`, 'cyan');
    log(`Changed files: ${changedFiles.join(', ')}`, 'blue');
  } else {
    log(`\n🔍 Full scan of all product types`, 'cyan');
  }
  
  // Dynamically find all directories that contain markdown files
  const foundProductTypes = [];
  const allDirs = fs.readdirSync(projectRoot, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  // Check which directories contain markdown files (excluding common non-product dirs)
  const excludeDirs = ['.git', 'scripts', '.github', 'node_modules', 'build', 'src'];
  
  for (const dirName of allDirs) {
    if (!excludeDirs.includes(dirName)) {
      const dirPath = path.join(projectRoot, dirName);
      const hasMarkdownFiles = fs.readdirSync(dirPath, { recursive: true })
        .some(file => typeof file === 'string' && file.endsWith('.md'));
      
      if (hasMarkdownFiles) {
        foundProductTypes.push(dirName);
      }
    }
  }
  
  if (foundProductTypes.length === 0) {
    addResult('error', 'No product type directories found', 'Expected to find directories containing .md files');
    return;
  }
  
  // If we have changed files, only test relevant product types
  const relevantProductTypes = changedFiles ? 
    foundProductTypes.filter(pt => 
      changedFiles.some(file => file.startsWith(`${pt}/`))
    ) : 
    foundProductTypes;
  
  log(`\n🔍 Scanning ${relevantProductTypes.length} product types: ${relevantProductTypes.join(', ')}`, 'cyan');
  
  for (const productType of relevantProductTypes) {
    const productDir = path.join(projectRoot, productType);
    
    // Check features.md file
    const featuresFile = path.join(productDir, 'features.md');
    if (fs.existsSync(featuresFile)) {
      // Only test features file if it was changed or if we're doing a full scan
      if (!changedFiles || changedFiles.some(f => f.includes(`${productType}/features.md`))) {
        validateFeaturesFile(featuresFile, productType);
      } else {
        log(`⏭️  Skipping ${featuresFile} (not changed)`, 'blue');
      }
    } else {
      addResult('error', `Missing features.md for product type: ${productType}`, featuresFile);
    }
    
    // Check vendor files
    const vendorsDir = path.join(productDir, 'vendors');
    if (fs.existsSync(vendorsDir)) {
      const vendorFiles = fs.readdirSync(vendorsDir)
        .filter(file => file.endsWith('.md'));
      
      if (vendorFiles.length === 0) {
        addResult('warning', `No vendor files found for product type: ${productType}`, vendorsDir);
      } else {
        for (const vendorFile of vendorFiles) {
          const vendorPath = path.join(vendorsDir, vendorFile);
          
          // Only test vendor files that were changed or if we're doing a full scan
          if (!changedFiles || changedFiles.some(f => f.includes(vendorFile))) {
            validateMarkdownStructure(vendorPath);
            validateVendorFile(vendorPath, productType);
          } else {
            log(`⏭️  Skipping ${vendorPath} (not changed)`, 'blue');
          }
        }
      }
    } else {
      addResult('warning', `No vendors directory found for product type: ${productType}`, vendorsDir);
    }
  }
}

function generateMarkdownReport() {
  const changedFiles = process.env.CHANGED_FILES ? 
    process.env.CHANGED_FILES.split('\n').filter(f => f.trim()) : 
    null;
  
  const changedCount = process.env.CHANGED_COUNT || '0';
  
  let testScope = '';
  if (changedFiles && changedFiles.length > 0) {
    testScope = `\n\n### 🎯 Test Scope\n\nThis test focused on **${changedCount} changed file(s)**:\n${changedFiles.map(f => `- \`${f}\``).join('\n')}\n\n*Only changed files and their related product types were tested.*`;
  } else {
    testScope = '\n\n### 🔍 Test Scope\n\n*Full scan of all Markdown files in product type directories.*';
  }
  
  // Group errors and warnings by file
  const errorsByFile = {};
  const warningsByFile = {};
  
  testResults.errors.forEach(error => {
    const fileMatch = error.message.match(/^([^:]+):/);
    const file = fileMatch ? fileMatch[1] : 'Unknown';
    if (!errorsByFile[file]) errorsByFile[file] = [];
    errorsByFile[file].push(error);
  });
  
  testResults.warnings.forEach(warning => {
    const fileMatch = warning.message.match(/^([^:]+):/);
    const file = fileMatch ? fileMatch[1] : 'Unknown';
    if (!warningsByFile[file]) warningsByFile[file] = [];
    warningsByFile[file].push(warning);
  });
  
  // Generate file-by-file error summary
  let fileSummary = '';
  const allFiles = new Set([...Object.keys(errorsByFile), ...Object.keys(warningsByFile)]);
  
  if (allFiles.size > 0) {
    fileSummary = '\n\n### 📁 File-by-File Summary\n\n';
    allFiles.forEach(file => {
      const errorCount = errorsByFile[file] ? errorsByFile[file].length : 0;
      const warningCount = warningsByFile[file] ? warningsByFile[file].length : 0;
      
      if (errorCount > 0 || warningCount > 0) {
        fileSummary += `**${file}**: ${errorCount} errors, ${warningCount} warnings\n`;
      }
    });
  }
  
  const report = `## Test Summary

- ✅ **Passed**: ${testResults.passed}
- ❌ **Failed**: ${testResults.failed}
- ⚠️ **Warnings**: ${testResults.warnings.length}${testScope}${fileSummary}

### ${testResults.failed > 0 ? '❌ Errors' : '✅ No Errors'}

${testResults.errors.length === 0 ? 'No errors found!' : testResults.errors.map(error => 
  `- **${error.message}**\n  ${error.details || ''}`
).join('\n\n')}

### ${testResults.warnings.length > 0 ? '⚠️ Warnings' : '✅ No Warnings'}

${testResults.warnings.length === 0 ? 'No warnings!' : testResults.warnings.map(warning => 
  `- **${warning.message}**\n  ${warning.details || ''}`
).join('\n\n')}

### Test Details

This test validates:
- ✅ All features.md files have proper table structure
- ✅ All vendor files have correct product type declarations
- ✅ All markdown files can be parsed without errors
- ✅ All features have required fields (ID, Name, Description)
- ✅ All products have required fields (ID, Name, Vendor)
- ✅ Product types are consistent between features and vendor files
- ✅ Table formatting and markdown structure
- ✅ Feature and product ID validation

${testResults.failed === 0 ? '🎉 **All tests passed!** Your Markdown files are compatible with the application.' : '❌ **Some tests failed.** Please fix the errors above before merging.'}`;

  fs.writeFileSync('markdown-test-results.md', report);
  return report;
}

// Main execution
async function main() {
  log('🚀 Starting Matrix Data Compatibility Tests', 'cyan');
  log('==========================================', 'cyan');
  
  try {
    // Check if we're in a matrix repository context
    const projectRoot = path.join(__dirname, '..');
    const isMatrixRepo = fs.existsSync(path.join(projectRoot, '.git')) && 
                        fs.existsSync(path.join(projectRoot, 'README.md'));
    const generateReport = process.env.GENERATE_REPORT === 'false';
    
    if (isMatrixRepo) {
      try {
        const { execSync } = require('child_process');
        const readmeContent = fs.readFileSync(path.join(projectRoot, 'README.md'), 'utf8');
        if (readmeContent.includes('Product Matrix Data')) {
          log('📁 Detected matrix data as separate repository (mspgeek/matrix-data)', 'blue');
          const gitInfo = execSync('git rev-parse HEAD && git branch --show-current && git remote get-url origin', { encoding: 'utf8' });
          const [commit, branch, remote] = gitInfo.trim().split('\n');
          log(`   Commit: ${commit.substring(0, 8)}`, 'blue');
          log(`   Branch: ${branch}`, 'blue');
          log(`   Remote: ${remote}`, 'blue');
        } else {
          log('📁 Matrix data appears to be in subdirectory structure', 'blue');
        }
      } catch (error) {
        log('📁 Matrix data appears to be in subdirectory structure', 'blue');
      }
    } else {
      log('📁 Matrix data appears to be in subdirectory structure', 'blue');
    }
    
    // Check for full scan mode
    const fullScan = process.env.FULL_SCAN === 'true';
    if (fullScan) {
      log('🔍 Running full scan (parser was updated)', 'yellow');
    }
    
    scanMatrixDirectory();
    
    log('\n📊 Test Results Summary', 'cyan');
    log('======================', 'cyan');
    log(`✅ Passed: ${testResults.passed}`, 'green');
    log(`❌ Failed: ${testResults.failed}`, 'red');
    log(`⚠️  Warnings: ${testResults.warnings.length}`, 'yellow');
    
    // Generate markdown report
    if (generateReport) {
      generateMarkdownReport();
    }
    
    // Exit with error code if tests failed
    if (testResults.failed > 0) {
      log('\n❌ Tests failed! Check the errors above.', 'red');
      log('💡 Tip: Fix the errors in the matrix data repository and commit the changes.', 'blue');
      process.exit(1);
    } else {
      log('\n🎉 All tests passed!', 'green');
      log('✅ Matrix data is compatible with the application.', 'green');
      process.exit(0);
    }
    
  } catch (error) {
    log(`\n💥 Unexpected error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

// Run the tests
main();
