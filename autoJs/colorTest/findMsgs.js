/* eslint-disable no-cond-assign */
/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-10 19:39:08
 * @LastEditTime: 2022-02-12 14:11:47
 */
//查看微信聊天特定栏目是否有消息，有的话点击

let targetText = rawInput("要查找的消息名(可以填写包含的关键词)", "");
if (!targetText) {
    toast("无输入");
    exit();
}
toast("ready");
app.launchApp("微信");
sleep(500);
for (var parent = text("微信").findOne().parent(); parent.clickable() == false; parent = parent.parent());
parent.click();//点击下标微信栏
sleep(500);
//log(text("外卖天天点").findOne());//找出含有此文本的控件以获取id
threads.start(function () {//自动获取截图权限
    let button = text("立即开始").findOne(1000);
    if (button)
        button.click();

});
if (!images.requestScreenCapture()) {
    toast("未取得截图权限");
    exit();
}
sleep(500);
let target;
let prevText, currText, prevTop;
do {
    sleep(500);//等待使画面稳定，便于判定
    target = id("com.tencent.mm:id/fzg").findOne();//同一页面的findOne总是同一个元素
    currText = target.text();
    log(currText);
    log(prevText);
    log(target.bounds().top);
    log(prevTop);
    if (prevText !== currText || target.bounds().top !== prevTop) {//文本不同或位置不同，位置可以加一些小的误差
        prevText = currText; prevTop = target.bounds().top;
    }
    else //到顶
        break;

} while (scrollUp());//回到最上面

sleep(500);
do {
    sleep(500);
    if (target = id("com.tencent.mm:id/fzg").textContains(targetText).findOnce()) {
        sleep(500);
        let text = target.text();//暂存text
        while (target.bounds().left)//找到所属框(左边界为0，确保包含消息红点)
            target = target.parent();
        let gap = 0;//多滑动的距离
        if (target.bounds().top < 240) {//顶部被遮盖
            swipe(device.width / 2, device.height / 2, device.width / 2, device.height, 500);//下滑半屏,注意要从中间滑，否则会触发下拉栏
            press(device.width / 2, device.height / 2, 200);//急停
            gap = device.height / 2;
        }
        else {
            if (target.bounds.bottom > 2260) {//底部被遮盖
                swipe(device.width / 2, device.height / 2, device.width / 2, 0, 500);//上滑半屏
                press(device.width / 2, device.height / 2, 200);
                gap = -device.height / 2;
            }
        }
        let capture = images.captureScreen();
        let point = images.findColorInRegion(capture, "#fffa5f5f", target.bounds().left, target.bounds().top + gap, target.bounds().width(), target.bounds().height(), 10);
        //注意查找红色时要关闭指针位置，指针痕迹是红色的,使用较精确颜色可以避免
        //先设置为较大threshold初步确定point以获取精确颜色,但这个颜色可能会有微小的改变
        //相当于
        // images.findColor(img, color, {
        //     region: [x, y, width, height],
        //     threshold: threshold
        // });
        log(point);
        if (point) {
            toast(text + "有新消息");
            sleep(500);
            click(point.x, point.y);
            sleep(500);
            back();

            //log(colors.toString(capture.pixel(point.x,point.y)));//确定精确颜色值，消息红点颜色为#fffa5f5f
        }
        else {
            toast(text + "没有新消息");
        }
    }
}
while (scrollDown());//下滑寻找
toast("Done");

// images.findMultiColors(img, firstColor, colors[, options])；
// 对于代码images.findMultiColors(img, "#123456", [[10, 20, "#ffffff"], [30, 40, "#000000"]])，假设图片在(100, 200)的位置的颜色为#123456, 这时如果(110, 220)的位置的颜色为#fffff且(130, 240)的位置的颜色为#000000，则函数返回点(100, 200)。
// 整张图片都找不到时返回null
//options中指定region和threhold

