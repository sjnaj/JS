/*
 * @Author: fengsc
 * @Date: 2022-01-23 22:45:53
 * @LastEditTime: 2022-01-25 23:27:56
 */
function greetMe(user) {
    console.log('Hi ' + user);
}
greetMe('Alice');
var x = (+"1.1") + (+"1.1");
console.log(x);
console.log(parseFloat("1.1"));
var a;
if ((a + 2) === NaN)
    console.log("a+2 is a NaN");
if ((a + 2) === undefined)
    console.log("a+2 is undefine");
var coffees = ["French Roast", "Colombian", "Kona"];
console.log(coffees.length);
var car = { manyCars: { a: "Saab", "b": "Jeep" }, 7: "Mazda", "": "Empty" };
console.log(car.manyCars.b);
console.log(car[7]);
console.log(car[""]);
var reg = /a\*b/;
red = new RegExp("a\\*b"); //与上面的定义等价,注意转义符要多加个反斜杠
var reg1 = /(\d+)\.\1/; //括号内部分匹配的字符将被记忆到后面的'\1'
console.log(reg1.exec("121.12122"));
console.log("121.12122".match(reg1)); //两种用法等价
console.log(reg1.test("121.12122"));
var reg2 = /\w+\s/g;
reg2 = new RegExp("\\w+\\s", "g"); //与上面定义等价
var str = "fee fi fo fum";
console.log(str.match(reg2)); //返回所有的匹配片段，不返回index等其它信息
var xArray;
while (xArray = reg2.exec(str)) //逐个匹配返回
{
    console.log(xArray);
    console.log(reg2.lastIndex); //返回下次将要匹配的起始位置
}
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1"); //$n表示保存的部分
console.log(newstr);
var names = "Orange Trump ;Fred Barney; Helen Rigby ; Bill Abel ; Chris Hand ";
var nameList = names.split(/\s*;\s*/); //匹配一个分号及紧接其前后所有可能出现的连续的空白符，剔除匹配的部分分割存放在新数组
console.log(nameList);
var b = new Boolean(false);
if (b) ;//结果视为真,值为false的boolean对象和false(布尔值)不同，前者在条件语句中视为真，
if (b == true); // 结果视为假

  
