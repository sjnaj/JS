/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-13 20:11:18
 * @LastEditTime: 2022-02-14 09:24:27
 */
auto();//确认无障碍服务开启
let maxCount;
let count = 0;
do {
    maxCount = +rawInput("请输入要刷视频的个数，上键退出");
} while ((isNaN(maxCount) || maxCount < 1) && toastLog("无效输入") === undefined);
app.launchApp("快手极速版");
toastLog("ready");
sleep(500);
let btn = text("首页").findOne(3000);
if (btn)
    click(btn.bounds().centerX(), btn.bounds().centerY());
else {
    toastLog("Unexpected end");
    exit();
}
console.show();//开启终端
sleep(3000);
do {
    sleep(500);
    if (count % 5 == 1) {//上滑并发表评论
        swipe(device.width / 2, device.height / 2, device.width / 2, device.height, 300);
        btn = id("com.kuaishou.nebula:id/comment_button").findOne(1000);
        if (btn) {
            btn.click();
            btn = id("com.kuaishou.nebula:id/editor_holder_text").findOne(1000);
            if (btn) {
                btn.click();
                sleep(1000);
                btn = id("com.kuaishou.nebula:id/editor").findOne(3000);
                if (btn) { 
                btn.setText("测试");
                text("发送").findOne(3000).click();
                sleep(2000);
                back();//返回视频界面
                sleep(500);
            }
        }
    }
}
    if (count % 3 == 0) {//双击点赞 
    press(device.width / 2, device.height / 2 + 200, 100);//靠上会被终端挡住，中间会点到暂停
    sleep(50);
    press(device.width / 2, device.height / 2 + 200, 100);
    btn = id("com.kuaishou.nebula:id/user_name_text_view").findOne(1000);
    if (btn)
        log("已点赞" + btn.text() + "的视频");

}
if (count % 10 == 0)//关注
{
    btn = id("com.kuaishou.nebula:id/slide_play_right_follow_button").findOne(1000);//已关注的没有这个id的按钮
    if (btn) {
        btn.click();
        btn = id("com.kuaishou.nebula:id/user_name_text_view").findOne(1000);
        if (btn);
        log("已关注" + btn.text());
    }
    sleep(500);
}
sleep(random(2000, 6000));//观看时间
log("已刷" + ++count + "个视频");
} while (swipe(device.width / 2, device.height / 2, device.width / 2, 0, 300) && count < maxCount);
//返回退出
back();
sleep(500);
back();
sleep(500);
console.hide();//隐藏终端
toastLog("done");
