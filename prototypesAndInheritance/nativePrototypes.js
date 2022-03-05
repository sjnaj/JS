/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-20 12:17:17
 * @LastEditTime: 2022-02-20 20:48:12
 */
"use strict";
//"prototype" 属性在 JavaScript 自身的核心部分中被广泛地应用。所有的内建构造函数都用到了它。
{
    let obj = {};
    console.log(obj.toString()); // "[object Object]" ?(console.log自动转换)
    //Object 就是一个内建的对象构造函数，其自身的 prototype 指向一个带有 toString 和其他方法的一个巨大的对象。

    console.log(obj.__proto__ === Object.prototype); // true

    console.log(obj.toString === obj.__proto__.toString); //true
    console.log(obj.toString === Object.prototype.toString); //true
}
{
    //其他内建对象，像 Array、Date、Function 及其他，都在 prototype 上挂载了方法。
    //当我们创建一个数组 [1, 2, 3]，在内部会默认使用 new Array() 构造器。因此 Array.prototype 变成了这个数组的 prototype，并为这个数组提供数组的操作方法。这样内存的存储效率是很高的。
    //!按照规范，所有的内建原型顶端都是 Object.prototype。一切都从对象继承而来
    let arr = [1, 2, 3];

    // 它继承自 Array.prototype？
    console.log(arr.__proto__ === Array.prototype); // true

    // 接下来继承自 Object.prototype？
    console.log(arr.__proto__.__proto__ === Object.prototype); // true

    // 原型链的顶端为 null。
    console.log(arr.__proto__.__proto__.__proto__); // null

    function f() { }

    console.log(f.__proto__ == Function.prototype); // true
    console.log(f.__proto__.__proto__ == Object.prototype); // true, inherit from objects

}
{
    //     最复杂的事情发生在字符串、数字和布尔值上。
    //     *它们并不是对象。但是如果我们试图访问它们的属性，那么临时包装器对象将会通过内建的构造器 String、Number 和 Boolean 被创建。
    //     !它们提供给我们操作字符串、数字和布尔值的方法然后消失。
    //*这些对象的方法也驻留在它们的 prototype 中，可以通过 String.prototype、Number.prototype 和 Boolean.prototype 进行获取。
    //*特殊值 null 和 undefined 比较特殊。它们没有对象包装器，所以它们没有方法和属性。并且它们也没有相应的原型。
    String.prototype.show = function () {//这个方法将对所有的字符串都是可用的：
        console.log(this);
    };

    "BOOM!".show(); // BOOM!

    //在现代编程中，只有一种情况下允许修改原生原型。那就是 polyfilling。
    if (!String.prototype.repeat) { // 如果这儿没有这个方法
        // 那就在 prototype 中添加它

        String.prototype.repeat = function (n) {
            // 重复传入的字符串 n 次

            // 实际上，实现代码比这个要复杂一些（完整的方法可以在规范中找到）
            // 但即使是不够完美的 polyfill 也常常被认为是足够好的
            return new Array(n + 1).join(this);//*
        };
    }

    console.log("La".repeat(3)); // LaLaLa
}
{
    let obj = {
        0: "Hello",
        1: "world!",
        length: 2,
    };

    obj.join = Array.prototype.join;//方法借用

    console.log(obj.join(',')); // Hello,world!
    // *但是如果 obj 已经从另一个对象进行了继承，那么这种方法就不可行了（译注：因为这样会覆盖掉已有的继承。
    // *此处 obj 其实已经从 Object 进行了继承，但是 Array 也继承自 Object，所以此处的方法借用不会影响 obj 对原有继承的继承，因为 obj 通过原型链依旧继承了 Object）。
    // *请记住，一次只能继承一个对象。
    console.log([].join.call(obj, ','));//!简便等价形式（修改方法的this指向实现借用）
}
{
    //在所有函数的原型中添加 defer(ms) 方法，该方法返回一个包装器，将函数调用延迟 ms 毫秒。
    Function.prototype.defer = function (ms) {
        let f = this;
        return function (...args) {
            setTimeout(() => f.apply(this, args), ms);//*使用 this 以使装饰器适用于对象方法。
        };
    };
    function add(a, b) {
        console.log(a + b);
    }
    add.defer(1000)(1, 2); // 1 秒后显示 3

    
    let user = {
        name: "John",
        sayHi() {
            console.log(this.name);
        }
    };
    user.sayHi = user.sayHi.defer(1000);//外部的this为调用defer的user.sayHi

    user.sayHi();//内部的this为调用sayHi的user
}