/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-12 00:02:12
 * @LastEditTime: 2022-02-12 01:04:30
 */
app.uninstall("com.tencent.mobileqq");//卸载函数失效
app.openAppSetting(app.getPackageName("QQ"));//可以打开设置或长按找到卸载选项
app.startActivity("settings");//打开autojs设置，console打开log
app.openUrl("https://hyb1996.github.io/AutoJs-Docs/#/app?id=appopenurlurl");


