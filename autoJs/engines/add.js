/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-12 19:07:32
 * @LastEditTime: 2022-02-18 00:04:11
 */
function exec(action, args) {
    args = args || {};
    engines.execScript(getName(action), getName(action) + "(" + JSON.stringify(args) + ");\n" + action.toString());//声明为add({"a":1,"b":2});
}

function getName(func) {//获取函数名字符串
    let temp = func.toString();
    let reg = /function\s*(\w*)/i;//匹配函数名(\w*)
    let matches=reg.exec(temp);
    return matches[1];//0是整个字符串,1是第一个括号里的部分

}
//要执行的函数，是一个简单的加法
function add(args) {
    log(args.a + args.b);
    toast(args.a + args.b);
}

//在新的脚本环境中执行 1 + 2
exec(add, { a: 1, b: 2 });