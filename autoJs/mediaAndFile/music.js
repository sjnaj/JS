/* eslint-disable no-constant-condition */
/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-15 13:56:18
 * @LastEditTime: 2022-02-15 21:29:15
 */
auto();//不分析控件时或按键操作(back等)时可以不用无障碍服务
function downLoadBytes(url, path) {
    try {

        let request = http.get(url); //开始请求
        log('请求状态码Code:', request.statusCode); //请求状态码
        let zipFile = request.body.bytes(); //这里下载的是二进制数据 
        if (zipFile) {
            //将请求成功的文件写入手机路径
            files.createWithDirs(path)  //开始创建文件
            log("创建好的文件路径path:", path)//输出创建好的文件路径
            files.writeBytes(path, zipFile)//把下载好的二进制数据写入文件中
            // var r = 解压zip文件(path) //解压zip文件
        } else {
            console.error('下载失败');
            exit();
        }
    } catch (err) {
        console.error(err);  //抛出异常
        exit();  //退出
    }
}
function getName(func) {//获取函数名字符串
    let temp = func.toString();
    let reg = /function\s*(\w*)/i;//匹配函数名(\w*)
    let matches = reg.exec(temp);
    return matches[1];//0是整个字符串,1是第一个括号里的部分

}
function exec(action, arg1, arg2) {
    engines.execScript(getName(action), getName(action) + "(" + JSON.stringify(arg1) + ',' + JSON.stringify(arg2) + ");\n" + action.toString());
}
exec(downLoadBytes, "https://www.xzmp3.com/down/37016f704845.mp3", "/sdcard/脚本/music/玩泥巴.mp3");
// let btn = desc("更多选项").findOne(3000);//使音量上键失效
// if (btn) btn.click();
// text("设置").waitFor();
// click("设置");
// text("开启").waitFor();
// click("开启",0);
// sleep(500);
while (engines.all().length > 1) {
    sleep(100);
}
threads.start(function () {
    while (true) {
        device.setMusicVolume(10);//音量开到最大
        // events.setKeyInterceptionEnabled(true);//相同效果 屏蔽所有实体按键(只有音量下键，还能关闭音量上键但上键会终止程序)
        back();
    }
});
while (true) {
    media.playMusic("/sdcard/脚本/music/玩泥巴.mp3");
    sleep(media.getMusicDuration());
}