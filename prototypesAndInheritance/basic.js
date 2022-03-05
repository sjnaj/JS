/*
 * @Author: fengsc
 * @Date: 2022-02-19 20:53:29
 * @LastEditTime: 2022-02-19 22:55:15
 */
"use strict";
//*在 JavaScript 中，对象有一个特殊的隐藏属性 [[Prototype]]（如规范中所命名的），它要么为 null，要么就是对另一个对象的引用。该对象被称为“原型”：
//*当我们从 object 中读取一个缺失的属性时，JavaScript 会自动从原型中获取该属性。在编程中，这被称为“原型继承”
{
    let animal = {
        eats: true,
        walk() {
            console.log("Animal walk");
        }
    };

    let rabbit = {
        jumps: true,
        __proto__: animal
    };

    let longEar = {
        earLength: 10,
        __proto__: rabbit
    };

    // walk 是通过原型链获得的
    longEar.walk(); // Animal walk
    console.log(longEar.jumps); // true（从 rabbit）
}
//这里只有两个限制：

// *引用不能形成闭环。如果我们试图在一个闭环中分配 __proto__，JavaScript 会抛出错误。
// *__proto__ 的值可以是对象，也可以是 null。而其他的类型都会被忽略。
//*还有一个显而易见的限制，只能有一个 [[Prototype]]。一个对象不能从其他两个对象获得继承。

//*__proto__ 是 [[Prototype]] 的因历史原因而留下来的 getter/setter

{
    let user = {
        name: "John",
        surname: "Smith",

        set fullName(value) {
            [this.name, this.surname] = value.split(" ");
        },

        get fullName() {
            return `${this.name} ${this.surname}`;
        }
    };

    let admin = {
        __proto__: user,
        isAdmin: true
    };
    console.log(Object.getOwnPropertyDescriptors(admin));
    // *Object.keys 只返回自己的 key
    //几乎所有其他键/值获取方法，例如 Object.keys 和 Object.values 等，都会忽略继承的属性。
    console.log(Object.keys(admin)); // jumps

    // *for..in 会遍历自己以及继承的键
    for (let prop in admin) console.log(prop); // jumps，然后是 eats
    //*有一个内建方法 obj.hasOwnProperty(key)可以用于排除继承的属性，它本身是不可枚举的，此方法继承于Object.prototype
    console.log(admin.fullName); // John Smith (*)

    // setter triggers!
    admin.fullName = "Alice Cooper"; // (**)
    console.log(Object.getOwnPropertyDescriptors(admin));
    //*多了name和surname属性，说明通过set函数创建了属于自己的属性
    //无论在哪里找到方法：在一个对象还是在原型中。在一个方法调用中，this 始终是点符号 . 前面的对象。
    //因此，setter 调用 admin.fullName= 使用 admin 作为 this，而不是 user。

    console.log(admin.fullName); // Alice Cooper，admin 的内容被修改了
    console.log(user.fullName);  // John Smith，user 的内容不变
    //*原型仅用于初始时读取属性。修改时不会影响原型的状态



}
{
    let hamster = {
        stomach: [],

        eat(food) {
            this.stomach.push(food);
        }
    };

    let speedy = {
        __proto__: hamster
    };

    let lazy = {
        __proto__: hamster
    };

    // 这只仓鼠找到了食物
    speedy.eat("apple");
    console.log(speedy.stomach); // apple

    // 这只仓鼠也找到了食物，为什么？请修复它。
    console.log(lazy.stomach); // apple
    //对于 lazy.stomach.push(...) 和 speedy.stomach.push() 而言，属性 stomach 被在原型中找到（不是在对象自身），然后向其中 push 了新数据。

    {
        let hamster = {
            stomach: [],

            eat(food) {
                // 分配给 this.stomach 而不是 this.stomach.push
                //*this.stomach= 不会执行对 stomach 的查找。该值会被直接写入 this 对象。
                this.stomach = [food];
            }
        };

        let speedy = {
            __proto__: hamster
        };

        let lazy = {
            __proto__: hamster
        };

        // 仓鼠 Speedy 找到了食物
        speedy.eat("apple");
        console.log(speedy.stomach); // apple

        // 仓鼠 Lazy 的胃是空的
        console.log(lazy.stomach); // <nothing>}
    }
    {
        //还可以通过确保每只仓鼠都有自己的胃来完全回避这个问题：
        let hamster = {
            stomach: [],

            eat(food) {
                this.stomach.push(food);
            }
        };

        let speedy = {
            __proto__: hamster,
            stomach: []
        };

        let lazy = {
            __proto__: hamster,
            stomach: []
        };

        // 仓鼠 Speedy 找到了食物
        speedy.eat("apple");
        console.log(speedy.stomach); // apple

        // 仓鼠 Lazy 的胃是空的
        console.log(lazy.stomach); // <nothing>
    }
}