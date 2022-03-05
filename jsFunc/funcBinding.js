/* eslint-disable no-func-assign */
/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-19 01:02:13
 * @LastEditTime: 2022-02-20 15:51:57
 */
"use strict";

//*当将对象方法作为回调进行传递，例如传递给 setTimeout，这儿会存在一个常见的问题：“丢失 this”。

let user = {
    firstName: "John",
    sayHi() {
        console.log(`Hello, ${this.firstName}!`);
    }
};

setTimeout(user.sayHi, 1000); // Hello, undefined!
//*浏览器中的 setTimeout 方法有些特殊：它为函数调用设定了 this=window（对于 Node.js，this 则会变为计时器（timer）对象，但在这儿并不重要）
// 最后一行可以被重写为：
// let f = user.sayHi;
//* setTimeout(f, 1000); // 丢失了 user 上下文

{//包装器
    let user = {
        firstName: "John",
        sayHi() {
            console.log(`Hello, ${this.firstName}!`);
        }
    };

    // setTimeout(function () {
    //     user.sayHi(); // Hello, John!
    // }, 1000);
    //简短写法
    setTimeout(() => user.sayHi(), 1000); // Hello, John!

    //*现在它可以正常工作了，因为它从外部词法环境中获取到了 user，就可以正常地调用方法了。

    //*漏洞：如果在 setTimeout 触发之前（有一秒的延迟！）user 的值改变了，那么，突然间，它将调用错误的对象！



}
{
    let user = {
        firstName: "John",
        sayHi() {
            console.log(`Hello, ${this.firstName}!`);
        }
    };

    let sayHi = user.sayHi.bind(user); // (*)

    // 可以在没有对象（译注：与对象分离）的情况下运行它
    sayHi(); // Hello, John!

    setTimeout(sayHi, 1000); // Hello, John!

    // 即使 user 的值在不到 1 秒内发生了改变
    //* sayHi 还是会使用预先绑定（pre-bound）的值，该值是对旧的 user 对象的引用
    user = {
        sayHi() { console.log("Another user in setTimeout!"); }
    };
    // 如果一个对象有很多方法，并且我们都打算将它们都传递出去，那么我们可以在一个循环中完成所有方法的绑定：

    for (let key in user) {
        if (typeof user[key] == 'function') {
            user[key] = user[key].bind(user);
        }
    }

}
{//偏函数
    function mul(a, b) {
        return a * b;
    }

    let double = mul.bind(null, 2);//实际上没有用到 this。但是 bind 需要它，所以必须传入 null 之类的东西。
    //等价于
    //let double=partial(mul,2);
    console.log(double(3)); // = mul(2, 3) = 6
    console.log(double(4)); // = mul(2, 4) = 8
    console.log(double(5)); // = mul(2, 5) = 10

    function partial(func, ...argsBound) {
        return function (...args) { // (*)
            return func.call(this, ...argsBound, ...args);//*绑定与原函数相同的this
        };
    }

    // 用法：
    let user = {
        firstName: "John",
        say(time, phrase) {
            console.log(`[${time}] ${this.firstName}: ${phrase}!`);
        }
    };

    // 添加一个带有绑定时间的 partial 方法
    user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());
    //等价于
    //user.sayNow = user.say.bind(user, new Date().getHours() + ':' + new Date().getMinutes());


    user.sayNow("Hello");
    // 类似于这样的一些内容：
    // [10:00] John: Hello!

}
{
    function f() {
        console.log(this.name);
    }

    f = f.bind({ name: "John" }).bind({ name: "Pete" });

    f(); // John
    //  f.bind(...) 返回的外来（exotic）绑定函数对象仅在创建的时候记忆上下文（以及参数，如果提供了的话）。

    //* 一个函数不能被重绑定（re-bound）。


}
{
    function sayHi() {
        console.log(this.name);
    }
    sayHi.test = 5;

    let bound = sayHi.bind({
        name: "John"
    });

    console.log(bound.test); // 输出将会是什么？为什么？
    //undefined
    //*bind 的结果是另一个对象。它并没有原对象的属性。

}
{
    const prompt = require('prompt-sync')();    //Nodejs中得到用户输入
    function askPassword(ok, fail) {
        let password = prompt("Password?", '');
        if (password == "rockstar") ok();
        else fail();
    }

    let user = {
        name: 'John',

        loginOk() {
            console.log(`${this.name} logged in`);
        },

        loginFail() {
            console.log(`${this.name} failed to log in`);
        },

    };

    // askPassword(user.loginOk, user.loginFail);//丢失this
    //以下两种等价
    askPassword(() => user.loginOk(), () => user.loginFail());
    //    askPassword(user.loginOk.bind(user),user.loginFail.bind(user));

//     箭头函数 => 和使用 .bind(this) 调用的常规函数之间有细微的差别：

// .bind(this) 创建了一个该函数的“绑定版本”。
// 箭头函数 => 没有创建任何绑定。箭头函数只是没有 this。this 的查找与常规变量的搜索方式完全相同：在外部词法环境中查找。

}