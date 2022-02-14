/*
 * @Author: fengsc
 * @Date: 2022-01-28 15:08:49
 * @LastEditTime: 2022-02-12 19:54:37
 */
// 大多数情况下，运算符和函数会自动将赋予它们的值转换为正确的类型。
//console.log(value)和console.log(value) 将 value 转换为字符串类型，然后显示这个值。
// 也可以显式地调用 String(value) 来将 value 转换为字符串类型：
let value = true;
console.log(typeof value); // boolean

value = String(value); // 现在，值是一个字符串形式的 "true"
console.log(typeof value); // string
// 在算术函数和表达式中，会自动进行 number 类型转换。
console.log("6" / "3"); //2,string 类型的值被自动转换成 number 类型后进行计算
// 也可以使用 Number(value) 显式地将这个 value 转换为 number 类型。
let str = "123";
console.log(typeof str); // string

let num = Number(str); // 变成 number 类型 123

console.log(typeof num); // number
// string转换规则 	去掉首尾空格后的纯数字字符串中含有的数字。如果剩余字符串为空，则转换结果为 0。
// 否则，将会从剩余字符串中“读取”数字。当类型转换出现 error 时返回 NaN。
console.log(Number(""));//0;
console.log(isNaN(Number("ok")));

// boolean类型转换直观上为“空”的值（如 0、空字符串、null、undefined 和 NaN）将变为 false。
// 其他值变成 true。
//通过Boolean进行类型转换

// 使用Boolean(value)方法可以强制转换任意值为boolean类型,除了以下六个值，其他都是自动转为true：
// undefined
// null
// -0
// +0
// NaN
// ‘’（空字符串）
//if语句会应用此转换
let a = 0;
console.log( Boolean(a) ); // false

let b = "0";
console.log( Boolean(b) ); // true

console.log(a == b); // true!

console.log( !!null ); // false，等价于下式，第一个非运算将该值转化为布尔类型并取反，第二个非运算再次取反。最后就得到了一个任意值到布尔值的转化。
console.log(Boolean(null));// false

// typeof null == "object" // JavaScript 编程语言的设计错误
// typeof function(){} == "function" // 函数被特殊对待