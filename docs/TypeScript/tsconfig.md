# tsconfig.json

##

### 简介

`tsconfig.json` 是 TypeScript 项目的配置文件，放在项目的根目录。反过来说，如果一个目录里面有 `tsconfig.json`，TypeScript 就认为这是项目的根目录。

如果项目源码是 JavaScript，但是想用 TypeScript 处理，那么配置文件的名字是 `jsconfig.json`，它跟 `tsconfig.json` 的写法是一样的。

`tsconfig.json` 文件主要供 `tsc` 编译器使用，它的命令行参数 `--project` 或 `-p` 可以指定 `tsconfig.json` 的位置（目录或文件皆可）。

```bash
$ tsc -p ./dir
```

如果不指定配置文件的位置吗，`tsc` 就会在当前目录下搜索 `tsconfig.json` 文件，如果不存在，就到上一级目录搜索，直到找到为止。

```json
{
  "compilerOptions": {
    "uotDir": "./built",
    "allowJs": true,
    "target": "es5"
  },
  "include": ["./src/**/*"]
}
```

- include：指定哪些文件需要编译。
- allowJs：指定源目录的 JavaScript 文件是否原样拷贝到编译后的目录。
- outDir：指定编译产物存放的目录。
- target：指定编译产物的 JS 版本。

使用 `tsc` 命令的 `--init` 参数可以自动生成 `tsconfig.json` 文件。

```bash
$ tsc --init
```

##

### exclude

`exclude` 属性是一个数组，必须与 `include` 属性一起使用，用来从编译列表中去除指定的文件。它也支持使用与 `include` 属性相同的通配符。

```json
{
  "include": ["**/*"],
  "exclude": ["**/*.spec.ts"]
}
```

##

### extends

`tsconfig.json` 可以继承另一个 `tsconfig.json` 文件的配置。如果一个项目有多个配置，可以把共同的配置写成 `tsconfig.base.json`，其他的配置文件继承该文件，这样便于维护和修改。

`extends` 属性用来指定所要继承的配置文件。它可以是本地文件。

```json
{
  "extends": "./tsconfig.base.json"
}
```

如果 `extends` 属性指定的路径不是以 `./` 或 `../` 开头，那么编译器将在 `node_modules` 目录下查找指定的配置文件。

`extends` 属性也可以继承已发布的 `npm` 模块里面的 `tsconfig` 文件。

```json
{
  "extends": "@tsconfig/node12/tsconfig.json"
}
```

`extends` 指定的 `tsconfig.json` 会先加载，然后加载当前的 `tsconfig.json`。如果两者有重名的属性，后者会覆盖前者。

##

### files

`files` 属性指定编译的文件列表，如果其中有一个文件不存在，就会报错。

它是一个数组，排在前面的文件先编译。

```json
{
  "files": ["a.ts", "b.ts"]
}
```

该属性必须逐一列出文件，不支持文件匹配。如果文件较多，建议使用 `include` 和 `exclude` 属性。

##

### include

`include` 属性指定所要编译的文件列表，既支持逐一列出文件，也支持通配符。文件位置相对于当前配置文件而定。

```json
{
  "include": ["src/**/*", "tests/**/*"]
}
```

`include` 属性支持三种通配符。

- `?`：指代单个字符
- `*`：指代任意字符，不含路径分隔符
- `**`：指定任意目录层级。

如果不指定文件后缀名，默认包括 `.ts`、`.tsx` 和 `.d.ts` 文件。如果打开了 `allowJs`，那么还包括 `.js` 和 `.jsx`。

##

### references

`references` 属性是一个数组，数组成员为对象，适合一个大项目由许多小项目构成的情况，用来设置需要引用的底层项目。

```json
{
  "references": [
    { "path": "../pkg1" },
    { "path": "../pkg2/tsconfig.json" }
  ]
}
```

`references` 数组成员对象的 `path` 属性，既可以是含有文件 `tsconfig.json` 的目录，也可以直接是该文件。

与此同时，引用的底层项目的 `tsconfig.json` 必须启用 `composite` 属性。

```json
{
  "compilerOptions": {
    "composite": true
  }
}
```

##

### compileOptions

`compilerOptions` 属性用来定制编译行为。这个属性可以省略，这时编译器将使用默认设置。

#### allowJs

`allowJs` 允许 TypeScript 项目加载 JS 脚本。编译时，也会将 JS 文件，一起拷贝到输出目录。

```json
{
  "compilerOptions": {
    "allowJs": true
  }
}
```

#### alwaysStrict

`alwaysStrict` 确保脚本以 ECMAScript 严格模式进行解析，因此脚本头部不用写 `"use strict"`。它的值是一个布尔值，默认为 `true`。

#### allowSyntheticDefaultImports

`allowSyntheticDefaultImports` 允许 `import` 命令默认加载没有 `default` 输出的模块。

比如，打开这个设置，就可以写 `import React from "react"`;，而不是 `import * as React from "react";`。

#### allowUnreachableCode

`allowUnreachableCode` 设置是否允许存在不可能执行到的代码。它的值有三种可能。

- `undefined`： 默认值，编辑器显示警告。
- `true`：忽略不可能执行到的代码。
- `false`：编译器报错。

#### allowUnusedLabels

`allowUnusedLabels` 设置是否允许存在没有用到的代码标签（label）。它的值有三种可能。

- `undefined`： 默认值，编辑器显示警告。
- `true`：忽略没有用到的代码标签。
- `false`：编译器报错。

#### baseUrl

`baseUrl` 的值为字符串，指定 TypeScript 项目的基准目录。

由于默认是以 `tsconfig.json` 的位置作为基准目录，所以一般情况不需要使用该属性。

```json
{
  "compilerOptions": {
    "baseUrl": "./"
  }
}
```

上面示例中，`baseUrl` 为当前目录 `./`。那么，当遇到下面的语句，TypeScript 将以 `./` 为起点，寻找 `hello/world.ts`。

```ts
import { helloWorld } from "hello/world";
```

#### checkJs

`checkJS` 设置对 JS 文件同样进行类型检查。打开这个属性，也会自动打开 `allowJs`。它等同于在 JS 脚本的头部添加 `// @ts-check` 命令。

```json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

#### composite

`composite` 打开某些设置，使得 TypeScript 项目可以进行增量构建，往往跟 `incremental` 属性配合使用。

#### declaration

`declaration` 设置编译时是否为每个脚本生成类型声明文件 `.d.ts`。

```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```

#### declarationDir

`declarationDir` 设置生成的 `.d.ts` 文件所在的目录。

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./types"
  }
}
```

#### declarationMap

`declarationMap` 设置生成 `.d.ts` 类型声明文件的同时，还会生成对应的 Source Map 文件。

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true
  }
}
```

#### emitBOM

`emitBOM` 设置是否在编译结果的文件头添加字节顺序标志 BOM，默认值是 `false`。

#### emitDeclarationOnly

`emitDeclarationOnly` 设置编译后只生成 `.d.ts` 文件，不生成 `.js` 文件。

#### esModuleInterop

`esModuleInterop` 修复了一些 CommonJS 和 ES6 模块之间的兼容性问题。

如果 `module` 属性为 `node16` 或 `nodenext`，则 `esModuleInterop` 默认为 `true`，其他情况默认为 `false`。

打开这个属性，使用 `import` 命令加载 CommonJS 模块时，TypeScript 会严格检查兼容性问题是否存在。

```ts
import * as moment from "moment";
moment(); // 报错
```

上面示例中，根据 ES6 规范，`import * as moment` 里面的 `moment` 是一个对象，不能当作函数调用，所以第二行报错了。

解决方法就是改写上面的语句，改成加载默认接口。

```ts
import moment from "moment";
moment(); // 不报错
```

打开 `esModuleInterop` 以后，如果将上面的代码编译成 CommonJS 模块格式，就会加入一些辅助函数，保证编译后的代码行为正确。

注意，打开 `esModuleInterop`，将自动打开 `allowSyntheticDefaultImports`。

#### exactOptionalPropertyTypes

`exactOptionalPropertyTypes` 设置可选属性不能赋值为 `undefined`。

```ts
// 打开 exactOptionalPropertyTypes
interface MyObj {
  foo?: "A" | "B";
}

let obj: MyObj = { foo: "A" };

obj.foo = undefined; // 报错
```

上面示例中，`foo` 是可选属性，打开 `exactOptionalPropertyTypes` 以后，该属性就不能显式赋值为 `undefined`。

#### forceConsistentCasingInFileNames

`forceConsistentCasingInFileNames` 设置文件名是否为大小写敏感，默认为 `true`。

#### incremental

`incremental` 让 TypeScript 项目构建时产生文件 `tsbuildinfo`，从而完成增量构建。

#### inlineSourceMap

`inlineSourceMap` 设置将 SourceMap 文件写入编译后的 JS 文件中，否则会单独生成一个 `.js.map` 文件。

#### inlineSources

`inlineSources` 设置将原始的 `.ts` 代码嵌入编译后的 JS 中。

它要求 `sourceMap` 或 `inlineSourceMap` 至少打开一个。

#### isolatedModules

`isolatedModules` 设置如果当前 TypeScript 脚本作为单个模块编译，是否会因为缺少其他脚本的类型信息而报错，主要便于非官方的编译工具（比如 Babel）正确编译单个脚本。

#### jsx

`jsx` 设置如何处理 `.tsx` 文件。它一般有以下三个值。

- `preserve`：保持 jsx 语法不变，输出的文件名为 jsx。
- `react`：将`<div />`编译成 `React.createElement("div")`，输出的文件名为 `.js`。
- `react-native`：保持 jsx 语法不变，输出的文件后缀名为 `.js`。

#### lib

`lib` 值是一个数组，描述项目需要加载的 TypeScript 内置类型描述文件，跟三斜线指令 `/// <reference lib="" />` 作用相同。

```json
{
  "compilerOptions": {
    "lib": ["dom", "es2021"]
  }
}
```

TypeScript 内置的类型描述文件，主要有以下一些，完整的清单可以参考 TypeScript 源码。

- ES5
- ES2015
- ES6
- ES2016
- ES7
- ES2017
- ES2018
- ES2019
- ES2020
- ES2021
- ES2022
- ESNex
- DOM
- WebWorker
- ScriptHost















