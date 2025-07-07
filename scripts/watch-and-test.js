#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const watchDir = path.join(__dirname, '../src');
const debounceTime = 1000;
let timeout;

console.log('🔍 กำลังเฝ้าดูการเปลี่ยนแปลงไฟล์...');

function runTests() {
  console.log('\n🧪 กำลังรันเทส...');
  exec('npm run lint', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Lint ล้มเหลว:', error.message);
      return;
    }
    console.log('✅ Lint ผ่าน');
    
    exec('npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Build ล้มเหลว:', error.message);
        return;
      }
      console.log('✅ Build สำเร็จ');
    });
  });
}

function watchFiles(dir) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) return;

    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        watchFiles(fullPath);
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
        fs.watchFile(fullPath, { interval: 500 }, () => {
          console.log(`📝 ไฟล์เปลี่ยนแปลง: ${file.name}`);
          
          clearTimeout(timeout);
          timeout = setTimeout(runTests, debounceTime);
        });
      }
    });
  });
}

watchFiles(watchDir);