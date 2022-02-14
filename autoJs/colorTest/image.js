/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-09 20:32:42
 * @LastEditTime: 2022-02-10 21:21:03
 */

let img = images.load("https://th.bing.com/th/id/OIP.hBQQvbGPmWtRIEyAFcILJQHaJ7?w=203&h=273&c=7&r=0&o=5&dpr=2&pid=1.7");
images.save(img, "/sdcard/脚本/image/image1.png");//以png格式保存，图片质量为0~100的整数值，默认为100，格式默认png
img.saveTo("/sdcard/脚本/image/image1.jpeg");//源格式保存
app.viewFile("/sdcard/脚本/image/image1.png");
sleep(1000);
img = images.read("/sdcard/脚本/image/image1.jpeg");
log(img);
let img2 = images.copy(img);
log(img2);
log(img.getWidth());//406
log(img.getHeight());//546
log(img2.pixel(0, 0));//-11779007
log(colors.toString(img2.pixel(405, 545)));//#ffededef,必须小于边界
      
files.move("/sdcard/Pictures/WeiXin/QRcode.png", "/sdcard/脚本/image/QRcode.png");
img = images.read("/sdcard/脚本/image/QRcode.png");
app.viewFile("/sdcard/脚本/image/QRcode.png");
sleep(1000);

let base64 = images.toBase64(img);
//log(base64);//打印base64编码
let fromBase64 = images.fromBase64(base64);
log(fromBase64);
//log(files.exists("file:///android_asset/modules/__images__.js"));

var res = http.get("https://hyb1996.github.io/AutoJs-Docs/images/logo.png");
img = images.fromBytes(res.body.bytes());//以字节码形式获取返回的图片
img.saveTo("/sdcard/脚本/image/logo.png");
app.viewFile("/sdcard/脚本/image/logo.png");
sleep(1000);

let bytes = images.toBytes(img);
//log(bytes);//打印字节码

function getImage(x1, y1, x2, y2) {

    threads.start(function () {//开启新线程自动点击确认，注意要先开启线程，先请求权限会被阻塞
        let target = text("立即开始").findOne(1000);
        if (target)
            target.click();

    });
    if (!images.requestScreenCapture()) { //false为竖屏，默认自动
        toast("未取得截图权限");
        exit();
    }

    sleep(1000);//权限开启到可以开始截图需要几百毫秒
    let capture = images.captureScreen();//设备截图的更新需要一定的时间，短时间内（一般来说是16ms）连续调用则会返回同一张截图。
    //参数可为boolean或保存路径，为path时没有返回值
    return images.clip(capture, x1, y1, x2 - x1, y2 - y1);//参数为左上角（以坐标原点看，直观是左下角）横纵坐标以及宽度高度


}
app.launchApp("微信");
sleep(1000);
let bounds = text("微信").findOne().bounds();
//!注意坐标原点在左上角，所以bottom大于top,左上角为left，botton坐标字面是左上和右下，直观是左下和右上
img = getImage(bounds.left, bounds.top, bounds.right, bounds.bottom);//可以直接用宽度和高度参数，函数主要用于测量的坐标
img.saveTo("/sdcard/脚本/image/WeiXinLogo.png");
log(files.listDir("/sdcard/脚本/image"));
images.scale(img, 0.5, 0.5).saveTo("/sdcard/脚本/image/WeiXinLogoScaled.png");//缩放一半
img.recycle();//用完及时回收
img2.recycle();