/* eslint-disable no-cond-assign */
/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-10 23:23:36
 * @LastEditTime: 2022-02-18 12:26:30
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
threads.start(function () {//自动获取截图权限
    let button = text("立即开始").findOne(1000);//文本不同机型可能有差异
    if (button)
        button.click();

});
if (!images.requestScreenCapture()) {
    toast("未取得截图权限");
    exit();
}
app.launchApp("Auto.js");//目标后台关闭情况下需要从autojs打开
sleep(2000);
app.launchApp("企业微信");
sleep(5000);
let target = text("A. 疫情防控通").findOne();
let capture = images.captureScreen();
sleep(500);
//查找消息红点
let point = images.findColorInRegion(capture, "#fff04a3e", target.bounds().left - 60, target.bounds().top, target.bounds().width(), target.bounds().height(), 4);//颜色会有微小变化，-60包围红点区域
if (point) {
    click("A. 疫情防控通");
    text("每日上报提醒").waitFor();
    click("每日上报提醒");
    textContains("每日上报").waitFor();
    sleep(500);
    toastLog("begin fill");
    sleep(1000);
    fill();
    toastLog("Done");
    sleep(1000);
}
else toastLog("no need to fill");
home();

function fill() {
    let items = ["在校？", "地点", "位置信息）", "实时查询）", "体温范围", "哪种情况？", "异常？",
        "确诊人群？", "密接人员？", "密切接触？", "观察期？", "确诊病例", "值得注意的情况？"];
    let target;
    items.forEach((item, index) => {
        target = textEndsWith(item).findOne();
        log(index);
        switch (index) {
            case 0:
            case 3:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
                target.parent().findOne(text("否")).parent().click();
                break;
            case 1:
                click("中国大陆");
                break;
            case 2:
                scrollDown();//位置信息需要在屏幕上才能点击成功
                sleep(1000);
                target = target.parent().findOne(classNameEndsWith("EditText")).bounds();//控件不能直接点击
                click(target.centerX(), target.centerY());
                while (textContains("地理位置").exists());//等待位置输入成功
                if (text("确定").findOne(1000)) {//可能显示获取失败，不影响结果
                    click("确定");
                    sleep(500);
                }
                break;
            case 4:
                target.parent().findOne(text("36.6℃-36.9℃")).parent().click();
                break;
            case 5:
                target.parent().findOne(text("正常")).parent().click();
                break;
            default:
                break;
        }
    });
    click("提交信息(Submit)");
    sleep(1000);
    textContains("确认").waitFor();
    click("确认\nSubmit") || click("确认\nConfirm");
    sleep(1000);
    text("确定").waitFor();
    click("确定");
    sleep(1000);
    //找图方式确认
    // capture = images.captureScreen();
    //     //let point;这句声明会将作用域上面的point变为undefined
    //     if (point = images.findImage(capture, images.read("/sdcard/脚本/image/确认(Submit).png"))) {//用找色更简便
    //         click(point.x, point.y); toast("填写成功"); sleep(500);//确认按钮可以不用按
}