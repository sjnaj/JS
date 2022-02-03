/*
 * @Author: fengsc
 * @Date: 2022-01-29 12:28:01
 * @LastEditTime: 2022-02-03 11:20:27
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
function sayHi() {
    console.log(this);
}

sayHi(); // undefined
//在这种情况下，严格模式下的 this 值为 undefined。如果我们尝试访问 this.name，将会报错。

// 在非严格模式的情况下，this 将会是全局对象（浏览器中的 window，(node.js中是一些系统变量)）。这是一个历史行为，"use strict" 已经将其修复了。
{
    function makeUser() {
        return {
            name: "John",
            ref: this
        };
    }

    let user = makeUser();

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
    console.log(user.address.street); // Error!
}

