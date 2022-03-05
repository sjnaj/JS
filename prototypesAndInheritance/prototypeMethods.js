/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-20 21:02:46
 * @LastEditTime: 2022-02-20 21:18:41
 */
// __proto__ 被认为是过时且不推荐使用的（deprecated），这里的不推荐使用是指 JavaScript 规范中规定，proto 必须仅在浏览器环境下才能得到支持。

// 现代的方法有：

// *Object.create(proto, [descriptors]) —— 利用给定的 proto 作为[[Prototype]] 和可选的属性描述来创建一个空对象。
// *Object.getPrototypeOf(obj) —— 返回对象 obj 的[[Prototype]]。
// *Object.setPrototypeOf(obj, proto) —— 将对象 obj 的[[Prototype]] 设置为 proto。

// 应该使用这些方法来代替 __proto__。

let animal = {
    eats: true
};

// 创建一个以 animal 为原型的新对象
let rabbit = Object.create(animal);

console.log(rabbit.eats); // true

console.log(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // 将 rabbit 的原型修改为 {}
{
    //可选的第二参数：属性描述器。我们可以在此处为新对象提供额外的属性，就像这样：
    let animal = {
        eats: true
    };

    let rabbit = Object.create(animal, {//和defineProperty一样属性描述符默认值为false
        jumps: {
            value: true
        }
    });

    console.log(rabbit.jumps); // true

}
{
    //更强大的拷贝,第二个不能拷贝继承关系
    //let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    //let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
}
{
    //__proto__ 属性很特别：它必须是对象或者 null。字符串不能成为 prototype。
    //!想要存储键值对，然而键名为 "__proto__" 的键值对没有被正确存储。所以这是一个 bug。

    //     首先，我们可以改用 Map 来代替普通对象进行存储，这样一切都迎刃而解。

    // 但是 Object 在这里同样可以运行得很好，因为 JavaScript 语言的制造者很早就注意到了这个问题。

    // __proto__ 不是一个对象的属性，只是 Object.prototype 的访问器属性：
    //因此，如果 obj.__proto__ 被读取或者赋值，那么对应的 getter/setter 会被从它的原型中调用，它会 set/get [[Prototype]]。


}
{
    // Object.create(null) 创建了一个空对象，这个对象没有原型（[[Prototype]] 是 null）：
    // 因此，它没有继承 __proto__ 的 getter / setter 方法。现在，它被作为正常的数据属性进行处理
    // 我们可以把这样的对象称为 “very plain” 或 “pure dictionary” 对象，因为它们甚至比通常的普通对象（plain object）{... } 还要简单。

    // *缺点是这样的对象没有任何内建的对象的方法，例如 toString：
    // 多数与对象相关的方法都是 Object.something(...)，例如 Object.keys(obj) —— 
    // *它们不在 prototype 中，因此在 “very plain” 对象中它们还是可以继续使用：

    let chineseDictionary = Object.create(null);
    chineseDictionary.hello = "你好";
    chineseDictionary.bye = "再见";

    console.log(Object.keys(chineseDictionary)); // hello,bye



}
{
    function Rabbit(name) {
        this.name = name;
    }
    Rabbit.prototype.sayHi = function () {
        console.log(this.name);
    };

    let rabbit = new Rabbit("Rabbit");

    rabbit.sayHi();
    Rabbit.prototype.sayHi();
    Object.getPrototypeOf(rabbit).sayHi();
    rabbit.__proto__.sayHi();

    //     第一个调用中 this == rabbit，其他的 this 等同于 Rabbit.prototype，因为 this 就是点符号前面的对象。

    // 所以，只有第一个调用显示 Rabbit，其他的都显示的是 undefined
}
