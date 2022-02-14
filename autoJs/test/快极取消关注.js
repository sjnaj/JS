/* eslint-disable no-extra-parens */
/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-13 22:42:33
 * @LastEditTime: 2022-02-14 01:32:33
 */
auto();
let maxCount;
do {
    maxCount = +rawInput("请输入要取关的个数，上键退出");
} while ((isNaN(maxCount) || maxCount < 1) && toastLog("无效输入") === undefined);
toast("ready");
app.launchApp("快手极速版");
let btn;
btn = desc("我").findOne(3000);
if (btn)
    btn.click();
btn = text("关注").findOne(1000).parent();
if (btn)
    btn.click();
sleep(500);
while ((maxCount--) && (btn = desc("更多").findOne(1000))) {
    btn.click();
    btn = text("取消关注").findOne(1000).parent();
    if (btn)
        btn.click();
    btn = text("取消关注").findOne(1000).parent();//再次确认
    if (btn)
        btn.click();
}
back();
sleep(500);
back();
sleep(500);
