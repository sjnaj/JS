/* eslint-disable no-cond-assign */
/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-10 23:23:36
 * @LastEditTime: 2022-02-14 12:10:28
 */
auto();
if (!device.isScreenOn()) {//开屏
    device.wakeUp();
    sleep(1000);
    swipe(device.width / 2, device.height - 200, device.width / 2, device.height / 2, 500);
    sleep(1000);
    let password = "020919".split('');
    password.forEach((num) => click(num));
}
sleep(2000);
app.launchApp("微信");
sleep(1000);
for (var parent = text("微信").findOne().parent(); parent.clickable() == false; parent = parent.parent());
parent.click();//点击下标微信栏
sleep(500);
let targetText = "北京邮电大学";
let target;
let prev, curr;

//不使用布局分析获取id
//toast(text("订阅号消息").findOnce().fullId());//任意一个初始界面可以看到的消息标题
do {
    curr = id("com.tencent.mm:id/fzg").findOne().text();//向上翻动阻塞时findOne找到的都是第一个元素，可以利用这个特性判断是否到达顶部
    // log(prev);
    // log(curr);
    if (prev !== curr)
        prev = curr;
    else break;

    sleep(200);//如果滑到下拉栏则再加一点延时
} while (scrollUp());//回到最上面(可选功能)

sleep(500);
while (!(target = text(targetText).findOnce()) && scrollDown()) {//下滑寻找
    sleep(200);
}
while (target.bounds().left)//找到所属框(左边界为0，确保包含消息红点)
    target = target.parent();

//处理侦测到但被边栏遮住的情况
let gap = 0;//多滑动的距离
if (target.bounds().top < 240) {//顶部被遮盖，数值根据指针轨迹或控件布局分析得到
    swipe(device.width / 2, device.height / 2, device.width / 2, device.height, 500);//下滑半屏,注意要从中间滑，否则会触发下拉栏
    gap = device.height / 2;
}
else {
    if (target.bounds.bottom > 2260) {//底部被遮盖
        swipe(device.width / 2, device.height / 2, device.width / 2, 0, 500);//上滑半屏
        gap = -device.height / 2;
    }
}

threads.start(function () {//自动获取截图权限
    let button = text("立即开始").findOne(1000);//文本不同机型可能有差异
    if (button)
        button.click();

});
if (!images.requestScreenCapture()) {
    toast("未取得截图权限");
    exit();
}
sleep(500);
let capture = images.captureScreen();
sleep(500)
let point = images.findColorInRegion(capture, "#fffa5151", target.bounds().left, target.bounds().top + gap, target.bounds().width(), target.bounds().height(), 4);//颜色会有微小变化
if (point) {
    //click(target.bounds().centerX(), target.bounds().centerY());//用这句替换点击point并取反if条件可以在没有红点的情况下填写
    click(point.x, point.y);

    sleep(500);
    let btn = text("A. 疫情防控通").findOnce();//注意文本空格
    if (btn)
        click(btn.bounds().centerX(), btn.bounds().centerY());
    else
        exit();//此页找不到疫情防控通
    sleep(500);
    for (btn = text("每日上报提醒").findOnce(); btn.clickable() == false; btn = btn.parent());
    btn.click();//点按的时长貌似不够，press不够通用

    //不能分析控件，用纯坐标点击

    sleep(5000);
    swipe(device.width / 2, device.height / 2 + 500, device.width / 2, 500, 1000);//从中间划第一次可能划不动
    sleep(500);
    press(device.width / 2, 1485, 200);
    press(device.width / 2, 1777, 200);
    swipe(device.width / 2, device.height / 2 + 500, device.width / 2, 500, 1000);
    sleep(500);
    press(device.width / 2, 1127, 200);
    sleep(3000);
    press(device.width / 2, 1825, 200);
    press(device.width / 2, 2285, 200);
    swipe(device.width / 2, device.height / 2 + 500, device.width / 2, 500, 1000);
    sleep(500);
    press(device.width / 2, 1825, 200);
    swipe(device.width / 2, device.height / 2 + 500, device.width / 2, 500, 1000);
    sleep(500);
    press(device.width / 2, 1400, 200);
    press(device.width / 2, 1905, 200);
    swipe(device.width / 2, device.height / 2 + 500, device.width / 2, 500, 1000);
    sleep(500);
    press(device.width / 2, 1117, 200);
    press(device.width / 2, 1890, 200);
    press(device.width / 2, 2335, 200);
    swipe(device.width / 2, device.height / 2 + 500, device.width / 2, 500, 1000);
    sleep(500);
    press(device.width / 2, 588, 200);
    press(device.width / 2, 1030, 200);
    press(device.width / 2, 1475, 200);
    press(device.width / 2, 1980, 200);
    swipe(device.width / 2, device.height / 2 + 500, device.width / 2, 500, 1000);
    press(device.width / 2, 1168, 200);
    press(device.width / 2, 1314, 200);
    press(device.width / 2, 1460, 200);
    press(device.width / 2, 2220, 200);
    sleep(2000);
    capture = images.captureScreen();
    //let point;这句声明会将作用域上面的point变为undefined
    if (point = images.findImage(capture, images.read("/sdcard/脚本/image/确认(Submit).png"))) {//用找色更简便
        click(point.x, point.y); toast("填写成功"); sleep(500);//确认按钮可以不用按

    }
    else {
        toast("填写失败"); exit();
    }
    sleep(500);
    back();
    sleep(500);
    back();
    sleep(500);
    back();
    sleep(500);
}
else
    toast("无需填写");
//back();
sleep(500);

// let itemCollections = [
//     {
//         text: "在校？",
//         location: (obj) => obj.parent().findOne(text("否")).bounds(),
//     },
//     {
//         text: "地点",
//         location: (obj) => obj.parent().findOne(text("中国大陆")).bounds(),
//     },
//     {
//         text: "位置信息)",
//         location: (obj) => obj.parent().findOne(className("android.widget.EditText")).bounds(),
//     }
// ];
// let obj;
// log(itemCollections);
// itemCollections.forEach((item) => {
//     scrollDown();
//     if (obj = textEndsWith(item.text).findOnce())
//         click(item.location(obj).centerX(), item.location(obj).centerY());
//     else scrollDown();
//     sleep(5000);
// });

//sleep(10000);

