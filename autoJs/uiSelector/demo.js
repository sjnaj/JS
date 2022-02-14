/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-08 00:44:46
 * @LastEditTime: 2022-02-08 16:19:58
 */

// click("发现");
// sleep(1000); 
// click("朋友圈");
//scrollUp();//向上滑or向左滑
// sleep(1000)


 while(!longClick("课堂派")&&scrollDown());//下滑寻找课堂派聊天

sleep(1000);
click("不显示该聊天");//从文本处向其父视图寻找，直至发现一个可点击的部件为止,不一定是目标位置
sleep(1000);
click("不显示");
toast('lalalala');
setText("覆盖");//不加序号参数操作所有文本框
input("附加");

