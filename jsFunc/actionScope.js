/* eslint-disable no-debugger */
/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-18 13:28:55
 * @LastEditTime: 2022-02-18 22:02:50
 */
{//变量
    //     在 JavaScript 中，每个运行的函数，代码块 {...} 以及整个脚本，都有一个被称为 词法环境（Lexical Environment） 的内部（隐藏）的关联对象。

    // 词法环境对象由两部分组成：

    //     环境记录（Environment Record） —— 一个存储所有局部变量作为其属性（包括一些其他信息，例如 this 的值）的对象。
    //     对 外部词法环境 的引用，与外部代码相关联。

    // 一个“变量”只是 环境记录 这个特殊的内部对象的一个属性。“获取或修改变量”意味着“获取或修改词法环境的一个属性”。
    //但 JavaScript 引擎同样可以优化它，比如清除未被使用的变量以节省内存和执行其他内部技巧等，但显性行为应该是和上述的无差。
    //*旧变量值不会保存在任何地方
    let x = 1;

    function func() {
        console.log(x); // ReferenceError: Cannot access 'x' before initialization
        //这一段为死区
        let x = 2;
    }

    func();
}
{//函数声明
    //     一个函数其实也是一个值，就像变量一样。

    // 不同之处在于函数声明的初始化会被立即完成。

    // 当创建了一个词法环境（Lexical Environment）时，函数声明会立即变为即用型函数（不像 let 那样直到声明处才可用）。

    // 这就是为什么我们可以在（函数声明）的定义之前调用函数声明。
    //正常来说，这种行为仅适用于函数声明，而不适用于我们将函数分配给变量的函数表达式
    //say("Tom");//Cannot access 'phrase' before initialization
    let phrase = "Hello";
    say("Tom");//Hello,Tom
    function say(name) {
        console.log(`${phrase},${name}`);
    }
}
{//内部和外部的词法环境
    //     在一个函数运行时，在调用刚开始时，会自动创建一个新的词法环境以存储这个调用的局部变量和参数。


    // 当代码要访问一个变量时 —— 首先会搜索内部词法环境，然后搜索外部环境，然后搜索更外部的环境，以此类推，直到全局词法环境。
    // 如果在任何地方都找不到这个变量，那么在严格模式下就会报错（在非严格模式下，为了向下兼容，给未定义的变量赋值会创建一个全局变量）。
    function makeArmy() {
        let shooters = [];

        let i = 0;
        while (i < 10) {
            let shooter = function () { // 创建一个 shooter 函数，
                console.log(i); // 应该显示其编号
            };
            shooters.push(shooter); // 将此 shooter 函数添加到数组中
            i++;
        }

        // ……返回 shooters 数组
        return shooters;
    }

    let army = makeArmy();

    // ……所有的 shooter 显示的都是 10，而不是它们的编号 0, 1, 2, 3...
    army[0](); // 编号为 0 的 shooter 显示的是 10
    army[1](); // 编号为 1 的 shooter 显示的是 10
    army[2](); // 10，其他的也是这样。
    //因为 shooter 函数内没有局部变量 i。当一个这样的函数被调用时，i 是来自于外部词法环境的函数运行时为10
    // 我们可以将 i 的值复制到 while {...} 块内的变量中
    // while (i < 10) {
    //     let j = i;
    //或者使用for循环
    // for (let i = 0; i < 10; i++) {

}
{//返回函数

    function makeCounter() {
        let count = 0;

        return function () {
            return count++;
        };
    }
    //在每次 makeCounter() 调用的开始，都会创建一个新的词法环境对象，以存储该 makeCounter 运行时的变量。
    //不同的是，在执行 makeCounter() 的过程中创建了一个仅占一行的嵌套函数：return count++。我们尚未运行它，仅创建了它。
    let counter = makeCounter();
    //所有的函数在“诞生”时都会记住创建它们的词法环境。从技术上讲，这里没有什么魔法：所有函数都有名为 [[Environment]] 的隐藏属性，该属性保存了对创建该函数的词法环境的引用。
    //     因此，counter.[[Environment]] 有对 {count: 0} 词法环境的引用。
    //     这就是函数记住它创建于何处的方式，与函数被在哪儿调用无关。[[Environment]] 引用在函数创建时被设置并永久保存。

    // 稍后，当调用 counter() 时，会为该调用创建一个新的词法环境，并且其外部词法环境引用获取于 counter.[[Environment]]：
    console.log(counter()); // 0
    console.log(counter()); // 1
    console.log(counter()); // 2
    // 当 counter() 中的代码查找 count 变量时，它首先搜索自己的词法环境（为空，因为那里没有局部变量），然后是外部 makeCounter() 的词法环境，并且在哪里找到就在哪里修改。

    //* 在变量所在的词法环境中更新变量。



    {
        function makeWorker() {
            let name = "Pete";

            return function () {
                console.log(name);
            };
        }

        let name = "John";

        // create a function
        let work = makeWorker();
        //创建work时的Env有对name为"Pete"的引用

        // call it
        work(); // 会显示什么？
        //Pete 
    }

    {
        function Counter() {
            let count = 0;

            this.up = function () {
                return ++count;
            };

            this.down = function () {
                return --count;
            };
        }

        let counter = new Counter();

        console.log(counter.up()); // 1
        console.log(counter.up()); // 2
        console.log(counter.down()); // 1
        //*这两个嵌套函数都是在同一个词法环境中创建的，所以它们可以共享对同一个 count 变量的访问：


    }
}
{
    //通常，闭包是指使用一个特殊的属性 [[Environment]] 来记录函数自身的创建时的环境的函数。它具体指向了函数创建时的词法环境。
    // 闭包 是指内部函数总是可以访问其所在的外部函数中声明的变量和参数，即使在其外部函数被返回（寿命终结）了之后。在某些编程语言中，这是不可能的，或者应该以特殊的方式编写函数来实现。
    //但是如上所述，在 JavaScript 中，所有函数都是天生闭包的（只有一个例外，将在 "new Function" 语法 中讲到）。

    // 也就是说：JavaScript 中的函数会自动通过隐藏的[[Environment]] 属性记住创建它们的位置，所以它们都可以访问外部变量。
}
{//垃圾收集
    //     通常，函数调用完成后，会将词法环境和其中的所有变量从内存中删除。因为现在没有任何对它们的引用了。与 JavaScript 中的任何其他对象一样，词法环境仅在可达时才会被保留在内存中。

    // 但是，如果有一个嵌套的函数在函数结束后仍可达，则它将具有引用词法环境的 [[Environment]] 属性。
    //当词法环境对象变得不可达时，它就会死去（就像其他任何对象一样）。换句话说，它仅在至少有一个嵌套函数引用它时才存在。
    function f() {
        let value = 123;

        return function () {
            console.log(value);
        }
    }

    let g = f(); // g.[[Environment]] 存储了对相应 f() 调用的词法环境的引用
    g = null; // ……现在内存被清理了
    {//实际开发中的优化
        //         正如我们所看到的，理论上当函数可达时，它外部的所有变量也都将存在。

        // 但在实际中，JavaScript 引擎会试图优化它。它们会分析变量的使用情况，如果从代码中可以明显看出有未使用的外部变量，那么就会将其删除。

        // 在 V8（Chrome，Edge，Opera）中的一个重要的副作用是，此类变量在调试中将不可用。
        function f() {
            let value = Math.random();

            function g() {
                debugger; // 在 Console 中：输入 console.log(value); No such variable!   被优化掉了
            }

            return g;
        }

        let g = f();
        g();
        {
            let value = "Surprise!";

            function f() {
                let value = "the closest value";

                function g() {
                    debugger; // 在 console 中：输入 console.log(value); Surprise!
                }

                return g;
            }

            let g = f();
            g();
        }

    }

}