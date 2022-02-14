/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-12 17:37:14
 * @LastEditTime: 2022-02-12 22:44:05
 */
//第一个参数name与文件名称无关，只是在任务管理中显示的名称，显示name.js。
// engines.execScript("hello world", "toast('hello world')", {
//     loopTimes: 10,
//     interval: 3000,
//     //path {Array} | {string} 指定脚本运行的目录。这些路径会用于require时寻找模块文件。
// });
function helloWorld() {
    //注意，这里的变量和脚本主体的变量并不共享
    toast("hello world");
}
engines.execScript("hello world", "helloWorld();\n" + helloWorld.toString(),{//函数执行和函数定义组成的字符串
    loopTimes: 10,
    interval: 3000,
});

