/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-07 22:16:07
 * @LastEditTime: 2022-02-07 23:35:33
 */
// Map 是一个带键的数据项的集合，就像一个 Object 一样。 但是它们最大的差别是 Map 允许任何类型的键（key）。

// 它的方法和属性如下：

//     new Map() —— 创建 map。
//     map.set(key, value) —— 根据键存储值。
//     map.get(key) —— 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined。
//     map.has(key) —— 如果 key 存在则返回 true，否则返回 false。
//     map.delete(key) —— 删除指定键的值。
//     map.clear() —— 清空 map。
//     map.size —— 返回当前元素个数
let map = new Map();

map.set('1', 'str1');   // 字符串键
map.set(1, 'num1');     // 数字键
map.set(true, 'bool1'); // 布尔值键

// 还记得普通的 Object 吗? 它会将键转化为字符串
// Map 则会保留键的类型，所以下面这两个结果不同：
console.log(map.get(1)); // 'num1'
console.log(map.get('1')); // 'str1'

console.log(map.size); // 3
// 虽然 map[key] 也有效，例如我们可以设置 map[key] = 2，这样会将 map 视为 JavaScript 的 plain object，
//因此它暗含了所有相应的限制（没有对象键等）。

// 所以我们应该使用 map 方法：set 和 get 等。
//Map 还可以使用对象作为键。
let john = { name: "John" };

// 存储每个用户的来访次数
let visitsCountMap = new Map();

// john 是 Map 中的键
visitsCountMap.set(john, 123);

console.log(visitsCountMap.get(john)); // 123
//对象中的对象键会被转换为字符串"[object Object]"
//Map 使用 SameValueZero 算法来比较键是否相等。它和严格等于 === 差不多，但区别是 NaN 被看成是等于 NaN。所以 NaN 也可以被用作键。
//每一次 map.set 调用都会返回 map 本身，所以我们可以进行“链式”调用：

map.set('1', 'str1')
    .set(1, 'num1')
    .set(true, 'bool1');
{//Map迭代

    // map.keys() —— 遍历并返回所有的键（returns an iterable for keys），
    // map.values() —— 遍历并返回所有的值（returns an iterable for values），
    // map.entries() —— 遍历并返回所有的实体（returns an iterable for entries）[key, value]，for..of 在默认情况下使用的就是这个。
    let recipeMap = new Map([
        ['cucumber', 500],
        ['tomatoes', 350],
        ['onion', 50]
    ]);
    // 打印所有的键（vegetables）
    console.log(recipeMap.keys());//{ 'cucumber', 'tomatoes', 'onion' }

    // 遍历所有的值（amounts）
    for (let amount of recipeMap.values()) {
        console.log(amount); // 500, 350, 50
    }

    // 遍历所有的实体 [key, value]
    for (let entry of recipeMap) { // 与 recipeMap.entries() 相同
        console.log(entry); // cucumber,500 (and so on)
    }
    //迭代的顺序与插入值的顺序相同。与普通的 Object 不同，Map 保留了此顺序。
    // 对每个键值对 (key, value) 运行 forEach 函数
    recipeMap.forEach((value, key) => {
        console.log(`${key}: ${value}`); // cucumber: 500 etc
    });

}
{//用对象建立map
    let obj = {
        name: "John",
        age: 30
    };

    let map = new Map(Object.entries(obj));

    console.log(map.get('name')); // John
}
{//用map建立对象
    let map = new Map();
    map.set('banana', 1);
    map.set('orange', 2);
    map.set('meat', 4);

    let obj = Object.fromEntries(map); //与map.entries()等价     创建一个普通对象（plain object）(*)

    // 完成了！
    // obj = { banana: 1, orange: 2, meat: 4 }

    console.log(obj.orange); // 2

}
{
    //     Set 是一个特殊的类型集合 —— “值的集合”（没有键），它的每一个值只能出现一次。

    // 它的主要方法如下：

    //     new Set(iterable) —— 创建一个 set，如果提供了一个 iterable 对象（通常是数组），将会从数组里面复制值到 set 中。
    //     set.add(value) —— 添加一个值，返回 set 本身
    //     set.delete(value) —— 删除值，如果 value 在这个方法调用的时候存在则返回 true ，否则返回 false。
    //     set.has(value) —— 如果 value 在 set 中，返回 true，否则返回 false。
    //     set.clear() —— 清空 set。
    //     set.size —— 返回元素个数。

    let set = new Set(["oranges", "apples", "bananas"]);

    for (let value of set) console.log(value);

    // 与 forEach 相同：
    set.forEach((value, value2, set) => {
        console.log(value);
    });
    //forEach 的回调函数有三个参数：一个 value，然后是 同一个值 value2，最后是目标对象。没错，同一个值在参数里出现了两次。
    //Map 中用于迭代的方法在 Set 中也同样支持：
}
{
    // eslint-disable-next-line no-inner-declarations
    function unique(arr) {
        return Array.from(new Set(arr));
    }
    let values = ["Hare", "Krishna", "Hare", "Krishna",
        "Krishna", "Krishna", "Hare", "Hare", ":-O"
    ];

    console.log(unique(values)); // Hare, Krishna, :-O
}
{
    //     WeakMap 是类似于 Map 的集合，它仅允许对象作为键，并且一旦通过其他方式无法访问它们，便会将它们与其关联值一同删除。

    // WeakSet 是类似于 Set 的集合，它仅存储对象，并且一旦通过其他方式无法访问它们，便会将其删除。

    // 它们都不支持引用所有键或其计数的方法和属性(迭代以及 keys()，values() 和 entries() 方法。)。仅允许单个操作。
    //为什么会有这种限制呢？这是技术的原因。如果一个对象丢失了其它所有引用（就像上面示例中的 john），那么它就会被垃圾回收机制自动回收。但是在从技术的角度并不能准确知道 何时会被回收。
    //WeakMap 和 WeakSet 最明显的局限性就是不能迭代，并且无法获取所有当前内容。那样可能会造成不便，但是并不会阻止 WeakMap/WeakSet 完成其主要工作 — 成为在其它地方管理/存储“额外”的对象数据。
    {
        let john = { name: "John" };

        let map = new Map();
        map.set(john, "...");

        john = null; // 覆盖引用

        // john 被存储在了 map 中，
        // 我们可以使用 map.keys() 来获取它

    }
    {
        let john = { name: "John" };

        let weakMap = new WeakMap();
        weakMap.set(john, "...");

        john = null; // 覆盖引用

        // john 被从内存中删除了！
    }
    {
        // 📁 visitsCount.js
        let visitsCountMap = new WeakMap(); // weakmap: user => visits count

        // 递增用户来访次数
        function countUser(user) {
            let count = visitsCountMap.get(user) || 0;
            visitsCountMap.set(user, count + 1);
        }
        //现在我们不需要去清理 visitsCountMap 了。当 john 对象变成不可访问时，
        //即便它是 WeakMap 里的一个键，它也会连同它作为 WeakMap 里的键所对应的信息一同被从内存中删除。

    }
    {
        //我们可以将用户添加到 WeakSet 中，以追踪访问过我们网站的用户：
        let visitedSet = new WeakSet();

        let john = { name: "John" };
        let pete = { name: "Pete" };
        let mary = { name: "Mary" };

        visitedSet.add(john); // John 访问了我们
        visitedSet.add(pete); // 然后是 Pete
        visitedSet.add(john); // John 再次访问

        // visitedSet 现在有两个用户了

        // 检查 John 是否来访过？
        console.log(visitedSet.has(john)); // true

        // 检查 Mary 是否来访过？
        console.log(visitedSet.has(mary)); // false

        john = null;

        // visitedSet 将被自动清理(即自动清除其中已失效的值 john)
    }
}
