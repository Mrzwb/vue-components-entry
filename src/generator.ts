const path = require('path');
const { DIR_COMPONENTS } =  require('./constants');
const { 
  pascalize,
  normalizePath,
  getComponents,
  getVersion,
  smartOutputFile,
 } = require('./utils');

interface PathResolverFunc {
    (path: string): string;
}

interface Options {
    baseDir: string,
    outputPath: string,
    pathResolver?: PathResolverFunc;
    excludes: Array<string>;
}

const genImports = (components: Map<string, string>, options: Options) => {
    return [...components].map( item => {
        let importPath = path.join(options.baseDir|| DIR_COMPONENTS, item[0]);
        if (options.pathResolver) {
            importPath = options.pathResolver(importPath);
        }
        return `import ${item[1]} from '${normalizePath(importPath)}';`;
    }).join('\n');
}

const genExports = (components: Map<string, string>) => {
    return [...components].map(item => {
        if (/[{}]/g.test(item[1])) {
          item[1] = item[1].replace(/[{}]/g, '').replace(/,\s*$/,'');
        }
        return item[1];
    }).join(',\n    ');
}

const Generator = {
    genPackageEntry: (options: Options) => {
        const components = getComponents(options);
        const version = `${getVersion()}`;
        const content = `${genImports(components, options)}
    const version = '${version}';

    function install(Vue) {
      const components = [
        ${genExports(components)}
      ];
      components.forEach(item => {
        if (item.install) {
          Vue.use(item);
        } else if (item.name) {
          Vue.component(item.name, item);
        } 
      });
    }
    
    if (typeof window !== 'undefined' && window.Vue) {
      install(window.Vue);
    }
    
    export {
      install,
      version,
      ${genExports(components)}
    };
    
    export default {
      install: install,
      version: version
    };
    `;
      smartOutputFile(options.outputPath, content);
  }
}

module.exports = Generator;