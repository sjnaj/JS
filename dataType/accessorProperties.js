
/*
 * @Author: fengsc
 * @Date: 2022-02-19 19:45:17
 * @LastEditTime: 2022-02-19 20:49:52
 */
"use strict";

// 有两种类型的对象属性。

// **第一种是数据属性。我们已经知道如何使用它们了。到目前为止，我们使用过的所有属性都是数据属性。

// **第二种类型的属性是新东西。它是访问器属性（accessor properties）。它们本质上是用于获取和设置值的函数，但从外部代码来看就像常规属性。
// let obj = {
//     get propName() {
//       // 当读取 obj.propName 时，getter 起作用
//     },

//     set propName(value) {
//       // 当执行 obj.propName = value 操作时，setter 起作用
//     }
//   };

{
    let user = {
        name: "John",
        surname: "Smith",

        get fullName() {
            return `${this.name} ${this.surname}`;
        }
    };

    console.log(user.fullName); // John Smith
    //user.fullName = "Test"; // Error（属性只有一个 getter）
}
{
    //通过为 user.fullName 添加一个 setter 来修复它：

    let user = {
        name: "John",
        surname: "Smith",

        get fullName() {
            return `${this.name} ${this.surname}`;
        },

        set fullName(value) {
            [this.name, this.surname] = value.split(" ");
        }
    };

    // set fullName 将以给定值执行
    user.fullName = "Alice Cooper";

    console.log(user.name); // Alice
    console.log(user.surname); // Cooper

    //**现在，我们就有一个“虚拟”属性。它是可读且可写的。
}
{
    //从外部添加属性
    let user = {
        name: "John",
        surname: "Smith"
    };

    Object.defineProperty(user, 'fullName', {
        get() {
            return `${this.name} ${this.surname}`;
        },

        set(value) {
            [this.name, this.surname] = value.split(" ");
        }
    });
    //一个属性要么是访问器（具有 get/set 方法），要么是数据属性（具有 value），但不能两者都是。
    console.log(user.fullName); // John Smith

    for (let key in user) console.log(key); // name, surname

}
{
    let user = {
        get name() {
            return this._name;
        },

        set name(value) {
            if (value.length < 4) {
                console.log("Name is too short, need at least 4 characters");
                return;
            }
            this._name = value;
            //从技术上讲，外部代码可以使用 user._name 直接访问 name。但是，这儿有一个众所周知的约定，即以下划线 "_" 开头的属性是内部属性，不应该从对象外部进行访问。
        }
    };

    user.name = "Pete";
    console.log(user.name); // Pete

    user.name = ""; // Name 太短了……
    
}
