/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-08 22:01:57
 * @LastEditTime: 2022-02-09 14:19:49
 */
app.launchApp("微信");
//log(text("发现").findOne().parent());//在console打印父控件的内容
for (var parent = text("发现").findOne().parent(); parent.clickable() == false; parent = parent.parent());
console.log(parent);//打印查找到的可点击控件