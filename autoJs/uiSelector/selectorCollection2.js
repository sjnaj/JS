/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-09 13:38:02
 * @LastEditTime: 2022-02-10 20:29:15
 */
toast("ready");
app.launchApp("微信");
for (var parent = id("com.tencent.mm:id/dub").text("微信").findOne().parent(); parent.clickable() == false; parent = parent.parent());
parent.click();
sleep(500);
//遍历微信消息列表
let prev, curr;
//log(text("外卖天天点").findOne());//找出含有此文本的控件以获取id

do {
    log("up");
    curr = id("com.tencent.mm:id/fzg").findOne().text();//向上翻动阻塞时findOne找到的都是第一个元素，可以利用这个特性判断是否到达顶部
    if (prev !== curr)
        prev = curr;
    else break;
} while (scrollUp());//回到最上面

let total = 0;
do {//先遍历查找后翻动，否则会漏掉第一页
    sleep(500);//不sleep可能有的项会漏掉
    log("down");
    let collection = id("com.tencent.mm:id/fzg").find();
    collection.forEach((term) => {
        log(term.text());
        // click(term.text());//点击并返回，注意sleep
        // sleep(1000);
        // back();
        // sleep(1000);
    });
    total += collection.length;
}
while (scrollDown());
log("total number is :" + total); //打印总数,不支持反单引号
toast("total number is :" + total); 
