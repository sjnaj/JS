/*
 * @Author: fengsc
 * @Date: 2022-02-20 23:45:56
 * @LastEditTime: 2022-02-21 14:28:38
 */
"use strict";
class Article {
    constructor(title, date) {
        this.title = title;
        this.date = date;
    }
    static createTodays() {
        return new this("Today's digest", new Date());
    }
}
let article = Article.createTodays();
console.log(article.title);
Article.publisher = "lala";//*添加静态属性
console.log(Article.publisher);
{
    //*静态属性和方法是可被继承的。
    class Animal {
        static planet = "Earth";

        constructor(name, speed) {
            this.speed = speed;
            this.name = name;
        }

        run(speed = 0) {
            this.speed += speed;
            console.log(`${this.name} runs with speed ${this.speed}.`);
        }

        static compare(animalA, animalB) {
            return animalA.speed - animalB.speed;
        }

    }

    // 继承于 Animal
    class Rabbit extends Animal {
        hide() {
            console.log(`${this.name} hides!`);
        }
    }

    let rabbits = [
        new Rabbit("White Rabbit", 10),
        new Rabbit("Black Rabbit", 5)
    ];

    rabbits.sort(Rabbit.compare);

    rabbits[0].run(); // Black Rabbit runs with speed 5.

    console.log(Rabbit.planet); // Earth

}
{
    // !Rabbit extends Animal 创建了两个 [[Prototype]] 引用：

    // *Rabbit 函数原型继承自 Animal 函数。
    // *Rabbit.prototype 原型继承自 Animal.prototype。
    class Animal { }
    class Rabbit extends Animal { }

    // *对于静态的（直接存在类里）
    console.log(Rabbit.__proto__ === Animal); // true

    // *对于常规方法（存在类的prototype里）
    console.log(Rabbit.prototype.__proto__ === Animal.prototype); // true
}
