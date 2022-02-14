/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-01-29 12:28:01
 * @LastEditTime: 2022-02-05 11:21:43
 */
"use strict";
{// let user = new Object(); // “构造函数” 的语法
    // let user = {};  // “字面量” 的语法
    let user = {
        name: "John",
        age: 30,
        "likes birds": true  // 多词属性名必须加引号
    };

    console.log(user.name);
    console.log(user["name"]);
    console.log(user["likes birds"]);
    user.isAdmin = true;//添加属性
    delete user.age;//删除属性
    console.log(user.age);//undefined,访问不存在的属性
    console.log("name" in user);//判断对象是否存在
    //属性存在，但存储的值是 undefined 的时候 只能用in判断是否存在
    //通常情况下不应该给对象赋值 undefined。我们通常会用 null 来表示未知的或者空的值。

    let key = "name";
    console.log(user[key])//不能用点访问
    let fruit = "apple";
    let bag = {
        [fruit + "Computer"]: 5,//方括号表示键值是变量的值
    };
    console.log(bag.appleComputer);//访问不能用方括号里的变量
    // 方括号比点符号更强大。它允许任何属性名和变量，但写起来也更加麻烦。

    // 所以，大部分时间里，当属性名是已知且简单的时候，就使用点符号。如果我们需要一些更复杂的内容，那么就用方括号。
}
{
    // function makeUser(name, age) {
    //     return {
    //         name: name,
    //         age: age,
    //         // ……其他的属性
    //     };
    // }
    function makeUser(name, age) {//属性值缩写方法
        return {
            name, // 与 name: name 相同
            age,  // 与 age: age 相同
            // ...
        };
    }
    let user = makeUser("John", 30);
    console.log(user);
}
{
    //属性名可以是任何字符串或者 symbol,不受保留字限制
    // 其他类型会被自动地转换为字符串。
    let obj = {
        0: "test" // 等同于 "0": "test"
    };

    // 都会输出相同的属性（数字 0 被转为字符串 "0"）
    console.log(obj["0"]); // test
    console.log(obj[0]); // test (相同的属性)
}
{
    //小陷阱：一个名为 __proto__ 的属性。我们不能将它设置为一个非对象的值
    let obj = {};
    obj.__proto__ = 5; // 分配一个数字
    console.log(obj.__proto__); // [object Object] — 值为对象，与预期结果不同

}
{
    let codes = {
        "49": "Germany",
        "41": "Switzerland",
        "44": "Great Britain",
        // ..,
        "1": "USA"
    };

    for (let code in codes) {
        console.log(code); // 1, 41, 44, 49
        //整数属性会被进行排序，其他属性则按照创建的顺序显示。
        //“49” 是一个整数属性名，因为我们把它转换成整数，再转换回来，它还是一样的。但是 “+49” 和 “1.2” 就不行了：
    }
    //可以使用非整数属性名来"欺骗"程序。只需要给每个键名加一个加号 "+" 前缀就行了。
    {
        let codes = {
            "+49": "Germany",
            "+41": "Switzerland",
            "+44": "Great Britain",
            // ..,
            "+1": "USA"
        };

        for (let code in codes) {
            console.log(+code); // 49, 41, 44, 1
        }
    }
}
{
    function isEmpty(obj) {
        for (let key in obj)
            return false;
        return true;
    }
    console.log(isEmpty({}));
    console.log(isEmpty({ foo: "bar" }));
}
{
    let user = { name: "John" };

    let admin = user; // 复制引用
    console.log(user == admin); // true，都引用同一对象
    console.log(user === admin); // true

    let a = {};
    let b = {}; // 两个独立的对象

    console.log(a == b); // false
    //对于类似 obj1 > obj2 的比较，或者跟一个原始类型值的比较 obj == 5，对象都会被转换为原始值。

}
{
    let user = {
        name: "John",
        age: 30
    };

    let clone = {}; // 新的空对象

    // 将 user 中所有的属性拷贝到其中
    for (let key in user) {
        clone[key] = user[key];
    }

    // 现在 clone 是带有相同内容的完全独立的对象
    clone.name = "Pete"; // 改变了其中的数据

    console.log(user.name); // 原来的对象中的 name 属性依然是 John

    let clone2 = {};
    Object.assign(clone2, user);//与上面的拷贝等价
    console.log(clone2.name);
    let permissions1 = { canView: true };
    let permissions2 = { canEdit: true };

    // 将 permissions1 和 permissions2 中的所有属性都拷贝到 user 中
    let clone3 = Object.assign({}, permissions1, permissions2);//将后两个合并拷贝到第一个对象
    console.log(clone3);
}
{
    let user = {
        name: "John",
        sizes: {
            height: 182,
            width: 50
        }
    };

    let clone = Object.assign({}, user);

    console.log(user.sizes === clone.sizes); // true，同一个对象

    // user 和 clone 分享同一个 sizes
    user.sizes.width++;       // 通过其中一个改变属性值
    console.log(clone.sizes.width); // 51，能从另外一个看到变更的结果
    //为了解决这个问题，我们应该使用一个拷贝循环来检查 user[key] 的每个值，如果它是一个对象，那么也复制它的结构。这就是所谓的“深拷贝”。
    //为了不重复造轮子，采用现有的实现，例如 lodash 库的 _.cloneDeep(obj)。
    var _ = require('lodash');//加载lodash中的'_'模块
    let deepClone = _.cloneDeep(user);
    console.log(user.sizes === deepClone.sizes); // false，不同对象



}

//定期执行以下“垃圾回收”步骤：

// 垃圾收集器找到所有的根，并“标记”（记住）它们。
// 然后它遍历并“标记”来自它们的所有引用。
// 然后它遍历标记的对象并标记 它们的 引用。所有被遍历到的对象都会被记住，以免将来再次遍历到同一个对象。
// ……如此操作，直到所有可达的（从根部）引用都被访问到。
// 没有被标记的对象都会被删除。


//在 JavaScript 中，this 是“自由”的，它的值是在调用时计算出来的，它的值并不取决于方法声明的位置，而是取决于在“点符号前”的是什么对象。

// 在运行时对 this 求值的这个概念既有优点也有缺点。一方面，函数可以被重用于不同的对象。另一方面，更大的灵活性造成了更大的出错的可能。
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
    console.log(this.name);
}

// 在两个对象中使用相同的函数
user.f = sayHi;
admin.f = sayHi;

// 这两个调用有不同的 this 值
// 函数内部的 "this" 是“点符号前面”的那个对象
user.f(); // John（this == user）
admin.f(); // Admin（this == admin）
// function sayHi() {
//     console.log(this);
// }

// sayHi(); // undefined
//在这种情况下，严格模式下的 this 值为 undefined。如果我们尝试访问 this.name，将会报错。

// 在非严格模式的情况下，this 将会是全局对象（浏览器中的 window，(node.js中是一些系统变量)）。这是一个历史行为，"use strict" 已经将其修复了。
{
    // function makeUser() {
    //     return {
    //         name: "John",
    //         ref: this
    //     };
    // }

    // let user = makeUser();

    // console.log(user.ref.name); // Error: Cannot read property 'name' of undefined
    //   设置 this 的规则不考虑对象定义。只有调用那一刻才重要。

    // 这里 makeUser() 中的 this 的值是 undefined，因为它是被作为函数调用的，而不是通过点符号被作为方法调用。

    // this 的值是对于整个函数的，代码段和对象字面量对它都没有影响。

    // 所以 ref: this 实际上取的是当前函数的 this。
}
{
    function makeUser() {
        return {
            name: "John",
            ref() {
                return this;
            }
        };
    }

    let user = makeUser();

    console.log(user.ref().name); // John

}
{
    //构造函数在技术上是常规函数。不过有两个约定：

    // 它们的命名以大写字母开头。
    // 它们只能由 "new" 操作符来执行。
    // function User(name) {
    //     this.name = name;
    //     this.isAdmin = false;
    // }
    class User {//类定义
        constructor(name) {
            this.name = name;
            this.isAdmin = false;
        }
    }

    let user = new User("Jack");

    console.log(user.name); // Jack
    console.log(user.isAdmin); // false

    //     通常，构造器没有 return 语句。它们的任务是将所有必要的东西写入 this，并自动转换为结果。

    // 但是，如果这有一个 return 语句，那么规则就简单了：

    //     如果 return 返回的是一个对象，则返回这个对象，而不是 this。
    //     如果 return 返回的是一个原始类型，则忽略。

    //! 换句话说，带有对象的 return 返回该对象，在所有其他情况下返回 this。
}
{
    let user = {}; // 一个没有 "address" 属性的 user 对象
    // console.log(user.address.street); // Error!
    console.log(user.address && user.address.street && user.address.street.name); // undefined（不报错）
    //可选链 ?. 是一种访问嵌套对象属性的安全的方式。即使中间的属性不存在，也不会出现错误。
    console.log(user?.address?.street); // undefined（不报错）
    user = null;
    console.log(user?.address)//user不存在也不会报错， undefined
    // /?. 语法使其前面的值成为可选值，但不会对其后面的起作用。
    //如果 ?. 左边部分不存在，就会立即停止运算（“短路效应”）。
    //所以，如果后面有任何函数调用或者副作用，它们均不会执行。
    //     应该只将 ?. 使用在一些东西可以不存在的地方。

    // 例如，如果根据我们的代码逻辑，user 对象必须存在，但 address 是可选的，那么我们应该这样写 user.address?.street，而不是这样 user?.address?.street。

    // 所以，如果 user 恰巧因为失误变为 undefined，我们会看到一个编程错误并修复它。否则，代码中的错误在不恰当的地方被消除了，这会导致调试更加困难。
    //如果未声明变量 user，那么 user?.anything 会触发一个错误
    //另外两种用法
    //    obj?.[prop] —— 如果 obj 存在则返回 obj[prop]，否则返回 undefined。
    // obj.method?.() —— 如果 obj.method 存在则调用 obj.method()，否则返回 undefined。


}
{
    //“Symbol” 值表示唯一的标识符。
    // let id = Symbol();
    // id 是描述为 "id" 的 Symbol
    let id = Symbol("id");
    let id1 = Symbol("id");
    let id2 = Symbol("id");
    console.log(id1 == id2); // false Symbol 保证是唯一的。即使我们创建了许多具有相同描述的 Symbol，它们的值也是不同。描述只是一个标签，不影响任何东西。
    //JavaScript 中的大多数值都支持字符串的隐式转换。例如，我们可以console.log 任何值，都可以生效。Symbol 比较特殊，它不会被自动转换。
    //console.log(id);
    console.log(id);
    console.log(id.toString());//与上面等价，但可以alert
    console.log(id.description); // id 获取 symbol.description 属性
    {
        let user = { // 属于另一个代码
            name: "John"
        };

        let id = Symbol("id");

        user[id] = 1;

        console.log(user[id]); // 我们可以使用 Symbol 作为键来访问数据
        //因为 user 对象属于其他的代码，那些代码也会使用这个对象，所以我们不应该在它上面直接添加任何字段，这样很不安全。
        //但是你添加的 Symbol 属性不会被意外访问到，第三方代码根本不会看到它，所以使用 Symbol 基本上不会有问题。
        //但如果我们处于同样的目的，使用字符串 "id" 而不是用 symbol，那么 就会 出现冲突 
        // 另外，假设另一个脚本希望在 user 中有自己的标识符，以实现自己的目的。这可能是另一个 JavaScript 库，因此脚本之间完全不了解彼此。

    }
    {
        let id = Symbol("id");
        let user = {
            name: "John",
            age: 30,
            [id]: 123
        };

        for (let key in user) console.log(key); // name, age (no symbols)

        // 使用 Symbol 任务直接访问
        //Object.keys(user) 也会忽略它们。这是一般“隐藏符号属性”原则的一部分。如果另一个脚本或库遍历我们的对象，它不会意外地访问到符号属性。
        console.log("Direct: " + user[id]);
        let clone = Object.assign({}, user);//Object.assign 会同时复制字符串和 symbol 属性：

        console.log(clone[id]); // 123
    }
    {
        // 通常所有的 Symbol 都是不同的，即使它们有相同的名字。但有时我们想要名字相同的 Symbol 具有相同的实体。
        // 例如，应用程序的不同部分想要访问的 Symbol "id" 指的是完全相同的属性。

        //为了实现这一点，这里有一个 全局 Symbol 注册表。我们可以在其中创建 Symbol 并在稍后访问它们，它可以确保每次访问相同名字的 Symbol 时，返回的都是相同的 Symbol。

        //要从注册表中读取（不存在则创建）Symbol，请使用 Symbol.for(key)。

        //该调用会检查全局注册表，如果有一个描述为 key 的 Symbol，则返回该 Symbol，否则将创建一个新 Symbol（Symbol(key)），并通过给定的 key 将其存储在注册表中
        // 从全局注册表中读取
        let id = Symbol.for("id"); // 如果该 Symbol 不存在，则创建它

        // 再次读取（可能是在代码中的另一个位置）
        let idAgain = Symbol.for("id");

        // 相同的 Symbol
        console.log(id === idAgain); // true
        console.log(Symbol.keyFor(id)); // id 通过全局 Symbol 返回一个名字
        console.log(Symbol.keyFor(idAgain));//id
        console.log(Symbol.keyFor(id1));//undefined

        //         JavaScript 内部有很多“系统” Symbol，我们可以使用它们来微调对象的各个方面。

        // 它们都被列在了 众所周知的 Symbol 表的规范中：

        //     Symbol.hasInstance
        //     Symbol.isConcatSpreadable
        //     Symbol.iterator
        //     Symbol.toPrimitive
        //     ……等等。

        //从技术上说，Symbol 不是 100% 隐藏的。有一个内建方法 Object.getOwnPropertySymbols(obj) 允许我们获取所有的 Symbol。
        //还有一个名为 Reflect.ownKeys(obj) 的方法可以返回一个对象的 所有 键，包括 Symbol。
        //所以它们并不是真正的隐藏。但是大多数库、内建方法和语法结构都没有使用这些方法。

    }
}

{

    // 所有的对象在布尔上下文（context）中均为 true。所以对于对象，不存在 to-boolean 转换，只有字符串和数值转换。
    // 数值转换发生在对象相减或应用数学函数时。例如，Date 对象（将在 日期和时间 一章中介绍）可以相减，date1 - date2 的结果是两个日期之间的差值。
    // 至于字符串转换 —— 通常发生在我们像console.log(obj) 这样输出一个对象和类似的上下文中。
    let user = { name: "john" };
    console.log(user);
    //下面是三个类型转换的变体，被称为 “hint”，在 规范 中有详细介绍（译注：当一个对象被用在需要原始值的上下文中时，例如，在console.log 或数学运算中，对象会被转换为原始值）：
    // "string"

    // 对象到字符串的转换，当我们对期望一个字符串的对象执行操作时，如 “alert”：

    // "number"

    // 对象到数字的转换，例如当我们进行数学运算时：

    // "default"

    // 在少数情况下发生，当运算符“不确定”期望值的类型时。
    // 当二元加法得到对象类型的参数时，它将依据 "default" hint 来对其进行转换。

    // 此外，如果对象被用于与字符串、数字或 symbol 进行 == 比较，这时到底应该进行哪种转换也不是很明确，因此使用 "default" hint。


    // 为了进行转换，JavaScript 尝试查找并调用三个对象方法：

    // 调用 obj[Symbol.toPrimitive](hint) —— 带有 symbol 键 Symbol.toPrimitive（系统 symbol）的方法，如果这个方法存在的话，
    // 否则，如果 hint 是 "string" —— 尝试 obj.toString() 和 obj.valueOf()，无论哪个存在。
    // 否则，如果 hint 是 "number" 或 "default" —— 尝试 obj.valueOf() 和 obj.toString()，无论哪个存在。

    // 默认情况下，普通对象具有 toString 和 valueOf 方法：

    // toString 方法返回一个字符串 "[object Object]"。
    // valueOf 方法返回对象自身。

    {
        let user = {
            name: "John",
            money: 1000,

            [Symbol.toPrimitive](hint) {
                console.log(`hint: ${hint}`);
                return hint == "string" ? `{name: "${this.name}"}` : this.money;
            }
        };

        // 转换演示：
        console.log(user); // hint: string -> {name: "John"}
        console.log(+user); // hint: number -> 1000
        console.log(user + 500); // hint: default -> 1500
    }
    {
        let user = {
            name: "John",
            money: 1000,

            // 对于 hint="string"
            toString() {
                return `{name: "${this.name}"}`;
            },

            // 对于 hint="number" 或 "default"
            valueOf() {
                return this.money;
            }

        };

        console.log(user); // toString -> {name: "John"}
        console.log(+user); // valueOf -> 1000
        console.log(user + 500); // valueOf -> 1500}



    }
    {
        let user = {
            name: "John",

            toString() {
                return this.name;
            }
        };

        console.log(user); // toString -> John
        console.log(user + 500); // toString -> John500
        //如果没有 Symbol.toPrimitive 和 valueOf，toString 将处理所有原始转换。
    }
    //由于历史原因，如果 toString 或 valueOf 返回一个对象，则不会出现 error，但是这种值会被忽略（就像这种方法根本不存在）。
    //相反，Symbol.toPrimitive 必须 返回一个原始值，否则就会出现 error。
    {
        //让 a==1&&a==2&&a==3的值为true
        let a = { value: 0 };
        a[Symbol.toPrimitive] = function (hint) {
            console.log(hint); // default
            return this.value += 1;
        }
        console.log(a == 1 && a == 2 && a == 3); // true

    } {
        let a = { value: 0 };
        a.valueOf = function () {
            return this.value += 1;
        };
        console.log(a == 1 && a == 2 && a == 3); // true
    }

    {
        let a = { value: 0 };
        a.toString = function () {
            return this.value += 1;
        };
        console.log(a == 1 && a == 2 && a == 3); // true
    }
}
