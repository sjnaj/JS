/*
 * @Author: fengsc
 * @Date: 2022-02-21 14:56:10
 * @LastEditTime: 2022-02-21 15:00:17
 */
"use strict";
//内建的类，例如 Array，Map 等也都是可以扩展的（extendable）。
// 给 PowerArray 新增了一个方法（可以增加更多）
class PowerArray extends Array {
    isEmpty() {
      return this.length === 0;
    }
  }
  
  let arr = new PowerArray(1, 2, 5, 10, 50);
  console.log(arr.isEmpty()); // false
  
  let filteredArr = arr.filter(item => item >= 10);
  console.log(filteredArr); // 10, 50
  console.log(filteredArr.isEmpty()); // false
  //!当 arr.filter() 被调用时，它的内部使用的是 arr.constructor 来创建新的结果数组，而不是使用原生的 Array。这真的很酷，因为我们可以在结果数组上继续使用 PowerArray 的方法。
  {
    class PowerArray extends Array {
        isEmpty() {
          return this.length === 0;
        }
      
        // 内建方法将使用这个作为 constructor
        static get [Symbol.species]() {
          return Array;
        }
      }
      
      let arr = new PowerArray(1, 2, 5, 10, 50);
      console.log(arr.isEmpty()); // false
      
      // filter 使用 arr.constructor[Symbol.species] 作为 constructor 创建新数组
      let filteredArr = arr.filter(item => item >= 10);
      
      // filteredArr 不是 PowerArray，而是 Array
      //*console.log(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
      //其他集合，例如 Map 和 Set 的工作方式类似。它们也使用 Symbol.species。
    }
    //!内建类没有静态方法继承