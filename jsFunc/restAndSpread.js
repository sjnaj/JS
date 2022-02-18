/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-18 11:59:16
 * @LastEditTime: 2022-02-19 00:01:49
 */
// 在 JavaScript 中，无论函数是如何定义的，你都可以使用任意数量的参数调用函数。
// 虽然不会因为传入“过多”的参数而报错。但是当然，在结果中只有前面的参数被计算进去了。
// Rest 参数可以通过使用三个点 ... 并在后面跟着包含剩余参数的数组名称，来将它们包含在函数定义中。这些点的字面意思是“将剩余参数收集到一个数组中”。
{
    function sumAll(...args) { // 数组名为 args
        let sum = 0;

        for (let arg of args) sum += arg;

        return sum;
    }

    console.log(sumAll(1)); // 1
    console.log(sumAll(1, 2)); // 3
    console.log(sumAll(1, 2, 3)); // 6
}
//Rest 参数必须放到参数列表的末尾
{//“arguments” 变量
    function showName() {
        console.log(arguments.length);
        console.log(arguments[0]);
        console.log(arguments[1]);

        // 它是可遍历的
        // for(let arg of arguments) console.log(arg);
    }

    // 依次显示：2，Julius，Caesar
    showName("Julius", "Caesar");

    // 依次显示：1，Ilya，undefined（没有第二个参数）
    showName("Ilya");
    // 尽管 arguments 是一个类数组，也是可迭代对象，但它终究不是数组。它不支持数组方法，因此我们不能调用 arguments.map(...) 等方法。
    //     此外，它始终包含所有参数，我们不能像使用 rest 参数那样只截取入参的一部分。

    // 因此，当我们需要这些功能时，最好使用 rest 参数。
    //*箭头函数没有 "arguments"(也没有this)
    {//方法借用(method borrowing)
        //不过，有一种简单的方法可以使用数组的 join 方法：
        //因为原生方法 arr.join(glue) 的内部算法非常简单
        //*[].join(glue).call(arguments)
        //我们从常规数组 [].join 中获取（借用）join 方法，并使用 [].join.call 在 arguments 的上下文中运行它。
        
    }
}
{//Spread 语法 
    //*当在函数调用中使用 ...arr 时，它会把可迭代对象 arr “展开”到参数列表中。
    let arr = [3, 5, 1];

    console.log(Math.max(...arr)); // 5（spread 语法把数组转换为参数列表）

    let arr1 = [1, -2, 3, 4];
    let arr2 = [8, 3, -8, 1];

    //还可以通过这种方式传递多个可迭代对象：
    console.log(Math.max(...arr1, ...arr2)); // 8
    {
        //还可以使用 spread 语法来合并数组：
        let arr = [3, 5, 1];
        let arr2 = [8, 9, 15];

        let merged = [0, ...arr, 2, ...arr2];

        console.log(merged); // 0,3,5,1,2,8,9,15（0，然后是 arr，然后是 2，然后是 arr2）
    }
    {//字符串转化为数组
        let str = "Hello";

        console.log([...str]); // H,e,l,l,o
        //Spread 语法内部使用了迭代器来收集元素，与 for..of 的方式相同。

        console.log(str.split(''));
        console.log(Array.from(str));//适用于类数组对象也适用于可迭代对象。
        //因此，对于将一些“东西”转换为数组的任务，Array.from 往往更通用。
    }
    {       //复制 array/object
        let arr = [1, 2, 3];

        let arrCopy = [...arr]; // 将数组 spread 到参数列表中
        // 然后将结果放到一个新数组

        // 两个数组中的内容相同吗？
        console.log(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

        // 两个数组相等吗？
        console.log(arr === arrCopy); // false（它们的引用是不同的）

        // 修改我们初始的数组不会修改副本：
        arr.push(4);
        console.log(arr); // 1, 2, 3, 4
        console.log(arrCopy); // 1, 2, 3
        //也可以通过相同的方式来复制一个对象：
        let obj = { a: 1, b: 2, c: 3 };

        let objCopy = { ...obj }; // 将对象 spread 到参数列表中
        // 然后将结果返回到一个新对象

        // 两个对象中的内容相同吗？
        console.log(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

        // 两个对象相等吗？
        console.log(obj === objCopy); // false (not same reference)

        // 修改我们初始的对象不会修改副本：
        obj.d = 4;
        console.log(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
        console.log(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}

        // 这种方式比使用 let arrCopy = Object.assign([], arr) 来复制数组，或使用 let objCopy = Object.assign({}, obj) 来复制对象写起来要短得多。
        // 因此，只要情况允许，我们更喜欢使用它。
        
    }


}
