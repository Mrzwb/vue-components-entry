const fs = require('fs');
const path = require('path');

exports.CWD = process.cwd();
exports.DIR_ROOT = path.join(exports.CWD);
exports.DIR_COMPONENTS = path.join(exports.CWD,'./src/components');
exports.ENTRY_EXTS = ['.vue','.js','.ts','.tsx','.jsx'];
exports.EXCLUDES = ['.DS_Store'];

exports.EXPORT_REG = /\bexport\s+({[\s\S]*})/;
exports.DEFAULT_EXPORT_REG = /\b(export\s+default|export\s{[^}]+as\s+default)\b/;
export {} 