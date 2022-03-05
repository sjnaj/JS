/*
 * @Author: fengsc
 * @Date: 2022-02-19 18:50:47
 * @LastEditTime: 2022-02-19 19:42:23
 */
"use strict";
// 对象属性（properties），除 value 外，还有三个特殊的特性（attributes），也就是所谓的“标志”：

// writable — 如果为 true，则值可以被修改，否则它是只可读的。
// enumerable — 如果为 true，则会被在循环中列出，否则不会被列出。
// configurable — 如果为 true，则此特性可以被删除，这些属性也可以被修改，否则不可以。
//当我们用“常用的方式”创建一个属性时，它们都为 true。但我们也可以随时更改它们。
{
    let user = {
        name: "John"
    };

    let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

    console.log(descriptor);
    /* 属性描述符：
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
}
{
    let user = {};

    Object.defineProperty(user, "name", {
        value: "John"
    });
    // 如果该属性存在，defineProperty 会更新其标志。
    // 否则，它会使用给定的值和标志创建属性；在这种情况下，如果没有提供标志，则会假定它是 false。

    let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

    console.log(descriptor);
    /*
    {
      "value": "John",
      "writable": false,
      "enumerable": false,
      "configurable": false
    }
     */
    //*与上面的“以常用方式创建的” user.name 进行比较：现在所有标志都为 false。
}
{
    let user = {};

    Object.defineProperty(user, "name", {
        value: "John",
        // 对于新属性，我们需要明确地列出哪些是 true
        enumerable: true,
        configurable: true
    });

    console.log(user.name); // John
    //user.name = "Pete"; // *Error(严格模式下)
}
{
    //通常，对象中内建的 toString 是不可枚举的，它不会显示在 for..in 中。
    //但是如果我们添加我们自己的 toString，那么默认情况下它将显示在 for..in 中，如下所示：

    let user = {
        name: "John",
        toString() {
            return this.name;
        }
    };

    // 默认情况下，我们的两个属性都会被列出：
    for (let key in user) console.log(key); // name, toString
    Object.defineProperty(user, "toString", {
        enumerable: false//设置为不可枚举
    });
    for (let key in user) console.log(key); // name
    console.log(Object.keys(user)); // name 也会被keys排除

}
{
    //configurable: false 防止更改和删除属性标志，但是允许更改对象的值。

    let user = {
        name: "John"
    };

    Object.defineProperty(user, "name", {
        configurable: false
    });

    user.name = "Pete"; // 正常工作
    //delete user.name; // Error
}
{
    let user = {
        name: "John"
    };

    Object.defineProperty(user, "name", {
        writable: false,
        configurable: false
    });

    // 不能修改 user.name 或它的标志
    // 下面的所有操作都不起作用：
    // user.name = "Pete";
    // delete user.name;
    // Object.defineProperty(user, "name", { value: "Pete" });
    //*对于不可配置的属性，我们可以将 writable: true 更改为 false，从而防止其值被修改（以添加另一层保护）。但无法反向行之。
}
{//一次性设置多个属性
    let user = {};
    Object.defineProperties(user, {
        name: { value: "John", writable: false },
        surname: { value: "Smith", writable: false },
        // ...
    });
}
{
    //要一次获取所有属性描述符，我们可以使用 Object.getOwnPropertyDescriptors(obj) 方法。
    //* let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
    //*Object.getOwnPropertyDescriptors 返回包含 symbol 类型的和不可枚举的属性在内的 所有 属性描述符。

//*一些限制访问整个对象的方法
    // *Object.preventExtensions(obj)
    // 禁止向对象添加新属性。
    // *Object.seal(obj)
    // 禁止添加 / 删除属性。为所有现有的属性设置 configurable: false。
    // *Object.freeze(obj)
    // 禁止添加 / 删除 / 更改属性。为所有现有的属性设置 configurable: false, writable: false。

//*     还有针对它们的测试：

// Object.isExtensible(obj)
//     如果添加属性被禁止，则返回 false，否则返回 true。
// Object.isSealed(obj)
//     如果添加/删除属性被禁止，并且所有现有的属性都具有 configurable: false则返回 true。
// Object.isFrozen(obj)
//     如果添加/删除/更改属性被禁止，并且所有当前属性都是 configurable: false, writable: false，则返回 true。 
}
