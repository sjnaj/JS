/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-12 01:05:32
 * @LastEditTime: 2022-02-12 01:05:33
 */
threads.start(function () {//选择通过邮件发送，选择时主线程阻塞
    let button = text("通过邮件发送").findOne();
    log(button);
    if (button)
        click(button.bounds().centerX(), button.bounds().centerY());
});
app.sendEmail({
    email: ["2471326731@qq.com"],
    subject: "这是一个邮件标题",
    text: "这是邮件正文",
    //attachment {string} 附件的路径。
});
text("发送​").findOne().click();//需要从autojs处或打包apk处开始运行才能正常发送，注意发送处的不可见字符，设法用log打印出来再复制