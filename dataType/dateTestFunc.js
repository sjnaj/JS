/*
 * @Author: fengsc
 * @Date: 2022-02-17 22:10:33
 * @LastEditTime: 2022-02-17 22:16:43
 */
// 写一个函数 formatDate(date)，能够对 date 进行如下格式化：

//     如果 date 距离现在不到 1 秒，输出 "right now"。
//     否则，如果 date 距离现在不到 1 分钟，输出 "n sec. ago"。
//     否则，如果不到 1 小时，输出 "m min. ago"。
//     否则，以 "DD.MM.YY HH:mm" 格式输出完整日期。即："day.month.year hours:minutes"，全部以两位数格式表示，例如：31.12.16 10:00。
function formatDate(date) {
    let dayOfMonth = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    //获取差值
    let diffMs = new Date() - date;
    let diffSec = Math.round(diffMs / 1000);
    let diffMin = diffSec / 60;
    let diffHour = diffMin / 60;

    // 格式化
    year = year.toString().slice(-2);
    month = month < 10 ? '0' + month : month;
    dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
    hour = hour < 10 ? '0' + hour : hour;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    if (diffSec < 1) {
        return 'right now';
    } else if (diffMin < 1) {
        return `${diffSec} sec. ago`
    } else if (diffHour < 1) {
        return `${diffMin} min. ago`
    } else {
        return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
    }
}
console.log(formatDate(new Date(new Date - 1))); // "right now"

console.log(formatDate(new Date(new Date - 30 * 1000))); // "30 sec. ago"

console.log(formatDate(new Date(new Date - 5 * 60 * 1000))); // "5 min. ago"

console.log(formatDate(new Date(new Date - 86400 * 1000)));//昨天的日期
