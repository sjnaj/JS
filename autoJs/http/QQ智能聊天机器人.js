/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-15 12:12:29
 * @LastEditTime: 2022-02-16 01:19:51
 */

//let url = "http://api.qingyunke.com/api.php";
// res = http.postJson(url, {//此网站不支持Json格式的请求
//     key: "free",
//     appid: "0",
//     msg: "你好"
// });
auto();
function reply(msg) {
    return http.get("http://api.qingyunke.com/api.php?key=free&appid=0&msg=" + msg).body.json().content;
}
function openView(QQ) {
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=" + QQ,
        packageName: "com.tencent.mobileqq",
    });
}
function sendMsg(text) {
    let input = id("input").findOne(5000);
    if (input) {
        input.setText(text);
        click("发送");
        sleep(500);
    }
}
let qq = +rawInput("要发送的目标QQ(空输入或异常输入将默认为2170412575)") || 2170412575;
openView(qq);
while (true) {
    let list = id("listView1").findOne();
    let latest = list.child(list.childCount() - 1).find(className("TextView"));
    if (!latest.length) continue;//最近的消息没有文本
    let latestText = latest.filter(item => item.bounds().left === 146);//可能会有一个时间文本控件，过滤之
    if (!latestText.length)//没有合适的文本
        continue;
    latestText = latestText[0];//暂存文本控件
    latest = list.child(list.childCount() - 1).find(className("ImageView"));
    let latestImg = latest.filter(item => item.bounds().right === 146)[0];//对应的头像控件，避免被发送的图片干扰
    if (latestImg) {//确认对方的文本和头像都存在
        sendMsg(reply(latestText.text()));
    }
}