/* eslint-disable no-extra-parens */
/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-13 23:34:18
 * @LastEditTime: 2022-02-14 10:07:07
 */
auto();
toastLog("ready");
app.launchApp("快手极速版");
let btn;
btn = desc("去赚钱").findOne(3000);
if (btn)
    btn.click();
sleep(5000);//有时刷新时间较长
btn = text("福利").findOne(3000);
if (!btn) {//网络不好
    while ((btn = textContains("重试").findOne(3000))) { btn.click(); sleep(1000); }
}
while (true) {
    btn = text("福利").findOne(3000);
    if (btn)
        btn.click();
    else break;//刷完结束
    sleep(30000);
    btn=null;//注意置空
    btn = text("放弃奖励").findOne(3000);
    if (btn)
        btn.click();
    else {
        btn = id("countdown_info_container").findOne(1000);
        if (btn)
            btn.click();
    }
    sleep(1000);
}
toastLog("done");
back();
sleep(500);
back();
