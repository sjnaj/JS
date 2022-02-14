/* eslint-disable no-extra-parens */
/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-08 15:58:54
 * @LastEditTime: 2022-02-09 12:28:33
 */
toast("ready");
app.launchApp("QQ");
let target1, target2;
sleep(1000);
// if ((target1 = id("kbi").className("android.widget.TextView").text("动态").findOne(1000)))//1秒内找不到判定不在此界面，跳过
//     click(target1.bounds().centerX(), target1.bounds().centerY());
if ((target1 = id("kbi").className("android.widget.TextView").text("动态").findOnce()))//一次查找不到判定不在此界面，跳过
    click(target1.bounds().centerX(), target1.bounds().centerY());
sleep(1000);
if ((target2 = text("好友动态").findOnce()))
    click(target2.bounds().centerX(), target2.bounds().centerY());

//scrollDown();
classNameEndsWith("ListView").scrollable().untilFind()[0].scrollForward();//滑动找到的第一个元素，使用untilFind使速度尽可能快，但如果不存在就会阻塞
//id("recent_chat_list").className("AbsListView").findOne().scrollForward();
sleep(1000);
toast("ok");
