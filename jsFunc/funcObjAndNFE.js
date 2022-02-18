/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-18 18:54:22
 * @LastEditTime: 2022-02-19 00:20:06
 */
{
    {
        // 在 JavaScript 中，函数就是对象。
        // 一个函数的名字可以通过属性 “name” 来访问：
        function sayHi() {
            console.log("Hi");
        }

        console.log(sayHi.name); // sayHi
    }
    {
        //即使函数被创建时没有名字，名称赋值的逻辑也能给它赋予一个正确的名字，然后进行赋值
        //规范中把这种特性叫做「上下文命名」。如果函数自己没有提供，那么在赋值中，会根据上下文来推测一个。
        let sayHi = function () {
            console.log("Hi");
        };

        console.log(sayHi.name); // sayHi（有名字！）
    }
    {//对象方法也有名字
        let user = {

            sayHi() {
                // ...
            },

            sayBye: function () {
                // ...
            }

        }

        console.log(user.sayHi.name); // sayHi
        console.log(user.sayBye.name); // sayBye
    }
    {//属性"length"
        function f1(a) { }
        function f2(a, b) { }
        function many(a, b, ...more) { }

        console.log(f1.length); // 1
        console.log(f2.length); // 2
        console.log(many.length); // 2
        //rest 参数不参与计数。
    }
    {//自定义属性
        function sayHi() {
            console.log("Hi");

            // 计算调用次数
            sayHi.counter++;
        }
        sayHi.counter = 0; // 初始值(放在函数定义前后均可)

        //被赋值给函数的属性，比如 sayHi.counter = 0，不会 在函数内定义一个局部变量 counter。换句话说，属性 counter 和变量 let counter 是毫不相关的两个东西。

        //我们可以把函数当作对象，在它里面存储属性，但是这对它的执行没有任何影响。变量不是函数属性，反之亦然。它们之间是平行的。


        sayHi(); // Hi
        sayHi(); // Hi

        console.log(`Called ${sayHi.counter} times`); // Called 2 times

    }
    {
        // 函数属性有时会用来替代闭包
        function makeCounter() {
            // 不需要这个了
            // let count = 0

            function counter() {
                return counter.count++;
            }

            counter.count = 0;//初值

            return counter;
        }

        let counter = makeCounter();
        console.log(counter()); // 0
        console.log(counter()); // 1
        //两者最大的不同就是如果 count 的值位于外层（函数）变量中，那么外部的代码无法访问到它，只有嵌套的函数可以修改它。
        //而如果它是绑定到函数的，那么就很容易：
        counter.count = 10;
        console.log(counter());//10
    }
}
{//命名函数表达式（NFE，Named Function Expression），指带有名字的函数表达式的术语。
    let sayHi = function func(who) {
        console.log(`Hello, ${who}`);
    };

    sayHi("John"); // Hello, John
    //func(); // Error, func is not defined（在函数外不可见）
    // 关于名字 func 有两个特殊的地方，这就是添加它的原因：

    // 它允许函数在内部引用自己。
    // 它在函数外是不可见的。
    {
        let sayHi = function (who) {
            if (who) {
                console.log(`Hello, ${who}`);
            } else {
                //sayHi("Guest"); // Error: sayHi is not a function
            }
        };

        let welcome = sayHi;
        sayHi = null;

        // welcome(); // Error，嵌套调用 sayHi 不再有效！}

    }
    {
        let sayHi = function func(who) {
            if (who) {
                console.log(`Hello, ${who}`);
            } else {
                func("Guest"); // 现在一切正常
            }
        };

        let welcome = sayHi;
        sayHi = null;

        welcome(); // Hello, Guest（嵌套调用有效）
    }
    {//任意数量的括号求和
        function sum(a) {

            let currentSum = a;

            function f(b) {
                currentSum += b;
                return f;
            }

            f.toString = function () {
                return currentSum;
            };

            return f;//只工作第一次
        }
        //Nodejs下不能正常工作
        console.log(sum(1)(2)); // 3
        console.log(sum(5)(-1)(2)); // 6
        console.log(sum(6)(-1)(-2)(-3)); // 0
        console.log(sum(0)(1)(2)(3)(4)(5)); // 15

    }

}