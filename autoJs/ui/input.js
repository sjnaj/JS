/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-13 00:26:17
 * @LastEditTime: 2022-02-13 19:41:45
 */
"ui";
ui.layout(
    <vertical padding="16">
        <text gravity="center" textSize="20sp" textColor="black" text="账户信息" />
        <horizontal>
            <text text="姓名" />
            <input id="name" w="*" inputType="textPersonName" hint="John" />
        </horizontal>
        <horizontal>
            <text text="密码" />
            <input id="password" w="*" inputType="textPassword" />
        </horizontal>
        <text textSize="10sp" text="必须含有字母，数字和特殊字符，长度至少6位" />
        <horizontal>
            <text text="邮箱" />
            <input id="email" w="*" inputType="textPassword" hint="可选" />
        </horizontal>
        <img src="file:///sdcard/脚本/image/logo.png" />
        <button id="ok" text="确认" bg="#0000ff" />

    </vertical>
);
//textSizeHint选项失效,故密码的hint以文本形式显示
ui.ok.click(() => {
    let name = ui.name.getText().toString();//类型是object
    let password = ui.password.getText().toString();
    if (name === '') { toast("姓名为空，请重新输入"); return; }
    if (password === '') { toast("密码为空，请重新输入"); return; }
    if (password.length < 6) {
        toast("长度过短");
        return;
    }
    let reg1 = /\d+/;
    if (!reg1.test(password)) {
        toast("必须包含数字");
        return;
    }
    let reg2 = /[a-zA-Z]+/;
    if (!reg2.test(password)) {
        toast("必须包含字母");
        return;
    }
    let reg3 = /[.~#^$@%&!?%*]+/;
    if (!reg3.test(password)) {
        toast("必须包含特殊字符");
        return;
    }
    toast(name + "你好");

})