/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-15 13:56:18
 * @LastEditTime: 2022-02-15 21:29:47
 */
let data = files.readBytes("/sdcard/脚本/music/玩泥巴.mp3");
files.writeBytes("/sdcard/脚本/music/玩泥巴copy.mp3", data);//mp3转为字节文本
files.appendBytes("/sdcard/脚本/music/玩泥巴.txt", data);