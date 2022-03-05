/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-20 22:27:28
 * @LastEditTime: 2022-02-20 23:44:27
 */
"use strict";
class Animal {
    constructor(name) {
        this.name = name;
        this.speed = 0;
    }
    run(speed) {
        this.speed = speed;
        console.log(`${this.name} runs with speed ${this.speed}`);
    }
    stop() {
        this.speed = 0;
        console.log(`${this.name} stands still.`);
    }

}
let animal = new Animal("My animal");
class Rabbit extends Animal {
    hide() {
        console.log(`${this.name} hides!`);
    }
}
let rabbit = new Rabbit("White Rabbit");
rabbit.run(5);
rabbit.hide();

//在内部，关键字 extends 使用了很好的旧的原型机制进行工作。它将 Rabbit.prototype.[[Prototype]] 设置为 Animal.prototype。
//所以，如果在 Rabbit.prototype 中找不到一个方法，JavaScript 就会从 Animal.prototype 中获取该方法。

{
    // 类语法不仅允许指定一个类，在 extends 后可以指定任意表达式。
    function f(phrase) {
        return class {
            sayHi() { console.log(phrase); }
        };
    }

    class User extends f("Hello") { }

    new User().sayHi(); // Hello
    //这是class User 继承自 f("Hello") 的结果。
}
{
    //通常来说，我们不希望完全替换父类的方法，而是希望在父类方法的基础上进行调整或扩展其功能。我们在我们的方法中做一些事儿，但是在它之前或之后或在过程中会调用父类方法。
    // Class 为此提供了 "super" 关键字。

    // *执行 super.method(...) 来调用一个父类方法。
    // *执行 super(...) 来调用一个父类 constructor（只能在我们的 constructor 中）。


    class Animal {

        constructor(name) {
            this.speed = 0;
            this.name = name;
        }

        run(speed) {
            this.speed = speed;
            console.log(`${this.name} runs with speed ${this.speed}.`);
        }

        stop() {
            this.speed = 0;
            console.log(`${this.name} stands still.`);
        }

    }
    //     在 JavaScript 中，继承类（所谓的“派生构造器”，英文为 “derived constructor”）的构造函数与其他函数之间是有区别的。派生构造器具有特殊的内部属性 [[ConstructorKind]]:"derived"。这是一个特殊的内部标签。

    // 该标签会影响它的 new 行为：

    //     *当通过 new 执行一个常规函数时，它将创建一个空对象，并将这个空对象赋值给 this。
    //     *但是当继承的 constructor 执行时，它不会执行此操作。它期望父类的 constructor 来完成这项工作。

    // !因此，派生的 constructor 必须调用 super 才能执行其父类（base）的 constructor，否则 this 指向的那个对象将不会被创建。并且我们会收到一个报错。
    class Rabbit extends Animal {
        constructor(name, earLength) {
            super(name);//!必须先调用父类构造函数
            this.earLength = earLength;
        }
        hide() {
            console.log(`${this.name} hides!`);
        }

        stop() {
            super.stop(); // 调用父类的 stop
            this.hide(); // 然后 hide
        }
    }

    let rabbit = new Rabbit("White Rabbit");

    rabbit.run(5); // White Rabbit runs with speed 5.
    rabbit.stop(); // White Rabbit stands still. White Rabbit hides!
    //!箭头函数没有自己的 this 或 super，所以它们能融入到就近的上下文中，像透明似的。


}
{
    //类字段可以被重写
    //!但当我们访问在父类构造器中的一个被重写的字段时，这里会有一个诡异的行为，这与绝大多数其他编程语言都很不一样。
    class Animal {
        name = 'animal';

        constructor() {
            console.log(this.name); // (*)
        }
    }

    class Rabbit extends Animal {
        name = 'rabbit';
    }

    new Animal(); // animal
    new Rabbit(); // animal
    //类字段是这样初始化的：

    // *对于基类（还未继承任何东西的那种），在构造函数调用前初始化。
    // !对于派生类，在 super() 后立刻初始化。
    //!在父类构造器被执行的时候，Rabbit 还没有自己的类字段，这就是为什么 Animal 类字段被使用了。
}
{
    //super原理
    //引擎知道当前对象的 this，所以它可以获取父 method 作为 this.__proto__.method。不幸的是，这个“天真”的解决方法是行不通的。

    let animal = {
        name: "Animal",
        eat() {
            console.log(`${this.name} eats.`);
        }
    };

    let rabbit = {
        __proto__: animal,
        eat() {
            // ...bounce around rabbit-style and call parent (animal) method
            this.__proto__.eat.call(this); // (*)
        }
    };

    let longEar = {
        __proto__: rabbit,
        eat() {
            // ...do something with long ears and call parent (rabbit) method
            this.__proto__.eat.call(this); // (**)
        }
    };

    //longEar.eat(); // Error: Maximum call stack size exceeded
    //*在 (*) 和 (**) 这两行中，this.__proto__ 的值是完全相同的：都是 rabbit。它们俩都调用的是 rabbit.eat，它们在不停地循环调用自己，而不是在原型链上向上寻找方法。
    //*所以 rabbit.eat 在不停地循环调用自己，因此它无法进一步地提升。
    //*在 rabbit.eat 的 (*) 行中，我们希望将函数调用在原型链上向更高层传递，但是 this=longEar，所以 this.__proto__.eat 又是 rabbit.eat！

    {
        //!为了提供解决方法，JavaScript 为函数添加了一个特殊的内部属性：[[HomeObject]]。
        // *当一个函数被定义为类或者对象方法时，它的[[HomeObject]] 属性就成为了该对象。

        // *然后 super 使用它来解析（resolve）父原型及其方法。
        //*使用super正常允许，说明super不是简单的call this.__proto__.method
        let animal = {
            name: "Animal",
            eat() {         // animal.eat.[[HomeObject]] == animal
                console.log(`${this.name} eats.`);
            }
        };

        let rabbit = {
            __proto__: animal,
            name: "Rabbit",
            eat() {         // rabbit.eat.[[HomeObject]] == rabbit
                super.eat();
            }
        };

        let longEar = {
            __proto__: rabbit,
            name: "Long Ear",
            eat() {         // longEar.eat.[[HomeObject]] == longEar
                super.eat();
            }
        };

        // 正确执行
        longEar.eat();  // Long Ear eats.

        //!一个方法，例如 longEar.eat，知道其 [[HomeObject]] 并且从其原型中获取父方法。并没有使用 this。
    }
    {
        //正如我们之前所知道的，函数通常都是“自由”的，并没有绑定到 JavaScript 中的对象。正因如此，它们可以在对象之间复制，并用另外一个 this 调用它。
        //* [[HomeObject]] 的存在违反了这个原则，因为方法记住了它们的对象。[[HomeObject]] 不能被更改，所以这个绑定是永久的。
        //!在 JavaScript 语言中 [[HomeObject]] 仅被用于 super。所以，如果一个方法不使用 super，那么我们仍然可以视它为自由的并且可在对象之间复制。但是用了 super 再这样做可能就会出错。

        let animal = {
            sayHi() {
                console.log(`I'm an animal`);
            }
        };

        // rabbit 继承自 animal
        let rabbit = {
            __proto__: animal,
            sayHi() {
                super.sayHi();
            }
        };

        let plant = {
            sayHi() {
                console.log("I'm a plant");
            }
        };

        // tree 继承自 plant
        let tree = {
            __proto__: plant,
            sayHi: rabbit.sayHi // (*)
        };

        tree.sayHi();  // I'm an animal (?!?)
        //*[[HomeObject]] 是 rabbit，因为它是在 rabbit 中创建的。没有办法修改 [[HomeObject]]。

    }
    {
        //*[[HomeObject]] 是为类和普通对象中的方法定义的。但是对于对象而言，方法必须确切指定为 method()，而不是 "method: function()"。
        let animal = {
            eat: function () { //* 这里是故意这样写的，而不是 eat() {...
                // ...
            }
        };

        let rabbit = {
            __proto__: animal,
            eat: function () {
                super.eat();
            }
        };

      //  rabbit.eat();  // 错误调用 super（因为这里没有 [[HomeObject]]）

    }

}