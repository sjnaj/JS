/* eslint-disable no-inner-declarations */
/*
 * @Author: fengsc
 * @Date: 2022-02-17 20:23:24
 * @LastEditTime: 2022-02-17 22:07:03
 */
let now = new Date();
console.log(now);//在浏览器中显示为当前时间,Nodejs为世界时间
console.log(now.toLocaleString());//在nodejs中可正确显示当前时间
// 0 表示 01.01.1970 UTC+0
let Jan011970 = new Date(0);
console.log(Jan011970);

// 现在增加 24 小时，得到 02.01.1970 UTC+0
let Jan021970 = new Date(24 * 3600 * 1000);
console.log(Jan021970);
//传入的整数参数代表的是自 1970-01-01 00:00:00 以来经过的毫秒数，该整数被称为 时间戳。
let date = new Date("2017-01-26");//被自动解析
console.log(date); //2017-01-26T00:00:00.000Z
{
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    console.log(date); // 1.01.2011, 02:03:04.567
}
{
    //     从 Date 对象中访问年、月等信息有多种方式：

    // getFullYear()
    //     获取年份（4 位数）
    // getMonth()
    //*     获取月份，从 0 到 11。(创建date对象时是从1到12)
    // getDate()
    //*     获取当月的具体日期，从 1 到 31，这个方法名称可能看起来有些令人疑惑。
    // getHours()，getMinutes()，getSeconds()，getMilliseconds()
    //     获取相应的时间组件。
    // 也有与当地时区的 UTC 对应项，它们会返回基于 UTC+0 时区的日、月、年等：getUTCFullYear()，getUTCMonth()，getUTCDay()。只需要在 "get" 之后插入 "UTC" 即可。
    // getDay() 
    // 0代表星期日
    //     getTime()

    //     返回日期的时间戳 —— 从 1970-1-1 00:00:00 UTC+0 开始到现在所经过的毫秒数。
    // getTimezoneOffset()

    //     返回 UTC 与本地时区之间的时差，以分钟为单位：
    console.log(new Date().getTimezoneOffset());//-480

}
{
    //     下列方法可以设置日期 / 时间组件：

    //     setFullYear(year, [month], [date])
    //     setMonth(month, [date])
    //     setDate(date)
    //     setHours(hour, [min], [sec], [ms])
    //     setMinutes(min, [sec], [ms])
    //     setSeconds(sec, [ms])
    //     setMilliseconds(ms)
    //     setTime(milliseconds)（使用自 1970 - 01 - 01 00: 00: 00 UTC + 0 以来的毫秒数来设置整个日期）

    // 以上方法除了 setTime() 都有 UTC 变体，例如：setUTCHours()。
    let today = new Date();

    today.setHours(0);
    console.log(today); // 日期依然是今天，但是小时数被改为了 0

    today.setHours(0, 0, 0, 0);
    console.log(today); // 日期依然是今天，时间为 00:00:00。

}
{
    // 自动校准 是 Date 对象的一个非常方便的特性。我们可以设置超范围的数值，它会自动校准。
    let date = new Date(2016, 0, 32);//
    console.log(date); // 1 Mar 2016 Nodejs中为2016-01-31T16:00:00.000Z
    {
        let date = new Date();
        date.setSeconds(date.getSeconds() + 70);
        console.log(date); // 显示正确的日期信息
    }
}
{//差值
    let date = new Date();
    console.log(+date); // 以毫秒为单位的数值，与使用 date.getTime() 的结果相同

    //     如果我们仅仅想要测量时间间隔，我们不需要 Date 对象。

    // 有一个特殊的方法 Date.now()，它会返回当前的时间戳。

    // *它相当于 new Date().getTime()，但它不会创建中间的 Date 对象。因此它更快，而且不会对垃圾处理造成额外的压力。
    //     这种方法很多时候因为方便，又或是因性能方面的考虑而被采用，例如使用 JavaScript 编写游戏或其他的特殊应用场景。

    let start = Date.now(); // 开始测量时间

    // do the job
    for (let i = 0; i < 100000; i++) {
        let doSomething = i * i * i;
    }

    let end = Date.now(); // 结束测量时间

    console.log(`The loop took ${end - start} ms`);


}
{
    //字符串的格式应该为：YYYY-MM-DDTHH:mm:ss.sssZ，其中：可选字符 'Z' 为 +-hh:mm 格式的时区。单个字符 Z 代表 UTC+0 时区。
    //+08:00为北京时区,
    let ms = Date.parse('2012-01-26T13:51:50.417+08:00');//prase的结果与时区无关

    console.log(ms); // 1327611110417  (时间戳)

    let date = new Date(Date.parse('2012-01-26T13:51:50.417+08:00'));

    console.log(date);
}
{//高精度
    // alert(`Loading started ${performance.now()}ms ago`);
    // 类似于 "Loading started 34731.26000000001ms ago"
    // .26 表示的是微秒（260 微秒）
    // 小数点后超过 3 位的数字是精度错误，只有前三位数字是正确的
    // Node.js 有 microtime 模块以及其他方法。从技术上讲，几乎所有的设备和环境都允许获取更高精度的数值，只是不是通过 Date 对象。
    var microtime = require('microtime');
    console.log(microtime.now())
}
{
    function getDateAgo(date, days) {//不修改参数对象
        let dateCopy = new Date(date);

        dateCopy.setDate(date.getDate() - days);
        return dateCopy.getDate();
    }

    let date = new Date(2015, 0, 2);

    console.log(getDateAgo(date, 1)); // 1, (1 Jan 2015)
}