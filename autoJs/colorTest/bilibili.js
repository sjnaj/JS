/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-11 14:46:22
 * @LastEditTime: 2022-02-12 20:28:47
 */
const videoNumber = +rawInput("要点赞的总视频数", "10");
const likeNumber = +rawInput("每个视频评论点赞数", "10");
//注意NaN的类型也是number
if (isNaN(videoNumber) ||isNaN(likeNumber) || videoNumber < 0 || likeNumber < 0) {
    toast("无效输入");
    exit();
}
toast("ready");
app.launchApp("bilibili");
sleep(1000);
let btn = text("首頁").findOnce();
if (btn)
    click(btn.bounds().centerX(), btn.bounds().centerY());
sleep(500);
btn = text("推薦").findOnce();
if (btn)
    press(btn.bounds().centerX(), btn.bounds().centerY(), 100);
sleep(500);

//下面部分可选
// while (scrollUp());//滑到最上，会向左滑，需要再次点击推荐
// sleep(500);
// click(btn.bounds().centerX(), btn.bounds().centerY());
// sleep(500);
threads.start(function () {//自动获取截图权限
    let button = text("立即开始").findOne();//文本不同机型可能有差异
    if (button)
        button.click();

});
if (!images.requestScreenCapture()) {
    toast("未取得截图权限");
    exit();
}
sleep(500);
let textArray = [];//无法用控件滑动，故用一个数组存储已访问的title
do {
    let itemCollection = className("android.widget.TextView").id("com.bilibili.app.in:id/title").depth(18).find();
    itemCollection.forEach(item => {
        if (textArray.indexOf(item.text()) != -1 || item.bounds().top > 2260)//已访问或按压不到，跳过
            return;//continue在foreach中的等价方法,Array的includes方法不支持
        textArray.push(item.text());//暂存即将访问的item的text
        log(item.text());
        log(item.bounds());
        click(item.bounds().centerX(), item.bounds().centerY());//点击视频
        sleep(1000);
        let target = id("frame1").findOnce() || id("praise_layout").findOnce();//寻找视频或剧集的点赞按钮
        if (target) {//点赞
            let img = captureScreen();
            if (!images.findColorEquals(img, "#ffff6699", target.bounds().left, target.bounds().top, target.bounds().width(), target.bounds().height())) {
                click(target.bounds().centerX(), target.bounds().centerY());//视频点赞
                sleep(2500);//点赞后特效占用时间
            }

            target = id("tab_title").text("评论").findOne();
            if (target) {//评论列表点赞部分
                press(target.bounds().centerX(), target.bounds().centerY(), 300);
                sleep(500);
                let count = 0;//单个视频评论点赞数
                let likeBtns;
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
                back();//返回视频列表主界面
            }
        }
        else back();//可能点到up主名字，返回
        sleep(500);

    });
    sleep(500);

} while (swipe(device.width / 2, device.height / 2, device.width / 2, device.height / 4, 500) && textArray.length <= videoNumber);
//每次滑动四分之一屏，限制视频数量
log(textArray);
toast("down");


