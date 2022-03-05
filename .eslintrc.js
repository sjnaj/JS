/*
 * @Author: fengsc
 * @Date: 2022-02-02 20:11:00
 * @LastEditTime: 2022-02-19 20:26:46
 */
module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        //0 = off, 1 = warn, 2 = error
        '@typescript-eslint/no-var-requires': 0,//允许Require statement not part of import statement
        'no-extra-parens': 1,//避免冗余的括号
        'camelcase': 1,//驼峰命名
        'semi': 1,
    },
    // "globals": {//添加全局函数,直接在文件声明跳过不允许undefine函数规则更方便
    //     "toast": true
    //   }
};
