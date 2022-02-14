/* eslint-disable no-undef */
/*
 * @Author: fengsc
 * @Date: 2022-02-09 17:38:00
 * @LastEditTime: 2022-02-09 18:37:59
 */
// COLOR的定义是采用ARGB的方式，以int型数字来表示。
// Color.argb((int) 255, 32, 40, 50)
// Alpha 是透明度，范围： 0——255，位于int的高8位；（0是完全透明，255是完全不透明）
// RED 是红，范围： 0——255，位于int的8-16位；
// Green 是绿，范围： 0——255，位于int的16-24位；
// Blue 是透明度，范围： 0——255，位于int的低8位
log(255<<24|0<<16|0<<8|50);//-16777166

log(colors.toString(-16777166));//"#ff000032"=oxff0000032
log(colors.parseColor("#ff000032"));//-16777166
log(colors.blue(-16777166));//50
log(colors.alpha(0xff000032));//255
log(colors.red("#ff000032"));//0
log(colors.argb(255,0,0,50));//-16777166


log(colors.isSimilar(colors.RED,colors.BLUE));//false 默认为4，越小越严格
log(colors.isSimilar(colors.RED,colors.BLUE,255));//true
log(colors.equals(colors.RED,colors.RED));//true
