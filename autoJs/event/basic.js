/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-14 11:17:29
 * @LastEditTime: 2022-02-14 11:21:52
 */
auto();
events.setKeyInterceptionEnabled("volume_down",true);//屏蔽按键原功能
events.observeKey();//开启按键监听
events.onKeyDown("volume_down",function(event){toastLog("volume down");} );//按下执行监听函数