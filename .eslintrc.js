module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        // "plugin:vue/essential", //默认是vue2的规则，参考eslint-plugin-vue插件官方介绍
        'plugin:vue/vue3-strongly-recommended',
        "standard"
    ],
    "parserOptions": {
        "ecmaVersion": 13,
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
    }
};
