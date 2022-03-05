/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-21 15:09:37
 * @LastEditTime: 2022-02-21 15:18:19
 */
// *instanceof 操作符用于检查一个对象是否属于某个特定的 class。同时，它还考虑了继承。

// !在许多情况下，可能都需要进行此类检查。例如，它可以被用来构建一个 多态性（polymorphic） 的函数，该函数根据参数的类型对参数进行不同的处理。
{
    console.log([] instanceof Array);
    console.log([] instanceof Object);
}
//obj instanceof Class 算法的执行过程大致如下：
//*如果这儿有静态方法 Symbol.hasInstance，那就直接调用这个方法：
{
    // 设置 instanceOf 检查
    // *并假设具有 canEat 属性的都是 animal
    class Animal {
        static [Symbol.hasInstance](obj) {
            if (obj.canEat) return true;//*需要返回一个布尔值
        }
    }

    let obj = { canEat: true };

    console.log(obj instanceof Animal); // true：Animal[Symbol.hasInstance](obj) 被调用
}
//*大多数 class 没有 Symbol.hasInstance。在这种情况下，标准的逻辑是：使用 obj instanceOf Class 检查 Class.prototype 是否等于 obj 的原型链中的原型之一。
//!可以将 obj instanceof Class 检查改为 Class.prototype.isPrototypeOf(obj)。
{
    function Rabbit() { }
    let rabbit = new Rabbit();

    // 修改了 prototype
    Rabbit.prototype = {};

    // !...再也不是 rabbit 了！
    console.log(rabbit instanceof Rabbit); // false
}
