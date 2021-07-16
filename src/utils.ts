const fs = require('fs');
const path = require('path');
const {
    DEFAULT_EXPORT_REG,
    EXPORT_REG,
    EXCLUDES,
    ENTRY_EXTS,
    DIR_ROOT,
    DIR_COMPONENTS
} = require('./constants');

// ----- util  @see vant ----
const _camelize = (str: string) => str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
exports.pascalize = (str: string) => _camelize(str).replace(/(\w)(\w*)/g, (_, c1, c2) => c1.toUpperCase() + c2);
exports.normalizePath = (str: string) => str.replace(/\\/g, '/');


// ----- getter helper ----
const hasDefaultExport = (code: string) => DEFAULT_EXPORT_REG.test(code);
const hasExport = (code: string) => EXPORT_REG.test(code);

exports.getComponents = (options: Options): Map<String, string> => {
    const components = new Map();
    const root = options.baseDir || DIR_COMPONENTS;
    const dirs = fs.readdirSync(root);
    options.excludes && options.excludes.forEach( item => {
        EXCLUDES.push(item);
    })
    dirs.filter(dir => !EXCLUDES.includes(dir)) 
        .forEach( dir => ENTRY_EXTS.some(ext => {
        const filePath = path.join(root, dir, `index${ext}`);
         if (fs.existsSync(filePath)) {
            let code = fs.readFileSync(filePath, 'utf-8');
            const isDefaultExport = hasDefaultExport(code);
            const isExport = hasExport(code);
             if (isExport) {
                components.set(dir, EXPORT_REG.exec(code)[1]);
            } 
            if (isDefaultExport) {
                components.set(dir, `${exports.pascalize(dir)}`);
            }
        }
    }));
    return components;
}

exports.getVersion = () => {
    let vr = process.env.PACKAGE_VERSION ;
    try {
        const pkg = fs.readFileSync(path.join(DIR_ROOT, './package.json'));
        vr = vr || JSON.parse(pkg.toString()).version
    } catch (e) {
        throw Error('package version is not found!')
    }
    return vr;
}
  
exports.smartOutputFile = (filePath: string, content:string): void => {
    if (fs.existsSync(filePath)) {
        const previousContent = fs.readFileSync(filePath, 'utf-8');
        if (previousContent === content) {
            return;
        }
    }
    fs.writeFileSync(filePath, content,'utf-8');
}
export {} 