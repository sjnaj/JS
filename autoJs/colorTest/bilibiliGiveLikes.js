/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-12 19:47:31
 * @LastEditTime: 2022-02-12 20:45:27
 */
sleep(500);
let count = 0;//单个视频评论点赞数
let likeBtns
let likeNumber = +rawInput("每个视频评论点赞数", "10");
if (isNaN(likeNumber)) {
    toast("Invalid Number");
    exit();
}
threads.start(function () {//自动获取截图权限
    let button = text("立即开始").findOne();//文本不同机型可能有差异
    if (button)
        button.click();

});
if (!images.requestScreenCapture()) {
    toast("未取得截图权限");
    exit();
}
//engines.execScriptFile("requestCapture.js");//路径是相对于本地的,这样调用本文件依然没有权限
//sleep(10000);
//log(images.captureScreen())
let img;
do {
    sleep(500);
    likeBtns = className("android.widget.TextView").id("action1").find();
    if (likeBtns.empty()) break;//无评论退出
    img = captureScreen();
    while (likeBtns[0].bounds().top < 850)//上栏遮住图标,已被访问可以抛出
        likeBtns.shift();
    while (likeBtns[likeBtns.length - 1].bounds().bottom > 2250)//下栏遮住图标，下次访问，暂且抛出
        likeBtns.pop();
    likeBtns.forEach(btn => {
        if (count >= likeNumber)//限制数量
            return;
        if (!images.findColorEquals(img, "#ffff6699", btn.bounds().left, btn.bounds().top, btn.bounds().width(), btn.bounds().height())) {
            click(btn.bounds().centerX(), btn.bounds().centerY());//评论点赞
            sleep(500);
            log(++count);
        }
    });
    if (count >= likeNumber)//两处都要有
        break;
    if (text("╮(╯3╰)╭再怎么找也没有啦").findOnce())//到底退出
        break;
} while (swipe(device.width / 2, device.height / 2, device.width / 2, 0, 500) && press(device.width / 2, device.height / 2, 200));
//半屏,press急停