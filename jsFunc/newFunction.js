/*
 * @Author: fengsc
 * @Date: 2022-02-18 19:47:59
 * @LastEditTime: 2022-02-18 22:05:51
 */
let sum = new Function('a', 'b', 'return a + b');

console.log(sum(1, 2)); // 3

let sayHi = new Function('console.log("Hello")');

sayHi(); // Hello

//与我们已知的其他方法相比，这种方法最大的不同在于，它实际上是通过运行时通过参数传递过来的字符串创建的。
// 如果我们使用 new Function 创建一个函数，那么该函数的 [[Environment]] 并不指向当前的词法环境，而是指向全局环境。

// 因此，此类函数无法访问外部（outer）变量，只能访问全局变量。
function getFunc() {
    let value = "test";

    let func = new Function('alert(value)');

    return func;
}

//getFunc()(); // error: value is not defined

// 如果这个函数能够访问外部（outer）变量会怎么样？

// 问题在于，在将 JavaScript 发布到生产环境之前，需要使用 压缩程序（minifier） 对其进行压缩 —— 一个特殊的程序，通过删除多余的注释和空格等压缩代码 —— 更重要的是，将局部变量命名为较短的变量。
// 在这种情况下，如果使 new Function 可以访问自身函数以外的变量，它也很有可能无法找到重命名的 userName，这是因为新函数的创建发生在代码压缩以后，变量名已经被替换了。

// 即使我们可以在 new Function 中访问外部词法环境，我们也会受挫于压缩程序。

// 此外，这样的代码在架构上很差并且容易出错。

//* 当我们需要向 new Function 创建出的新函数传递数据时，我们必须显式地通过参数进行传递。
// 由于历史原因，参数也可以按逗号分隔符的形式给出。
// 以下三种声明的含义相同：

new Function('a', 'b', 'return a + b'); // 基础语法
new Function('a,b', 'return a + b'); // 逗号分隔
new Function('a , b', 'return a + b'); // 逗号和空格分隔