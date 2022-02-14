/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-05 15:58:56
 * @LastEditTime: 2022-02-07 21:08:15
 */
// 一个原始值：

//     是原始类型中的一种值。
//     在 JavaScript 中有 7 种原始类型：string，number，bigint，boolean，symbol，null 和 undefined。

// 一个对象：

//     能够存储多个值作为属性。
//     可以使用大括号 {} 创建对象，例如：{name: "John", age: 30}。JavaScript 中还有其他种类的对象，例如函数就是对象。
// 对象比原始类型“更重”。它们需要额外的资源来支持运作。

//  当作对象的原始类型

// 原始类型仍然是原始的。与预期相同，提供单个值
// JavaScript 允许访问字符串，数字，布尔值和 symbol 的方法和属性。
// 为了使它们起作用，创建了提供额外功能的特殊“对象包装器”，使用后即被销毁。
// “对象包装器”对于每种原始类型都是不同的，它们被称为 String、Number、Boolean 和 Symbol。因此，它们提供了不同的方法。
// 所以原始类型可以提供方法，但它们依然是轻量级的。

// JavaScript 引擎高度优化了这个过程。它甚至可能跳过创建额外的对象。但是它仍然必须遵守规范，并且表现得好像它创建了一样。
// 像 Java 这样的一些语言允许我们使用 new Number(1) 或 new Boolean(false) 等语法，明确地为原始类型创建“对象包装器”。

// 在 JavaScript 中，由于历史原因，这也是可以的，但极其 不推荐。因为这样会出问题。
"use strict";
console.log(typeof 0); // "number"

console.log(typeof new Number(0)); // "object"!
// 对象在 if 中始终为真
let zero = new Number(0);

if (zero) { // zero 为 true，因为它是一个对象
    console.log("zero is truthy?!?");
}
// 另一方面，调用不带 new（关键字）的 String/Number/Boolean 函数是完全理智和有用的。它们将一个值转换为相应的类型：转成字符串、数字或布尔值（原始类型）。
let num = Number("123"); // 将字符串转成数字
console.log(typeof num);
//特殊的原始类型 null 和 undefined 是例外。它们没有对应的“对象包装器”，也没有提供任何方法。从某种意义上说，它们是“最原始的”。
// let str="Hello";
// str.test=5;
// console.log(str.test);
// undefined（非严格模式）
// 报错（严格模式）。


// 当访问 str 的属性时，一个“对象包装器”被创建了。
// 在严格模式下，向其写入内容会报错。
// 否则，将继续执行带有属性的操作，该对象将获得 test 属性，但是此后，“对象包装器”将消失，因此在最后一行，str 并没有该属性的踪迹。
{//number
    {
        let num = 255;
        console.log(num.toString());//255
        console.log(num.toString(16));  // ff
        console.log(num.toString(2));   // 11111111
        //base 的范围可以从 2 到 36。默认情况下是 10。
        //     常见的用例如下：

        //     base=16 用于十六进制颜色，字符编码等，数字可以是 0..9 或 A..F。

        //     base=2 主要用于调试按位操作，数字可以是 0 或 1。

        //     base=36 是最大进制，数字可以是 0..9 或 A..Z。所有拉丁字母都被用于了表示数字。对于 36 进制来说，
        //     一个有趣且有用的例子是，当我们需要将一个较长的数字标识符转换成较短的时候，例如做一个短的 URL。可以简单地使用基数为 36 的数字系统表示：
        console.log(123456..toString(36)); // 2n9c
        // JavaScript 语法隐含了第一个点之后的部分为小数部分。如果我们再放一个点，那么 JavaScript 就知道小数部分为空，现在使用该方法。
        //或者用括号括住
    }
    { // 函数 toFixed(n) 将数字舍入到小数点后 n 位，并以字符串形式返回结果。
        let num = 12.34;
        console.log(num.toFixed(1)); // "12.3"
    }
    {//精度损失
        //console.log( 1e500 ); // Infinity
        console.log(0.1 + 0.2); // 0.30000000000000004
        console.log((0.1 + 0.2).toFixed(2)); //  0.30  解决方式
        //console.log(9999999999999999); // 显示 10000000000000000
        console.log(0..toString(2));//0
        console.log(-0..toString(2));//-0
        //在大多数情况下，这种区别并不明显，因为运算符将它们视为相同的值。
        console.log(6.35.toFixed(1));//6.3
        console.log(6.35.toFixed(20));//6.34999999999999964473 偏小
        //解决方法
        console.log(Math.round(6.35 * 10) / 10);//*小数部分 0.5 实际上是 1/2。以 2 的整数次幂为分母的小数在二进制数字系统中可以被精确地表示，现在我们可以对它进行舍入
        // let i = 0;
        // while (i != 10) {//死循环，浮点数，因此在处理小数时要避免相等性检查
        //     i += 0.2;
        // }
    }
    {

        // Infinity（和 -Infinity）是一个特殊的数值，比任何数值都大（小）。
        // NaN 代表一个 error。
        // 它们属于 number 类型，但不是“普通”数字，因此，这里有用于检查它们的特殊函数：
        console.log(isNaN("str"));//true
        //console.log(NaN===NaN)//false 值 “NaN” 是独一无二的，它不等于任何东西，包括它自身
        console.log(isFinite("15"));  //true 将其参数转换为数字
        console.log(isFinite("str"));//false
        console.log(isFinite(Infinity));//false

        //在所有数字函数中，包括 isFinite，空字符串或仅有空格的字符串均被视为 0

        //     有一个特殊的内建方法 Object.is，它类似于 === 一样对值进行比较，但它对于两种边缘情况更可靠：

        //     它适用于 NaN：Object.is(NaN，NaN) === true，这是件好事。
        //     值 0 和 -0 是不同的：Object.is(0，-0) === false，从技术上讲这是对的，因为在内部，数字的符号位可能会不同，即使其他所有位均为零。

        // 在所有其他情况下，Object.is(a，b) 与 a === b 相同。

        // 这种比较方式经常被用在 JavaScript 规范中。当内部算法需要比较两个值是否完全相同时，它使用 Object.is（内部称为 SameValue）。
        console.log(Object.is(NaN, NaN));//true
        console.log(Object.is(0, -0));//false
    }
    {//parseInt 和 parseFloat
        //使用加号 + 或 Number() 的数字转换是严格的。如果一个值不完全是一个数字，就会失败：
        console.log(+"100px");//NaN
        console.log(parseInt("100px"));//100
        console.log(parseInt(10.1));//10
        console.log(parseFloat('10.1.2'));// 12.3，在第二个点出停止了读取
        console.log(parseInt("a100"))//NaN,第一个符号停止了读取
        console.log(parseInt('2n9c', 36));//指定进制


    }
    {
        for (let i = 0; i < 10; i++) {
            console.log(Math.round(Math.random() * 5 + 5));//[5,10]的随机整数
        }
        for (let i = 0; i < 10; i++) {
            console.log((Math.random() * 5 + 5).toFixed(2));//[5,10]的随机二位小数
        }
    }
}
{//string
    {//反引号:模板字符串
        function sum(a, b) {
            return a + b;
        }

        console.log(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
        //允许跨行
        let guestList = `Guests:
        * John
        * Pete
        * Mary
       `;

        console.log(guestList); // 客人清单，多行
        //只有与外部闭合引号相同的引号才需要转义
        console.log(`I'm the Walrus!`); // I'm the Walrus!
    }
    {//特殊字符
        console.log("\u00A9"); // ©
        console.log("\u{20331}"); // 佫，罕见的中国象形文字（长 unicode）
        console.log("\u{1F60D}"); // 😍，笑脸符号（另一个长 unicode）
    }
    {
        let str = "Hellp";
        console.log(str.length);//str.length 是一个数字属性，而不是函数。后面不需要添加括号。
        console.log(str[0]);//H
        console.log(str.charAt(0));//H charAt 是历史原因才存在的
        //它们之间的唯一区别是，如果没有找到字符，[] 返回 undefined，而 charAt 返回一个空字符串
        //可以用let of 遍历
    }
    {
        //字符串是不可变的
        let str = "Hi";
        //  str[0]='h';//error
        //通常的解决方法是创建一个新的字符串，并将其分配给str
        let newStr = 'h' + str[1];
        console.log(newStr);

        console.log('Interface'.toLowerCase());
        console.log('Interface'.toUpperCase());

    }
    {//查找子串
        let str = 'Widget with id';
        console.log(str.indexOf('Widget'));
        console.log(str.indexOf('id', 2));//从下标2开始查找
        //查找不到返回-1
        str = 'As sly as a fox, as strong as an ox';
        let target = 'as';
        let pos = -1;
        while ((pos = str.indexOf(target, pos + 1)) != -1) {
            console.log(pos);
        }
        // 还有一个类似的方法 str.lastIndexOf(substr, position)，它从字符串的末尾开始搜索到开头


    }
    {//按位（bitwise）NOT 技巧
        //它将数字转换为 32-bit 整数（如果存在小数部分，则删除小数部分），然后对其二进制表示形式中的所有位均取反。
        //对于 32-bit 整数，~n 等于 -(n+1)
        console.log(~2);//-3
        console.log(~-1);//0
        //因此，仅当 indexOf 的结果不是 -1 时，检查 if ( ~str.indexOf("...") ) 才为真。换句话说，当有匹配时。
        let str = "Widget";

        if (~str.indexOf("Widget")) {
            console.log('Found it!'); // 正常运行
        }
        //         通常不建议以非显而易见的方式使用语言特性，但这种特殊技巧在旧代码中仍被广泛使用，所以我们应该理解它。

        // 只要记住：if (~str.indexOf(...)) 读作 “if found”。

        // 确切地说，由于 ~ 运算符将大数字截断为 32 位，因此存在给出 0 的其他数字，最小的数字是 ~4294967295=0。这使得这种检查只有在字符串没有那么长的情况下才是正确的。

    }
    {//includes，startsWith，endsWith
        console.log("Widget with id".includes("Widget"));//true;
        console.log("Widget with id".includes("id", 5));//设置起始位置
        console.log("Widget".startsWith("Wid"));//true
        console.log("Widget".endsWith("get"));//true

    }
    {//获取子字符串
        // 方法 	选择方式…… 	负值参数
        // slice(start, end) 	从 start 到 end（不含 end） 	允许
        // substring(start, end) 	start 与 end 之间（包括 start，但不包括 end） 	负值代表 0
        // substr(start, length) 	从 start 开始获取长为 length 的字符串 	允许 start 为负数
        let str = "stringify";
        console.log(str.slice(0, 5));//strin
        console.log(str.slice(-4, -1));//gif 起始位置从字符串结尾计算
        console.log(str.slice(0))//stringify
        console.log(str.substring(2, 6))//ring
        console.log(str.substring(6.2))//ring
        console.log(str.slice(6.2))//"" 
        console.log(str.substr(0, 3));//str,已弃用 它不是在 JavaScript 核心规范中描述的，非浏览器环境可能无法支持它
        //slice 稍微灵活一些，它允许以负值作为参数并且写法更简短。因此仅仅记住这三种方法中的 slice 就足够了。

    }
    {
        //所有的字符串都使用 UTF-16 编码。即：每个字符都有对应的数字代码。有特殊的方法可以获取代码表示的字符，以及字符对应的代码。
        //     str.codePointAt(pos)

        // 返回在 pos 位置的字符代码 :
        console.log("z".codePointAt(0)); // 122
        console.log("Z".codePointAt(0)); // 90
        console.log(String.fromCharCode(90));//Z
        console.log('\u005a'); // Z 用 \u 后跟十六进制代码
        console.log('Österreich'.localeCompare('Zealand')); // -1
        //这个方法实际上还指定了两个额外的参数，这两个参数允许它指定语言（默认语言从环境中获取，字符顺序视语言不同而不同）并设置诸如区分大小写，或应该将 "a" 和 "á" 作相同处理等附加的规则。

        //为了支持任意组合，UTF-16 允许我们使用多个 unicode 字符：基本字符紧跟“装饰”它的一个或多个“标记”字符。
        console.log('S\u0307\u0323');
        let s1 = "S\u0307\u0323";
        let s2 = "S\u0323\u0307";
        console.log(s1 == s2);//false 尽管字符看起来相同
        //“unicode 规范化”算法，它将每个字符串都转化成单个“通用”格式。
        console.log("S\u0307\u0323".normalize() == "S\u0323\u0307".normalize()); // true
        //在实际情况下，normalize() 实际上将一个由 3 个字符组成的序列合并为一个：\u1e68（S 有两个点）。
        //情况并非总是如此，因为符号 Ṩ 是“常用”的，所以 UTF-16 创建者把它包含在主表中并给它了对应的代码。

    }

}
{//array
    let arr = ['Apple', { name: 'John' }, true, function () { console.log('hello'); }];//混合数组
    console.log(arr[1].name);
    arr[3]();
    let fruits = ["Apple", "Orange", "Pear"];
    console.log(fruits.pop());
    fruits.push("Banana");//return new length   
    console.log(fruits);
    console.log(fruits.shift());
    console.log(fruits);
    console.log(fruits.unshift("apple"));//return new length
    console.log(fruits);

    {
        //         数组误用的几种方式:

        //     添加一个非数字的属性，比如 arr.test = 5。(数组是基于对象的。我们可以给它们添加任何属性)
        //     制造空洞，比如：添加 arr[0]，然后添加 arr[1000] (它们中间什么都没有)。
        //     以倒序填充数组，比如 arr[1000]，arr[999] 等等。

        // 请将数组视为作用于 有序数据 的特殊结构。它们为此提供了特殊的方法。数组在 JavaScript 引擎内部是经过特殊调整的，使得更好地作用于连续的有序数据，所以请以正确的方式使用数组。
        // 如果你需要任意键值，那很有可能实际上你需要的是常规对象 {}。
        //for..in 循环适用于普通对象，并且做了对应的优化。但是不适用于数组，因此速度要慢 10-100 倍。当然即使是这样也依然非常快。只有在遇到瓶颈时可能会有问题。但是我们仍然应该了解这其中的不同。

    }
    {
        //length 属性的一个有意思的点是它是可写的。
        let arr = [1, 2, 3, 4, 5];

        arr.length = 2; // 截断到只剩 2 个元素
        console.log(arr); // [1, 2]

        arr.length = 5; // 又把 length 加回来
        console.log(arr[3]); // undefined：被截断的那些数值并没有回来
        arr.length = 0;//清空数组最简单的方式

        //如果使用单个参数（即数字）调用 new Array，那么它会创建一个 指定了长度，却没有任何项 的数组。
        //我们通常都是使用方括号的，除非我们清楚地知道自己正在做什么。

    }
    {
        let matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];

        console.log(matrix[1][1]); // 最中间的那个数
    }
    {
        //数组有自己的 toString 方法的实现，会返回以逗号隔开的元素列表。
        let arr = [1, 2, 3];

        console.log(arr); // 1,2,3
        console.log(String(arr) === '1,2,3'); // true

        console.log([] + 1); // "1"
        console.log([1] + 1); // "11"
        console.log([1, 2] + 1); // "1,21"
        //数组没有 Symbol.toPrimitive，也没有 valueOf，它们只能执行 toString 进行转换，
        //所以这里 [] 就变成了一个空字符串，[1] 变成了 "1"，[1,2] 变成了 "1,2"。

    }
}
{//；其它数组方法
    {//删除元素
        let arr = ["I", "go", "home"];

        delete arr[1]; // remove "go"
        //只能清空，没有删除位置

        console.log(arr[1]); // undefined

        // now arr = ["I",  , "home"];
        console.log(arr.length); // 3
        // arr.splice(start[, deleteCount, elem1, ..., elemN])
        //它从索引 start 开始修改 arr：删除 deleteCount 个元素并在当前位置插入 elem1, ..., elemN。最后返回被删除元素的数组。
        //在这里和其他数组方法中，负向索引都是被允许的。
        arr.splice(1, 1, "went");
        console.log(arr);
    }
    {//插入元素
        let arr = ["I", "study", "JavaScript"];

        // 从索引 2 开始
        // 删除 0 个元素
        // 然后插入 "complex" 和 "language"
        arr.splice(2, 0, "complex", "language");

        console.log(arr); // "I", "study", "complex", "language", "JavaScript"

    }
    {//复制数组
        let arr = ["t", "e", "s", "t"];

        console.log(arr.slice(1, 3)); // e,s（复制从位置 1 到位置 3 的元素）

        console.log(arr.slice(-2)); // s,t（复制从位置 -2 到尾端的元素）

        console.log(arr.slice());//创建副本

    }
    {//添加元素
        // arr.concat(arg1, arg2...)

        // 它接受任意数量的参数 —— 数组或值都可以。

        // 结果是一个包含来自于 arr，然后是 arg1，arg2 的元素的新数组。

        // 如果参数 argN 是一个数组，那么其中的所有元素都会被复制。否则，将复制参数本身。
        let arr = [1, 2];

        // create an array from: arr and [3,4]
        console.log(arr.concat([3, 4])); // 1,2,3,4

        // create an array from: arr and [3,4] and [5,6]
        console.log(arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

        // create an array from: arr and [3,4], then add values 5 and 6
        console.log(arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6

        {// 通常，它只复制数组中的元素。其他对象，即使它们看起来像数组一样，但仍然会被作为一个整体添加：

            let arr = [1, 2];

            let arrayLike = {
                0: "something",
                length: 1,
                // [Symbol.isConcatSpreadable]: true, //此时 console.log(的结果为1,2,something
            };

            //console.log(arr.concat(arrayLike)); // 1,2,[object Object]}
            console.log(arr.concat(arrayLike));//[ 1, 2, { '0': 'something', length: 1 } ] console.log会将对象内容打印出来


        }


    }
    {//遍历forEach
        //arr.forEach 方法允许为数组的每个元素都运行一个函数。
        // arr.forEach(function(item, index, array) {
        //     // ... do something with item
        //   });
        ["Bilbo", "Gandalf", "Nazgul"].forEach(console.log);//console.log三个参数都会被打印,console.log(只打印元素
        ["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
            console.log(`${item} is at index ${index} in ${array}`);
        });
        //该函数的结果（如果它有返回）会被抛弃和忽略。
        //不能直接修改item，只能通过索引修改
    }
    {//在数组中搜索
        //     arr.indexOf、arr.lastIndexOf 和 arr.includes 方法与字符串操作具有相同的语法，并且作用基本上也与字符串的方法相同，只不过这里是对数组元素而不是字符进行操作：

        // arr.indexOf(item, from) 从索引 from 开始搜索 item，如果找到则返回索引，否则返回 -1。
        // arr.lastIndexOf(item, from) —— 和上面相同，只是从右向左搜索。
        // arr.includes(item, from) —— 从索引 from 开始搜索 item，如果找到则返回 true（译注：如果没找到，则返回 false）。
        //请注意，这些方法使用的是严格相等 === 比较。所以如果我们搜索 false，会精确到的确是 false 而不是数字 0。
        //includes 的一个非常小的差别是它能正确处理NaN，而不像 indexOf/lastIndexOf：
        let arr = [NaN];
        console.log(arr.indexOf(NaN)); // -1（应该为 0，但是严格相等 === equality 对 NaN 无效）
        console.log(arr.includes(NaN));// true（这个结果是对的）

    }
    {//在对象数组中搜索

        // let result = arr.find(function(item, index, array) {
        // 如果返回 true，则返回 item 并停止迭代
        // 对于假值（falsy）的情况，则返回 undefined
        // });
        let users = [
            { id: 1, name: "John" },
            { id: 2, name: "Pete" },
            { id: 3, name: "Mary" }
        ];

        let user = users.find(item => item.id == 1);

        console.log(user.name); // John
        //arr.findIndex 方法（与 arr.find 方法）基本上是一样的，但它返回找到元素的索引，而不是元素本身。并且在未找到任何内容时返回 -1。
        {
            //语法与 find 大致相同，但是 filter 返回的是所有匹配元素组成的数组：
            let users = [
                { id: 1, name: "John" },
                { id: 2, name: "Pete" },
                { id: 3, name: "Mary" }
            ];

            // 返回前两个用户的数组
            let someUsers = users.filter(item => item.id < 3);

            console.log(someUsers.length); // 2
        }
    }
    {//map:它对数组的每个元素都调用函数，并返回结果数组。
        let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
        console.log(lengths); // 5,7,6

        console.log(["1", "2", "3"].map(parseInt));//期望输出 [1, 2, 3], 而实际结果是 [1, NaN, NaN].
       //parseInt 经常被带着一个参数使用, 但是这里接受两个。第一个参数是一个表达式而第二个是callback function的基, Array.prototype.map 传递3个参数:
       //第三个参数被parseInt忽视了
      // 下面是迭代步骤的简明示例：
      // parseInt(string, radix) -> map(parseInt(value, index))
/*  first iteration (index is 0): */ parseInt("1", 0); // 1
/* second iteration (index is 1): */ parseInt("2", 1); // NaN
/*  third iteration (index is 2): */ parseInt("3", 2); // NaN
        /*function returnInt(element) {
            return parseInt(element, 10);
        }*///使用此函数代替praseInt可解决
        let numbers = [1, 2, 3, 4];
        let filteredNumbers = numbers.map(function (num, index) {
            if (index < 3) {
                return num;
            }
        });
        //index goes from 0,so the filterNumbers are 1,2,3 and undefined.
        // filteredNumbers is [1, 2, 3, undefined]
        // numbers is still [1, 2, 3, 4]

        let john = { name: "John", surname: "Smith", id: 1 };
        let pete = { name: "Pete", surname: "Hunt", id: 2 };
        let mary = { name: "Mary", surname: "Key", id: 3 };

        let users = [john, pete, mary];

        let usersMapped = users.map(user => ({//在箭头函数中，我们需要使用额外的括号,JavaScript 在这里会把 { 视为函数体的开始，而不是对象的开始。
            fullName: `${user.name} ${user.surname}`,
            id: user.id
        }));

        /*  
        usersMapped = [
          { fullName: "John Smith", id: 1 },
          { fullName: "Pete Hunt", id: 2 },
          { fullName: "Mary Key", id: 3 }
        ]
        */

        console.log(usersMapped[0].id); // 1
        console.log(usersMapped[0].fullName); // John Smith

    }
    {//arr.sort 方法对数组进行 原位（in-place） 排序，更改元素的顺序。(译注：原位是指在此数组内，而非生成一个新数组。)

        //它还返回排序后的数组，但是返回值通常会被忽略，因为修改了 arr 本身。
        let arr = [1, 2, 15];

        // 该方法重新排列 arr 的内容
        arr.sort();

        console.log(arr);  // 1, 15, 2
        // 这些元素默认情况下被按字符串进行排序。

        // 从字面上看，所有元素都被转换为字符串，然后进行比较。对于字符串，按照词典顺序进行排序，实际上应该是 "2" > "15"。

        // 要使用我们自己的排序顺序，我们需要提供一个函数作为 arr.sort() 的参数
        arr = [1, 2, 15];
        arr.sort((a, b) => a > b - a < b);//升序，与c++相反 a-b有溢出可能
        console.log(arr);
        //可以添加打印语句查看排序过程
    }
    {
        // arr.reverse();//颠倒数组元素
    }
    {//拆分和组合
        //str.split(delim) 方法通过给定的分隔符 delim 将字符串分割成一个数组。
        let names = 'Bilbo, Gandalf, Nazgul';

        let arr = names.split(', ');

        for (let name of arr) {
            console.log(`A message to ${name}.`); // A message to Bilbo（和其他名字）
        }
        //split 方法有一个可选的第二个数字参数 —— 对数组长度的限制。如果提供了，那么额外的元素会被忽略。
        let str = "test";

        console.log(str.split('')); // t,e,s,t
        {//arr.join(glue) 与 split 相反。它会在它们之间创建一串由 glue 粘合的 arr 项。
            let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

            let str = arr.join(';'); // 使用分号 ; 将数组粘合成字符串

            console.log(str); // Bilbo;Gandalf;Nazgul
        }
    }
    {
        //         当我们需要遍历一个数组时 —— 我们可以使用 forEach，for 或 for..of。

        // 当我们需要遍历并返回每个元素的数据时 —— 我们可以使用 map。

        // arr.reduce 方法和 arr.reduceRight 方法和上面的种类差不多，但稍微复杂一点。它们用于根据数组计算单个值。
        // let value = arr.reduce(function(accumulator, item, index, array) {
        //     // ...
        //   }, [initial]);
        //         参数：

        //     accumulator —— 是上一个函数调用的结果，第一次等于 initial（如果提供了 initial 的话）。
        //     item —— 当前的数组元素。
        //     index —— 当前索引。
        //     arr —— 数组本身。

        // 应用函数时，上一个函数调用的结果将作为第一个参数传递给下一个函数。
        let arr = [1, 2, 3, 4, 5];

        let result = arr.reduce((sum, current) => sum + current, 0);

        console.log(result); // 15
        //如果没有index初始值，那么 reduce 会将数组的第一个元素作为初始值，并从第二个元素开始迭代。
        //如果数组为空，那么在没有初始值的情况下调用 reduce 会导致错误。
        //所以建议始终指定初始值
        // arr.reduceRight 和 arr.reduce 方法的功能一样，只是遍历为从右到左。

        let users = [
            { id: 'john', name: "John Smith", age: 20 },
            { id: 'ann', name: "Ann Smith", age: 24 },
            { id: 'pete', name: "Pete Peterson", age: 31 },
        ];

        let usersById = groupById(users);

        /*
        // 调用函数后，我们应该得到：
        
        usersById = {
          john: {id: 'john', name: "John Smith", age: 20},
          ann: {id: 'ann', name: "Ann Smith", age: 24},
          pete: {id: 'pete', name: "Pete Peterson", age: 31},
        }
        */
        function groupById(array) {
            return array.reduce((obj, value) => {
              obj[value.id] = value;
              return obj;
            }, {})//初始为空对象
          }

    }
    {//Array.isArray
        //         数组是基于对象的，不构成单独的语言类型。

        // 所以 typeof 不能帮助从数组中区分出普通对象：
        console.log(typeof []);//object
        console.log(Array.isArray([]));//true

    }
    {//thisArg
        //几乎所有调用函数的数组方法 —— 比如 find，filter，map，除了 sort 是一个特例，都接受一个可选的附加参数 thisArg。
        let army = {
            minAge: 18,
            maxAge: 27,
            canJoin(user) {
                return user.age >= this.minAge && user.age < this.maxAge;
            }
        };

        let users = [
            { age: 16 },
            { age: 20 },
            { age: 23 },
            { age: 30 }
        ];

        // 找到 army.canJoin 返回 true 的 user
        let soldiers = users.filter(army.canJoin, army);

        console.log(soldiers.length); // 2
        console.log(soldiers[0].age); // 20
        console.log(soldiers[1].age); // 23
        // 如果在上面的示例中我们使用了 users.filter(army.canJoin)，那么 army.canJoin 将被作为独立函数调用，并且这时 this=undefined，从而会导致即时错误。

        // 可以用 users.filter(user => army.canJoin(user)) 替换对 users.filter(army.canJoin, army) 的调用。前者的使用频率更高，因为对于大多数人来说，它更容易理解。

    }
}