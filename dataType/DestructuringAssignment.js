/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-07 23:49:12
 * @LastEditTime: 2022-02-19 20:25:21
 */


//解构赋值 是一种特殊的语法，它使我们可以将数组或对象“拆分”到一系列变量中，因为有时候使用变量更加方便。解构操作对那些具有很多参数和默认值等的函数也很奏效。
// 我们有一个存放了名字和姓氏的数组
let arr = ["Ilya", "Kantor"];

// 解构赋值
// sets firstName = arr[0]
// and surname = arr[1]
let [firstName, surname] = arr;

console.log(firstName); // Ilya
console.log(surname);  // Kantor
{
    //数组中不想要的元素也可以通过添加额外的逗号来把它丢弃：
    let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
    console.log(title);//"Consul"
}
{
    //等号右侧可以是任何可迭代对象
    let [a, b, c] = "abc"; // ["a", "b", "c"]
    let [one, two, three] = new Set([1, 2, 3]);
}
{
    //可以在等号左侧使用任何“可以被赋值的”东西。
    let user = {};
    [user.name, user.surname] = "Ilya Kantor".split(' ');

    console.log(user.name); // Ilya
}
{
    //可以将 .entries() 方法与解构语法一同使用，来遍历一个对象的“键—值”对：
    let user = {
        name: "John",
        age: 30
    };

    // 循环遍历键—值对
    for (let [key, value] of Object.entries(user)) {
        console.log(`${key}:${value}`); // name:John, then age:30
    }
}
{
    let guest = "Jane";
    let admin = "Pete";

    // 交换值：让 guest=Pete, admin=Jane
    [guest, admin] = [admin, guest];

    console.log(`${guest} ${admin}`); // Pete Jane（成功交换！）
    //可以用这种方式交换两个以上的变量。
}
{
    let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

    console.log(name1); // Julius
    console.log(name2); // Caesar

    // 请注意，`rest` 的类型是数组
    console.log(rest[0]); // Consul
    console.log(rest[1]); // of the Roman Republic
    console.log(rest.length); // 2
    //如果赋值语句中，变量的数量多于数组中实际元素的数量，赋值不会报错。未赋值的变量被认为是 undefined：
    //*如果我们想要一个“默认”值给未赋值的变量，我们可以使用 = 来提供：
    // 默认值
    let [name = "Guest", surname = "Anonymous"] = ["Julius"];

    console.log(name);    // Julius（来自数组的值）
    console.log(surname); // Anonymous（默认值被使用了）
    {
        // 只会提示输入姓氏
        //     let [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

        //     console.log(name);    // Julius（来自数组）
        //     console.log(surname); // 你输入的值
    }
}
{//对象解构
    let options = {
        title: "Menu",
        width: 100,
        height: 200
    };

    let { title, width, height } = options;
    console.log(`${title} ${width} ${height}`);
    //变量的顺序并不重要

    {  // { sourceProperty: targetVariable }
        //赋给自定义变量
        let { width: w, height: h, title } = options;

        // width -> w
        // height -> h
        // title -> title
        console.log(`${w} ${h} ${title}`);
    }
    {
        //对于可能缺失的属性，我们可以使用 "=" 设置默认值
        //还可以将冒号和等号结合起来
        let options = {
            title: "Menu"
        };

        let { width: w = 100, height: h = 200, title } = options;
        console.log(`${w} ${height} ${title}`);
    }
    //如果我们有一个具有很多属性的复杂对象，那么我们可以只提取所需的内容
    {//使用已有变量
        let title, width, height;

        // 这一行发生了错误
        //{ title, width, height } = { title: "Menu", width: 200, height: 100 };
        //这里 JavaScript 假定我们有一个代码块，这就是报错的原因。我们需要解构它。
        ({ title, width, height } = { title: "Menu", width: 200, height: 100 });
        //用括号括起来，告诉 JavaScript 这不是一个代码块
        console.log(title, width, height);
    }
    {//嵌套解构
        let options = {
            size: {
                width: 100,
                height: 200
            },
            items: ["Cake", "Donut"],
            extra: true
        };

        // 为了清晰起见，解构赋值语句被写成多行的形式
        let {
            size: { // 把 size 赋值到这里
                width,
                height
            },
            items: [item1, item2], // 把 items 赋值到这里
            title = "Menu" // 在对象中不存在（使用默认值）
        } = options;
        console.log(`${width} ${height} ${item1} ${item2} ${title}`);
    }

}
{//智能函数参数
    {//不好的写法
        function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
            // ...
            console.log(title);
        }
        showMenu();
        showMenu("My Menu");
        showMenu("My Menu", undefined, undefined, ["Item1", "Item2"]);
        //顺序固定
    }
    {
        // 我们传递一个对象给函数
        let options = {
            title: "My menu",
            items: ["Item1", "Item2"]
        };

        // ……然后函数马上把对象展开成变量
        function showMenu({ title = "Untitled", width = 200, height = 100, items = [] }) {
            // title, items – 提取于 options，
            // width, height – 使用默认值
            console.log(`${title} ${width} ${height}`); // My Menu 200 100
            console.log(items); // Item1, Item2
        }

        showMenu(options);

        showMenu({}); //所有值都取默认值
        //showMenu();//报错

    //通过指定空对象 {} 为整个参数对象的默认值时showMenu()就不会报错了
    

    }

}