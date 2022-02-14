/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-14 00:02:47
 * @LastEditTime: 2022-02-14 02:05:12
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
device.setMusicVolume(0);//静音
app.launchApp("Auto.js");//如果清了后台就要从autojs打开
sleep(2000);
toastLog("All Right");
threads.start(function () { sleep(1000); setText("100"); click("确定") });
engines.execScriptFile("/sdcard/脚本/快手极速版.js");
sleep(3000);//等待engines完全启动
log(engines.all());
while (engines.all().length > 1)
    sleep(1000);
log(engines.all());

threads.start(function () { sleep(1000); setText("10"); click("确定") });
engines.execScriptFile("/sdcard/脚本/快极取消关注.js");
sleep(3000);
while (engines.all().length > 1) sleep(1000);
engines.execScriptFile("/sdcard/脚本/快极广告.js");
toastLog("All Down");

