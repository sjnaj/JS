/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-09 11:57:03
 * @LastEditTime: 2022-02-09 14:34:37
 */
//遍历微信通讯录
toast("ready");
app.launchApp("微信");
sleep(500);
for (var parent = id("com.tencent.mm:id/dub").text("通讯录").findOne().parent(); parent.clickable() == false; parent = parent.parent());
parent.click();
sleep(500);

while (scrollUp()) {//在通讯录中可以达到顶部，聊天列表会受下拉列表的影响而持续进行下滑操作
    log("up");
}

let total = 0;
do {
    sleep(1000);
    log("down");
    let collection = id("com.tencent.mm:id/ft6").find(); //需要用fullId
    collection.forEach((term) => {
        log(term.text());
        // click(term.text());//点击并返回，注意sleep
        // sleep(1000);
        // back();
        // sleep(1000);
    });
    total += collection.length;

}
while (scrollDown());//通讯录用控件滑动不了，各种列表都可以通过它到达底部停止
log("total number is :" + total); //打印总数
toast("total number is :" + total);

//log(collection.findOne(text("爸爸")).className());//在集合元素及其后代控件中查找
toast("done");
