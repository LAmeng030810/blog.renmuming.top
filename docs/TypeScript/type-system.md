# TypeScript 的类型系统

##

## 基本类型

### 概述

JavaScript 语言（注意，不是 TypeScript）将值分成 8 种类型。

- `boolean`
- `string`
- `number`
- `bigint`
- `symbol`
- `object`
- `undefined`
- `null`

TypeScript 继承了 JavaScript 的类型设计，以上 8 种类型可以看作 TypeScript 的基本类型。

注意，上面所有类型的名称都是小写字母，首字母大写的 `Number`、`String`、`Boolean` 等在 JavaScript 语言中都是内置对象，而不是类型名称。

另外，undefined 和 null 既可以作为值，也可以作为类型，取决于在哪里使用它们。

这 8 种基本类型是 TypeScript 类型系统的基础，复杂类型由它们组合而成。

### boolean 类型

boolean 类型只包含 `true` 和 `false` 两个布尔值。

```ts
const x: boolean = true;
const y: boolean = false;
```

### string 类型

string 类型包含所有字符串。

```ts
const x: string = "hello";
const y: string = `${x} world`;
```

### number 类型

number 类型包含所有整数和浮点数。

```ts
const x: number = 123;
const y: number = 3.14;
const z: number = 0xffff;
```

### bigint 类型

bigint 类型包含所有的大整数。

```ts
const x: bigint = 123n;
const y: bigint = 0xffffn;
```

bigint 与 number 类型不兼容。

```ts
const x: bigint = 123; // 报错
const y: bigint = 3.14; // 报错
```

注意，bigint 类型是 ES2020 标准引入的。如果使用这个类型，TypeScript 编译的目标 JavaScript 版本不能低于 ES2020（即编译参数 `target` 不低于 `es2020`）。

### symbol 类型

symbol 类型包含所有的 Symbol 值。

```ts
const x: symbol = Symbol();
```

symbol 类型的详细介绍，参见《Symbol》一章

### object 类型

根据 JavaScript 的设计，object 类型包含了所有对象、数组和函数。

```ts
const x: object = { foo: 123 };
const y: object = [1, 2, 3];
const z: object = (n: number) => n + 1;
```

### undefined 类型，null 类型

undefined 和 null 是两种独立类型，它们各自都只有一个值。

undefined 类型只包含一个值 `undefined`，表示未定义（即还未给出定义，以后可能会有定义）。

null 类型也只包含一个值 `null`，表示为空（即此处没有值）。

```ts
let x: undefined = undefined;
const x: null = null;
```

注意，如果没有声明类型的变量，被赋值为 `undefined` 或 `null`，它们的类型会被推断为 `any`。

```ts
let a = undefined; // any
const b = undefined; // any

let c = null; // any
const d = null; // any
```

如果希望避免这种情况，则需要打开编译选项 `strictNullChecks`，这样赋值为 `undefined` 的变量会被推断为 `undefined` 类型，赋值为 `null` 的变量会被推断为 `null` 类型。

## 包装对象类型

### 包装对象的概念

JavaScript 的 8 种类型之中，`undefined` 和 `null` 其实是两个特殊值，`object` 属于复合类型，剩下的五种属于原始类型（primitive value），代表最基本的、不可再分的值。

- boolean
- string
- number
- bigint
- symbol

上面这五种原始类型的值，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是这些值在需要时，会自动产生的对象。

```js
"hello".charAt(1); // 'e'
```

上面示例中，字符串 `hello` 执行了 `charAt()` 方法。但是，在 JavaScript 语言中，只有对象才有方法，原始类型的值本身没有方法。这行代码之所以可以运行，就是因为在调用方法时，字符串会自动转为包装对象，`charAt()` 方法其实是定义在包装对象上。

这样的设计大大方便了字符串处理，省去了将原始类型的值手动转成对象实例的麻烦。

五种包装对象之中，symbol 类型和 bigint 类型无法直接获取它们的包装对象（即 `Symbol()` 和 `BigInt()` 不能作为构造函数使用），但是剩下三种可以。

- `Boolean()`
- `String()`
- `Number()`

以上三个构造函数，执行后可以直接获取某个原始类型值的包装对象。

```ts
const s = new String("hello");
typeof s; // 'object'
s.charAt(1); // 'e'
```

上面示例中，`s` 就是字符串 `hello` 的包装对象，`typeof` 运算符返回 `object`，不是 `string`，但是本质上它还是字符串，可以使用所有的字符串方法。

注意，`String()` 只有当作构造函数使用时（即带有 `new` 命令调用），才会返回包装对象。如果当作普通函数使用（不带有 `new` 命令），返回就是一个普通字符串。其他两个构造函数 `Number()` 和 `Boolean()` 也是如此。

### 包装对象类型与字面量类型



















