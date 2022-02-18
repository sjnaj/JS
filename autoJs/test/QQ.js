/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-14 19:22:37
 * @LastEditTime: 2022-02-14 19:52:21
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
toastLog("ready");
let qq = +rawInput("要发送的目标QQ(空输入或异常输入将默认为2170412575)")||2170412575;
let text = rawInput("要发送的文本(空输入为'你好')")||"你好";
app.startActivity({
    action: "android.intent.action.VIEW",
    data: "mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=" + qq,
    packageName: "com.tencent.mobileqq",
});
let input = id("input").findOne(5000);
if (input) {
    input.setText(text);
    click("发送");
    sleep(500);
}
home();
toastLog("done");