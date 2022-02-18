/*
 * @Author: fengsc
 * @Date: 2022-02-18 22:07:35
 * @LastEditTime: 2022-02-18 22:40:05
 */
//let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...);
//由于某些历史原因，支持传入代码字符串，但是不建议这样做。
function sayHi(phrase, who) {
    console.log(phrase + ', ' + who);
}

setTimeout(sayHi, 1000, "Hello", "John"); // Hello, John
// let timerId = setTimeout(...);
// clearTimeout(timerId);//*我们对一个函数进行了调度，紧接着取消了这次调度（中途反悔了）

// 每 2 秒重复一次
let timerId = setInterval(() => console.log('tick'), 2000);

// 5 秒之后停止
setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 5000);

{
    /** instead of:
let timerId = setInterval(() => alert('tick'), 2000);
*/
    // let timerId = setTimeout(function tick() {
    //     console.log('tick');
    //     timerId = setTimeout(tick, 2000); // (*)
    // }, 2000);
    //*嵌套的 setTimeout 要比 setInterval 灵活得多。采用这种方式可以根据当前执行结果来调度下一次调用，因此下一次调用可以与当前这一次不同。

    //实现一个服务（server），每间隔 5 秒向服务器发送一个数据请求，但如果服务器过载了，那么就要降低请求频率，比如将间隔增加到 10、20、40 秒等。
    //以下是伪代码：
    //     let delay = 5000;

    //     let timerId = setTimeout(function request() {
    //     ...发送请求...

    //       if (request failed due to server overload) {
    //         // 下一次执行的间隔是当前的 2 倍
    //         delay *= 2;
    //     }

    //     timerId = setTimeout(request, delay);

    // }, delay);
    // *使用 setInterval 时，func 函数的实际调用间隔要比代码中设定的时间间隔要短！

    // 这也是正常的，因为 func 的执行所花费的时间“消耗”了一部分间隔时间。

    // 也可能出现这种情况，就是 func 的执行所花费的时间比我们预期的时间更长，并且超出了 100 毫秒。

    // 在这种情况下，JavaScript 引擎会等待 func 执行完成，然后检查调度程序，如果时间到了，则 立即 再次执行它。



    // *嵌套的 setTimeout 就能确保延时的固定（这里是 100 毫秒）。

    // 这是因为下一次调用是在前一次调用完成时再调度的。

}

//当一个函数传入 setInterval/setTimeout 时，将为其创建一个内部引用，并保存在调度程序中。
//这样，即使这个函数没有其他引用，也能防止垃圾回收器（GC）将其回收。
{
    setTimeout(() => console.log("World"));

    console.log("Hello");
    //Hello world
    //第一行代码“将调用安排到日程（calendar）0 毫秒处”。但是调度程序只有在当前脚本执行完毕时才会去“检查日程”，所以先输出 "Hello"，然后才输出 "World"。
    //在浏览器环境下，嵌套定时器的运行频率是受限制的。根据 HTML5 标准 所讲：“经过 5 重嵌套定时器之后，时间间隔被强制设定为至少 4 毫秒”。
    let start = Date.now();
    let times = [];

    setTimeout(function run() {
        times.push(Date.now() - start); // 保存前一个调用的延时

        if (start + 100 < Date.now()) console.log(times); // 100 毫秒之后，显示延时信息
        else setTimeout(run); // 否则重新调度
    });
    //Nodejs下是一到两毫秒

// *所有的调度方法都不能 保证 确切的延时。

//     例如，浏览器内的计时器可能由于许多原因而变慢：

//     CPU 过载。
//     浏览器页签处于后台模式。
//     笔记本电脑用的是电池供电（译注：使用电池供电会以降低性能为代价提升续航）。

}
