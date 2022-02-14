/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-12 15:32:28
 * @LastEditTime: 2022-02-12 17:36:04
 */
let w = floaty.window(//嵌入xml/view
    <frame gravity="center">
        <text id="text">悬浮文字</text>
    </frame>
);
setTimeout(() => {
    w.close();
}, 2000);
w.setPosition(800, 800);//会显示移动轨迹

w.setAdjustEnabled(true);//显示可供位置、大小调整的标示,默认false，rawWindow没有这个函数

// 因为脚本运行的线程不是UI线程，而所有对控件的修改操作需要在UI线程执行，此时需要用ui.run
ui.run(function () {
    w.text.setText("文本");//根据id访问
});

setTimeout(() => {
    w.close();
}, 2000);
// 与floaty.window()函数不同的是，该悬浮窗不会增加任何额外设施（例如调整大小、位置按钮），您可以根据自己需要编写任何布局。
w = floaty.rawWindow(
    <frame gravity="center" bg="#44ffcc00">
        <text id="text">悬浮文字</text>
    </frame>
);

//w.setPosition(500, 500);//直接显示
w.setSize(-1, -1);//-1是最大值，从悬浮窗原始坐标处向右下拓展
sleep(500);//直接获取会得到0
toast(w.getHeight());
//两种默认位置都是左上角
w.setTouchable(false);//如果为true, 则悬浮窗将接收到触摸、点击等事件并且无法继续传递到悬浮窗下面；如果为false, 悬浮窗上的触摸、点击等事件将被直接传递到悬浮窗下面。处于安全考虑，被悬浮窗接收的触摸事情无法再继续传递到下层。
//可以用此特性来制作护眼模式脚本。

setTimeout(() => {
    w.close();
}, 2000);//等价于sleep(2000);w.close();
//floaty.closeAll();//关闭所有
w.exitOnClose();//关闭时退出脚本
// let interval= setInterval(()=>{}, 1000);//使脚本持续开启以保持悬浮窗开启
// clearInterval(interval);//手动结束interval
toast("done");


