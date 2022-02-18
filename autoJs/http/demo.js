/*
 * @Author: fengsc
 * @Date: 2022-02-16 00:46:52
 * @LastEditTime: 2022-02-16 14:21:41
 */
let sh = new Shell();
//强制停止微信
sh.exec("am force-stop com.tencent.mm");
sh.exit();