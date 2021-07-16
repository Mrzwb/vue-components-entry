
vue-components-entry
===
一个简单的来源于有赞团队的组件包入口生成代码段，不依赖脚手架

install
===

```
 npm i install vue-components-entry
```

Usage
===

```
const Generator = require('vue-component-entry');
const path = require('path');
const DIR_COMPONENTS = path.join(__dirname, './src/components');
const options = {
    outputPath : path.join(DIR_COMPONENTS, 'index.js'),
    pathResolver: (importPath) => `./${path.relative(DIR_COMPONENTS, importPath)}`,
    excludes: ['mixins']
  }
Generator.genPackageEntry(options);

```
options
===
```
baseDir: 组件目录, 默认 './src/components'
outputPath:  生成文件位置,
pathResolver： 路径处理
excludes： 过滤baseDir下的目录,  可选
```

inspired & thanks
===
youzan/vant team