/*
 * @Author: fengsc
 * @Date: 2022-01-28 15:27:26
 * @LastEditTime: 2022-01-29 14:51:30
 */
console.log(2 ** 4); // 2⁴ = 16
console.log(8 ** (1 / 3)); // 2（1/3 次方与立方根相同)
let s = "my" + "string";
console.log(s); // mystring
console.log(2 + 2 + '1'); // "41"，不是 "221"
console.log('1' + 2 + 2); // "122"，不是 "14"

// 转化非数字
console.log(+true); // 1
console.log(+""); // 0

let apples = "2";
let oranges = "3";
// 在二元运算符加号起作用之前，所有的值都被转化为了数字
console.log(+apples + +oranges); // 5
// 一元运算符优先级高于二元运算符
//逗号运算符
let a = (1 + 2, 3 + 4); //注意逗号运算符的优先级非常低，比 = 还要低，因此例子中圆括号非常重要。
console.log(a); //7,第一个语句 1 + 2 运行了，但是它的结果被丢弃了。随后计算 3 + 4，并且该计算结果被返回。

// 当对不同类型的值进行比较时，JavaScript 会首先将其转化为数字（number）再判定大小。
console.log('2' > 1); // true，字符串 '2' 会被转化为数字 2
console.log('01' == 1); // true，字符串 '01' 会被转化为数字 1
console.log("2" > "12"); //true,同类型不会转换，按ASCII码比较
console.log(1 < 2 < 3); //! 1 < 2为true，true < 3的时候true转化为了1所以是true；

//严格相等运算符 === 在进行比较时不会做任何的类型转换。
console.log(0 == false); //true
console.log(0 === false); //false   
console.log('' == false); //true
console.log('' === false); //false
console.log(undefined == null); //!true
console.log(undefined === null); //false
// 当使用数学式或其他比较方法 < > <= >= 时：
//     null/undefined 会被转化为数字：null 被转化为 0，undefined 被转化为 NaN。

console.log(null > 0); // (1) false
console.log(null == 0); //! (2) false
console.log(null >= 0); // (3) true
// 相等性检查 == 和普通比较符 > < >= <= 的代码逻辑是相互独立的。
// 进行值的比较时，null 会被转化为数字，因此它被转化为了 0。
//undefined 和 null 在相等性检查 == 中不会进行任何的类型转换，它们有自己独立的比较规则，所以除了它们之间互等外，不会等于任何其他的值。
console.log(undefined > 0); // false (1)
console.log(undefined < 0); // false (2)
console.log(undefined == 0); // false (3)
// undefined 在比较中被转换为了 NaN，而 NaN 是一个特殊的数值型值，它与任何值进行比较都会返回 false。
// undefined 只与 null 相等(反之亦成立)，不会与其他值相等

// 除了严格相等 === 外，其他但凡是有 undefined/null 参与的比较，我们都需要格外小心。
// 除非你非常清楚自己在做什么，否则永远不要使用 >= > < <= 去比较一个可能为 null/undefined 的变量。对于取值可能是 null/undefined 的变量，请按需要分别检查它的取值情况。

//result = value1 || value2 || value3;
// 或运算符 || 做了如下的事情：

//     从左到右依次计算操作数。
//     处理每一个操作数时，都将其转化为布尔值。如果结果是 true，就停止计算，返回这个操作数的初始值。
//     如果所有的操作数都被计算过（也就是，转换结果都是 false），则返回最后一个操作数。
console.log(null || 0 || 1); // 1（第一个真值）

console.log(undefined || null || 0); // 0（都是假值，返回最后一个值）

//获取变量列表或者表达式中的第一个真值。
let firstName = "";
let lastName = "";
let nickName = "SuperCoder";

console.log(firstName || lastName || nickName || "Anonymous"); // SuperCoder

//console.log( console.log(1) || 2 || console.log(3) );//console.log(1),然后console.log(2) 对 console.log 的调用没有返回值。或者说返回的是 undefined。

false || console.log("printed"); //只在左侧的条件为假时才执行命令

console.log(1 && 2 && null && 3); // null,返回第一个假值

//空值合并运算符??:返回第一个已定义值,主要用于为未定义值设置默认值(Node.js不支持)
let height = 0;

console.log(height || 100); // 100
console.log(height ?? 100); // 0
