/*
 * @Author: fengsc
 * @Date: 2022-02-17 22:17:45
 * @LastEditTime: 2022-02-18 11:56:28
 */
// JSON（JavaScript Object Notation）是表示值和对象的通用格式。在 RFC 4627 标准中有对其的描述。最初它是为 JavaScript 而创建的，但许多其他编程语言也有用于处理它的库。因此，当客户端使用 JavaScript 而服务器端是使用 Ruby/PHP/Java 等语言编写的时，使用 JSON 可以很容易地进行数据交换。

// JavaScript 提供了如下方法：

//     JSON.stringify 将对象转换为 JSON。
//     JSON.parse 将 JSON 转换回对象。

// JSON 编码的对象与对象字面量有几个重要的区别：

let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    wife: null
};

let json = JSON.stringify(student);

console.log(typeof json); // we've got a string!

console.log(json);
/* JSON 编码的对象：
{
"name": "John",
"age": 30,
"isAdmin": false,
"courses": ["html", "css", "js"],
"wife": null
}
*/

//     字符串使用双引号。JSON 中没有单引号或反引号。所以 'John' 被转换为 "John"。
//     对象属性名称也是双引号的。这是强制性的。所以 age:30 被转换成 "age":30。
{
    //     JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 JSON.stringify 跳过。

    // 即：

    //     函数属性（方法）。
    //     Symbol 类型的键和值。
    //     存储 undefined 的属性。
    let user = {
        sayHi() { // 被忽略
            alert("Hello");
        },
        [Symbol("id")]: 123, // 被忽略
        something: undefined // 被忽略
    };

    console.log(JSON.stringify(user)); // {}（空对象）

}
{
    // 重要的限制：不得有循环引用。
    let room = {
        number: 23,
    };

    let meetup = {
        title: "Conference",
        participants: ["john", "ann"],
    };

    meetup.place = room;       // meetup 引用了 room
    room.occupiedBy = meetup; // room 引用了 meetup

    // JSON.stringify(meetup); // Error: Converting circular structure to JSON
}
{
    //     JSON.stringify 的完整语法是：

    // let json = JSON.stringify(value[, replacer, space])

    // value
    // 要编码的值。
    // replacer
    // 要编码的属性数组或映射函数 function(key, value)。
    // space
    // 用于格式化的空格数量(对象缩进的空格)
    //仅用于日志记录和美化输出。


    // 大部分情况，JSON.stringify 仅与第一个参数一起使用。但是，如果我们需要微调替换过程，比如过滤掉循环引用，我们可以使用 JSON.stringify 的第二个参数。
    //如果我们传递一个属性数组给它，那么只有这些属性会被编码。
    let room = {
        number: 23
    };

    let meetup = {
        title: "Conference",
        participants: [{ name: "John" }, { name: "Alice" }],
        place: room // meetup 引用了 room
    };

    room.occupiedBy = meetup; // room 引用了 meetup
    //包含除了会导致循环引用的 room.occupiedBy 之外的所有属性：
    console.log(JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']));
    // 可以使用一个函数代替数组作为 replacer。

    // 该函数会为每个 (key,value) 对调用并返回“已替换”的值，该值将替换原有的值。如果值被跳过了，则为 undefined。
    console.log(JSON.stringify(meetup, (key, value) =>
        key == 'occupiedBy' ? undefined : value
    ));


}
{//自定义toJson
    let room = {
        number: 23,
        toJSON() {
            return this.number;
        }
    };

    let meetup = {
        title: "Conference",
        room,
    };

    console.log(JSON.stringify(room)); // 23

    console.log(JSON.stringify(meetup));//toJSON 既可以用于直接调用 JSON.stringify(room) 也可以用于当 room 嵌套在另一个编码对象中时。
    /*
      {
        "title":"Conference",
        "room": 23
      }
    */

}
{
    // let value = JSON.parse(str, [reviver]);

    // str
    // 要解析的 JSON 字符串。
    // reviver
    // 可选的函数 function(key, value)，该函数将为每个(key, value) 对调用，并可以对值进行转换。
    let numbers = "[0, 1, 2, 3]";

    numbers = JSON.parse(numbers);

    console.log(numbers[1]); // 1

    //嵌套对象
    let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

    let user = JSON.parse(userData);

    console.log(user.friends[1]); // 1


    let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

    let meetup = JSON.parse(str);

    //console.log(meetup.date.getDate()); // Error! meetup.date 的值是一个字符串，而不是 Date 对象。

    {
        let meetup = JSON.parse(str, (key, value) =>
            key == 'date' ? new Date(value) : value
        );
        console.log(meetup.date.getDate()); // 现在正常运行了！
        //也适用于嵌套对象
    }
}
