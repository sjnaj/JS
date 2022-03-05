/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-20 21:51:16
 * @LastEditTime: 2022-02-20 22:05:32
 */
class User {

    constructor(name) {
        this.name = name;
    }

    sayHi() {
        console.log(this.name);
    }
    //常见的陷阱是在类的方法之间放置逗号，这会导致语法错误。

    //*不要把这里的符号与对象字面量相混淆。在类中，不需要逗号。

}

// 用法：
let user = new User("John");
user.sayHi();
// class User {... } 构造实际上做了如下的事儿：

// 创建一个名为 User 的函数，该函数成为类声明的结果。该函数的代码来自于 constructor 方法（如果我们不编写这种方法，那么它就被假定为空）。
// 存储类中的方法，例如 User.prototype 中的 sayHi。


// class 是一个函数
console.log(typeof User); // function

// ...或者，更确切地说，是 constructor 方法
console.log(User === User.prototype.constructor); // true

// 方法在 User.prototype 中，例如：
console.log(User.prototype.sayHi); // sayHi 方法的代码

// 在原型中实际上有两个方法
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
{
    // 用纯函数重写 class User

    // 1. 创建构造器函数
    function User(name) {
        this.name = name;
    }
    // 函数的原型（prototype）默认具有 "constructor" 属性，
    // 所以，我们不需要创建它

    // 2. 将方法添加到原型
    User.prototype.sayHi = function () {
        console.log(this.name);
    };
    // 这个定义的结果与使用类得到的结果基本相同。因此，这确实是将 class 视为一种定义构造器及其原型方法的语法糖的理由。

    // 尽管，它们之间存在着重大差异：

    //*首先，通过 class 创建的函数具有特殊的内部属性标记 [[IsClassConstructor]]: true。因此，它与手动创建并不完全相同。
    //*类方法不可枚举。 类定义将 "prototype" 中的所有方法的 enumerable 标志设置为 false。
    //这很好，因为如果我们对一个对象调用 for..in 方法，我们通常不希望 class 方法出现。
    //*类总是使用 use strict。 在类构造中的所有代码都将自动进入严格模式。

}
{
    function makeClass(phrase) {
        // 声明一个类并返回它
        return class {
            sayHi() {
                console.log(phrase);
            }
        };
    }

    // 创建一个新的类
    let User = makeClass("Hello");

    new User().sayHi(); // Hello
}
{
    //就像对象字面量，类可能包括 getters/setters，计算属性（computed properties）等。

    class User {

        constructor(name) {
            // !调用 setter
            this.name = name;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            if (value.length < 4) {
                console.log("Name is too short.");
                return;
            }
            this._name = value;
        }

    }

    let user = new User("John");
    console.log(user.name); // John

    user = new User(""); // Name is too short.
    //从技术上来讲，这样的类声明可以通过在 User.prototype 中创建 getters 和 setters 来实现。
}
{//类字段
    //*类字段重要的不同之处在于，它们会在每个独立对象中被设好，而不是设在 User.prototype：
    class User {
        name = "John";//!末尾是分号
    }

    let user = new User();
    console.log(user.name); // John
    console.log(User.prototype.name); // undefined

}
{

    // *“丢失 this”的解决办法
    // 传递一个包装函数，例如 setTimeout(() => button.click(), 1000)。
    // 将方法绑定(bind)到对象。
    //类字段提供了另一种非常优雅的语法：
    class Button {
        constructor(value) {
            this.value = value;
        }
        click = () => {
            console.log(this.value);
        };
    }

    let button = new Button("hello");

    setTimeout(button.click, 1000); // hello

    //!类字段 click = () => {...} 是基于每一个对象被创建的，在这里对于每一个 Button 对象都有一个独立的方法，
    //*在内部都有一个指向此对象的 this。我们可以把 button.click 传递到任何地方，而且 this 的值总是正确的。


}