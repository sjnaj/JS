/*
 * @Author: fengsc
 * @Date: 2022-02-07 21:11:04
 * @LastEditTime: 2022-02-07 22:14:12
 */
let range = {
  from: 1,
  to: 5
};

// 我们希望 for..of 这样运行：
// for(let num of range) ... num=1,2,3,4,5
//我们需要为对象添加一个名为 Symbol.iterator 的方法（一个专门用于使对象可迭代的内建 symbol）。
range[Symbol.iterator] = function () {

  // ……它返回迭代器对象（iterator object）：
  // 接下来，for..of 仅与此迭代器一起工作，要求它提供下一个值
  return {
    current: this.from,
    last: this.to,

    // 3. next() 在 for..of 的每一轮循环迭代中被调用
    next() {
      // 4. 它将会返回 {done:.., value :...} 格式的对象
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// 现在它可以运行了！
for (let num of range) {
  console.log(num); // 1, 然后是 2, 3, 4, 5
}
// 请注意可迭代对象的核心功能：关注点分离。

//     range 自身没有 next() 方法。
//     相反，是通过调用 range[Symbol.iterator]() 创建了另一个对象，即所谓的“迭代器”对象，并且它的 next 会为迭代生成值。

//采用与 for..of 完全相同的方式遍历字符串，但使用的是直接调用。这段代码创建了一个字符串迭代器，并“手动”从中获取值。
let str = "Hello";

// 和 for..of 做相同的事
// for (let char of str) console.log(char);

let iterator = str[Symbol.iterator]();

// eslint-disable-next-line no-constant-condition
while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value); // 一个接一个地输出字符
}


// Iterable 如上所述，是实现了 Symbol.iterator 方法的对象。
// Array-like 是有索引和 length 属性的对象，所以它们看起来很像数组。
//字符串即是可迭代的（for..of 对它们有效），又是类数组的（它们有数值索引和 length 属性）

//可迭代对象和类数组对象通常都 不是数组，它们没有 push 和 pop 等方法。
//有一个全局方法 Array.from 可以接受一个可迭代或类数组的值，并从中获取一个“真正的”数组。然后我们就可以对其调用数组方法了。
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

let arr = Array.from(arrayLike); // (*)
console.log(arr.pop()); // World（pop 方法有效）
{//使用 range 自身作为迭代器来简化代码
  let range = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
      this.current = this.from;
      return this;//返回range对象自身
    },

    next() {
      if (this.current <= this.to) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
    //一个迭代器必须有 next() 方法，它返回一个 {done: Boolean, value: any} 对象，
    //这里 done:true 表明迭代结束，否则 value 就是下一个值。
  };

  for (let num of range) {
    console.log(num); // 1, 然后是 2, 3, 4, 5
  }
  //缺点是，现在不可能同时在对象上运行两个 for..of 循环了：它们将共享迭代状态，因为只有一个迭代器，即对象本身。
  //但是两个并行的 for..of 是很罕见的，即使在异步情况下。

  // 假设 range 来自上文的例子中
  let arr = Array.from(range);
  console.log(arr); // 1,2,3,4,5 （数组的 toString 转化方法生效）
  //Array.from 的完整语法允许我们提供一个可选的“映射（mapping）”函数：
  //   Array.from(obj[, mapFn, thisArg])

  // 可选的第二个参数 mapFn 可以是一个函数，该函数会在对象中的元素被添加到数组前，被应用于每个元素，此外 thisArg 允许我们为该函数设置 this。
  // 假设 range 来自上文例子中

  // 求每个数的平方
  {
    let arr = Array.from(range, num => num * num);

    console.log(arr); // 1,4,9,16,25
  }
}
//可以基于 Array.from 创建代理感知（surrogate-aware）的slice 方法
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}
{
let str = '𝒳😂𩷶';

console.log( slice(str, 1, 3) ); // 😂𩷶

// 原生方法不支持识别代理对（译注：UTF-16 扩展字符）
console.log( str.slice(1, 3) ); // 乱码（两个不同 UTF-16 扩展字符碎片拼接的结果）
}

