/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-09 14:37:18
 * @LastEditTime: 2022-02-13 01:04:29
 */
//QQ点赞
toast("ready");
app.launchApp("QQ");
sleep(500);
let target=text("动态").findOnce();
if(target)
click(target.bounds().centerX(), target.bounds().centerY());
sleep(1000);
target=text("好友动态").findOnce();
if(target)
click(target.bounds().centerX(), target.bounds().centerY());
sleep(1000);//注意延时，否则会直接退出向上滑动
while (scrollUp()) {//回到列表顶点
    log("up");
}
let total = 0;
do {//先遍历查找后翻动，否  则会漏掉第一页
    sleep(500);//不sleep可能有的项会漏掉
    log("down");
    let collection = id("com.tencent.mobileqq:id/c7p").clickable().selected(false).find();//初步筛选,不能用untilFind，部分界面可能没有目标控件
    collection.forEach((term) => {
        if (term.bounds().left === 679)
            term.click();
    });
    total += collection.length;
}
while (scrollDown());
log("total number is :" + total); //打印总数,不支持反单引号
toast("done");
  
    