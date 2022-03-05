/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-19 22:57:08
 * @LastEditTime: 2022-02-20 12:16:20
 */
"use strict";
let animal = {
    eats: true
};

function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

console.log(rabbit.eats); // true
//设置 Rabbit.prototype = animal 的字面意思是：“当创建了一个 new Rabbit 时，把它的 [[Prototype]] 赋值为 animal”。
//F.prototype 属性仅在 new F 被调用时使用，它为新对象的 [[Prototype]] 赋值。

//*如果在创建之后，F.prototype 属性有了变化（F.prototype = <another object>），那么通过 new F 创建的新对象也将随之拥有新的对象作为 [[Prototype]]，但已经存在的对象将保持旧有的值。
{
    //每个函数都有 "prototype" 属性，即使我们没有提供它。
    //*默认的 "prototype" 是一个只有属性 constructor 的对象，属性 constructor 指向函数自身。
    // function Rabbit() { }

    /* default prototype
    //*Rabbit.prototype = { constructor: Rabbit };
    */
    //以下三个对象是等价的
    //console.log( Rabbit.prototype.constructor == Rabbit ); // true
    // console.log(rabbit.constructor == Rabbit); // *true (from prototype)构造函数相当于对象的初始原型

    function Rabbit(name) {
        this.name = name;
        console.log(name);
    }

    let rabbit = new Rabbit("White Rabbit");

    let rabbit2 = new rabbit.constructor("Black Rabbit");//*

    //*当我们有一个对象，但不知道它使用了哪个构造器（例如它来自第三方库），并且我们需要创建另一个类似的对象时，用这种方法就很方便。


}
{
    //JavaScript 自身并不能确保正确的 "constructor" 函数值
    //*如果我们将整个默认 prototype 替换掉（例如替换为原型），那么其中就不会有 "constructor" 了。
    function Rabbit() { }
    Rabbit.prototype = {
        jumps: true
    };

    let rabbit = new Rabbit();
    console.log(rabbit.constructor === Rabbit); // false

    {
        //为了确保正确的 "constructor"，我们可以选择添加/删除属性到默认 "prototype"，而不是将其整个覆盖：
        function Rabbit() { }

        // 不要将 Rabbit.prototype 整个覆盖
        // 可以向其中添加内容
        Rabbit.prototype.jumps = true;//相当于继承了{jumps:true}
        // 默认的 Rabbit.prototype.constructor 被保留了下来
    }

    {
        //或者，也可以手动重新创建 constructor 属性：

        Rabbit.prototype = {
            jumps: true,
            constructor: Rabbit
        };
        // 这样的 constructor 也是正确的，因为我们手动添加了它
    }
}
{
    {
        function Rabbit() { }
        Rabbit.prototype = {
            eats: true
        };

        let rabbit = new Rabbit();

        console.log(rabbit.eats); // true
    }
    {
        function Rabbit() { }
        Rabbit.prototype = {
            eats: true
        };

        let rabbit = new Rabbit();
        Rabbit.prototype = {};

        console.log(rabbit.eats); // ?
        //*true 修改Rabbit.prototype 对已创建的对象无影响
        console.log(rabbit.__proto__);//*{ eats: true }

    }
    {
        function Rabbit() { }
        Rabbit.prototype = {
            eats: true
        };

        let rabbit = new Rabbit();

        Rabbit.prototype.eats = false;

        console.log(rabbit.eats); // ?
        //*true 修改了原型中的属性，有影响
    }
    {
        function Rabbit() { }
        Rabbit.prototype = {
            eats: true
        };

        let rabbit = new Rabbit();

        delete rabbit.eats;

        console.log(rabbit.eats); // ?
        //*true rabbits.并无eats属性（是继承的），删除不了
    }
    {
        function Rabbit() { }
        Rabbit.prototype = {
            eats: true
        };

        let rabbit = new Rabbit();

        delete Rabbit.prototype.eats;

        console.log(rabbit.eats); // ?
        //*undefined 删除了原型中的属性
    }
}
