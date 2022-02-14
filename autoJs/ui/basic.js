/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-12 23:09:31
 * @LastEditTime: 2022-02-13 00:08:25
 */
"ui";
ui.layout(//JSX
    <vertical>

        <vertical>
            <button margin="20" text="第一个按钮" bg="#ff0000" />
            <button margin="10 20" text="第二个按钮" />
        </vertical>
        <horizontal>                    
            <button margin="10 20 30 40" id="third" text="第三个按钮" textSize="20sp" />
            <button w="200" h="100" padding="10 20 30 40" text="第四个按钮" />
        </horizontal>
        <frame w="*" h="*">
            <button  visibility="visible"  rotation="90" foreground="#550000ff" layout_gravity="center" w="auto" h="auto" text="第五个按钮"></button>
            <button bg="#00ff00" alpha="0.2" w="200" h="auto" gravity="right||bottom" layout_gravity="bottom||center" text="第六个按钮" />
        </frame>

    </vertical>
);
toast(ui.third.getText());
//margin:外边距 padding内边距
