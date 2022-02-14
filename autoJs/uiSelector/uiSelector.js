/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-08 12:05:45
 * @LastEditTime: 2022-02-09 11:26:47
 */
app.launchApp("微信");
sleep(1000);
// let loc1=id("dub").className("android.widget.TextView").text("微信").findOne().bounds();
// click(loc1.certerX,loc1.certerY);
id("di5").className("android.widget.RelativeLayout").clickable(true).findOne().click();//注意去除selected=true
//click(103, 2352, 167, 2388);//点击底部微信图标
sleep(1000);

//id("dub").className("android.widget.TextView").text("我").findOne().click();//clickable属性是false则不能click
// if (!click("文件传输助手")) {//初始界面没有，开始查找
//     if (scrollUp(0)) {//初始不在顶部，先上滑寻找
//         while (!click("文件传输助手") && scrollUp(0) && sleep(1000));//滑动下右和上左会转换，有概率出错
//     }
//     if (!scrollUp(0)) {//到顶说明可能未点击，需要下划，点击之后也会不能下划退出循环
//         while (!click("文件传输助手") && scrollDown(0) && sleep(1000));
//     }
// }
classNameEndsWith("ListView").scrollable().findOne().scrollForward();//QQ,微信通用滑动屏幕

//className("ListView").scrollForward();//功能同scrollDown()（前提是可滚动）,QQ中className为AbsListView，微信中为ListView

//clickable属性为false时获取中心位置点击。添加随P机数防止被监测
let loc2 = id("fzg").className("android.view.View").text("北京邮电大学").findOne().bounds();
click(loc2.centerX()+random(-5,5), loc2.centerY()+random(-5,5));
sleep(1000);
toast("woc");
// setText("okk");
// let sendButton = text("发送");
// sendButton.findOne().click();
// console.error();

