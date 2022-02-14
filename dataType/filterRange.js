/*
 * @Author: fengsc
 * @Date: 2022-02-07 19:16:33
 * @LastEditTime: 2022-02-07 19:43:36
 */
"use strict";
function filterRange(arr, a, b) {
    return arr.filter(item => item >= a && item <= b);
}
let testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(filterRange(testArray, 2, 5));
function filterRangeInPlace(arr, a, b) {
    arr.forEach((item, index) => (item < a || item > b) && arr.splice(index, 1));
    //使用for循环要注意删除后index要减一
}
filterRangeInPlace(testArray,2,5);
console.log(testArray);
