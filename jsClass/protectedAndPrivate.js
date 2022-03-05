/*
 * @Author: fengsc
 * @Date: 2022-02-21 14:29:03
 * @LastEditTime: 2022-02-21 14:53:32
 */
"use strict";
class CoffeeMachine {
    _waterAmount = 0;

    set waterAmount(value) {
        if (value < 0) {
            value = 0;
        }
        this._waterAmount = value;
    }

    get waterAmount() {
        return this._waterAmount;
    }

    constructor(power) {
        this._power = power;
    }

}

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);

// 加水
coffeeMachine.waterAmount = -10; // _waterAmount 将变为 0，而不是 -10

//现在访问已受到控制，因此将水量的值设置为小于零的数变得不可能。
//*受保护的属性通常以下划线 _ 作为前缀。

//对于 power 属性，让我们将它设为只读。有时候一个属性必须只能被在创建时进行设置，之后不再被修改。
//*要做到这一点，我们只需要设置 getter，而不设置 setter：
{
    class CoffeeMachine {
        // ...

        constructor(power) {
            this._power = power;
        }

        get power() {
            return this._power;
        }

    }

    // 创建咖啡机
    let coffeeMachine = new CoffeeMachine(100);

    console.log(`Power is: ${coffeeMachine.power}W`); // 功率是：100W

    //  coffeeMachine.power = 25; // Error（没有 setter）
}
{
    //*私有属性和方法应该以 # 开头。它们只在类的内部可被访问。
    class CoffeeMachine {
        #waterLimit = 200;

        #fixWaterAmount(value) {
            if (value < 0) return 0;
            if (value > this.#waterLimit) return this.#waterLimit;
        }

        setWaterAmount(value) {
            this.#waterLimit = this.#fixWaterAmount(value);
        }
    }

    let coffeeMachine = new CoffeeMachine();

    // 不能从类的外部访问类的私有属性和方法
    // coffeeMachine.#fixWaterAmount(123); // Error
    // coffeeMachine.#waterLimit = 1000; // Error
    //*在语言级别，# 是该字段为私有的特殊标志。我们无法从外部或从继承的类中访问它。
    //*私有字段与公共字段不会发生冲突。我们可以同时拥有私有的 #waterAmount 和公共的 waterAmount 字段。
  
    {
        //让我们使 waterAmount 成为 #waterAmount 的一个访问器：
        class CoffeeMachine {

            #waterAmount = 0;

            get waterAmount() {
                return this.#waterAmount;
            }

            set waterAmount(value) {
                if (value < 0) value = 0;
                this.#waterAmount = value;
            }
        }

        let machine = new CoffeeMachine();

        machine.waterAmount = 100;
        //console.log(machine.#waterAmount); // Error
    }
    //*私有字段不能通过 this[name] 访问

}
// 为了隐藏内部接口，我们使用受保护的或私有的属性：

//     受保护的字段以 _ 开头。这是一个众所周知的约定，不是在语言级别强制执行的。程序员应该只通过它的类和从它继承的类中访问以 _ 开头的字段。
//     私有字段以 # 开头。JavaScript 确保我们只能从类的内部访问它们。

