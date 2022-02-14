/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-12 19:40:41
 * @LastEditTime: 2022-02-12 20:43:37
 */
engines.execScript("click", "clickFunc();\n" + clickFunc.toString(), 2000);//与新开线程等价

function clickFunc() {//自动获取截图权限
    let button = text("立即开始").findOne();//文本不同机型可能有差异
    if (button)
        button.click();
}

if (!images.requestScreenCapture()) {
    toast("未取得截图权限");
    exit();
}
