/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-11 01:46:59
 * @LastEditTime: 2022-02-12 13:06:09
 */

images.requestScreenCapture();
sleep(1000);
let capture = captureScreen();
sleep(500);
images.clip(capture,560,1320,815-560,1460-1320).saveTo("/sdcard/脚本/image/确认(Submit).png");
app.viewFile("/sdcard/脚本/image/确认(Submit).png")
// if (images.findImageInRegion(capture, images.read("/sdcard/脚本/image/确认.png"), 560, 1320, 815 - 560, 1460 - 1320))
//     toast("填写成功");// let count = 0;//单个视频评论点赞数
// let likeBtns;
// let img;
// let likeNumber = 20;
// do {
//     sleep(500);
//     likeBtns = className("android.widget.TextView").id("action1").find();
//     if (likeBtns.empty()) break;//无评论退出
//     img = captureScreen();
//     while (likeBtns[0].bounds().top < 850)//上栏遮住图标,已被访问可以抛出
//         likeBtns.shift();
//     while (likeBtns[likeBtns.length - 1].bounds().bottom > 2250)//下栏遮住图标，下次访问，暂且抛出
//         likeBtns.pop();
//     likeBtns.forEach(btn => {
//         if (count >= likeNumber)//限制数量
//             return;
//         if (!images.findColorEquals(img, "#ffff6699", btn.bounds().left, btn.bounds().top, btn.bounds().width(), btn.bounds().height())) {
//             click(btn.bounds().centerX(), btn.bounds().centerY());//评论点赞
//             sleep(500);
//             log(++count);
//         }
//     });
//     if (count >= likeNumber)//两处都要有
//         break;

//     if (text("╮(╯3╰)╭再怎么找也没有啦").findOnce())
//         break;
// } while (swipe(device.width / 2, device.height / 2, device.width / 2, 0, 500) && press(device.width / 2, device.height / 2, 200));
// let itemCollection = className("android.widget.TextView").id("com.bilibili.app.in:id/title").depth(18).find();
// log(itemCollection)
// scrollDown();
// itemCollection = className("android.widget.TextView").id("com.bilibili.app.in:id/title").depth(18).find();
// log(itemCollection)
// images.requestScreenCapture();

// let target = id("frame1").findOnce() || id("praise_layout").findOnce();//寻找视频或剧集的点赞按钮
// log(target);
// if (target) {//点赞
//     let img = captureScreen();
//     if (!images.findColorEquals(img, "#ffff6699", target.bounds().left, target.bounds().top, target.bounds().width(), target.bounds().height())) {
//         click(target.bounds().centerX(), target.bounds().centerY());//视频点赞
//         sleep(500);
//     }
// }


// sleep(500);
// let capture = images.captureScreen();
// sleep(500);
// log(colors.toString(capture.pixel(140,1780)));
// images.clip(capture, 425, 1390, 655 - 425, 1530 - 1390).saveTo("/sdcard/脚本/image/确认.png");
// if (images.findImageInRegion(capture, images.read("/sdcard/脚本/image/确认.png"), 425, 1390, 655 - 425, 1530 - 1390))
//     toast("填写成功");
// else toast("填写失败");






