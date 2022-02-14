/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-13 00:09:50
 * @LastEditTime: 2022-02-13 00:24:58
 */
"ui";
ui.layout(
    <frame>
        <vertical>
            <text gravity="center" textStyle="bold" textColor="red" textSize="18sp" text="标题" />
            <text id="myText" ellipsize="end" typeface="monospace" textStyle="italic" textColor="blue" line="2" maxLines="3" text="正文" />
            <text autoLink="web" text="百度: http://www.baidu.com" />
        </vertical>
    </frame>
);
ui.myText.setText("第一行\n第二行\n第三行\n第四行");