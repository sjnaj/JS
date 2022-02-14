/*
 * @Author: fengsc
 * @Date: 2022-02-07 23:42:08
 * @LastEditTime: 2022-02-07 23:44:21
 */
// 对于普通对象，下列这些方法是可用的：

//     Object.keys(obj) —— 返回一个包含该对象所有的键的数组。
//     Object.values(obj) —— 返回一个包含该对象所有的值的数组。
//     Object.entries(obj) —— 返回一个包含该对象所有 [key, value] 键值对的数组。
// Map 	Object
// 调用语法 	map.keys() 	Object.keys(obj)，而不是 obj.keys()
// 返回值 	可迭代项 	“真正的”数组 //这主要是历史原因。
//就像 for..in 循环一样，这些方法会忽略使用 Symbol(...) 作为键的属性。
//如果我们也想要 Symbol 类型的键，那么这儿有一个单独的方法 Object.getOwnPropertySymbols，它会返回一个只包含 Symbol 类型的键的数组。
//另外，还有一种方法 Reflect.ownKeys(obj)，它会返回 所有 键。
// 对象缺少数组存在的许多方法，例如 map 和 filter 等。

// 如果我们想应用它们，那么我们可以使用 Object.entries，然后使用 Object.fromEntries：

//     使用 Object.entries(obj) 从 obj 获取由键/值对组成的数组。
//     对该数组使用数组方法，例如 map。
//     对结果数组使用 Object.fromEntries(array) 方法，将结果转回成对象。
let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
  };
  
  let doublePrices = Object.fromEntries(
    // 转换为数组，之后使用 map 方法，然后通过 fromEntries 再转回到对象
    Object.entries(prices).map(([key, value]) => [key, value * 2])
  );
  
  console.log(doublePrices.meat); // 8


