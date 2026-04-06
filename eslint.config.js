import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], 
    plugins: { js }, 
    extends: ["js/recommended"], languageOptions: { globals: { ...globals.browser, ...globals.node } } 
  },
  {
    ignores:["**/node_modules/**", "**/dist/**", "**/public/**"]
  },
  // js推荐规则
  js.configs.recommended,
  // ts推荐规则
  tseslint.configs.recommended,
  // Vue基础规则
  pluginVue.configs["flat/essential"],
  // Vue文件的TS解析器配置
  { 
    files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } 
    } 
  },
  // Prettier配置
  prettierConfig,
  {
/*
"off" 或 0：关闭规则
"warn" 或 1：警告（黄色波浪线）
"error" 或 2：报错（红色波浪线）
*/
    rules: {
      // ---------- ESLint 核心规则 ----------
      // 要求使用 let 或 const，禁止使用 var
      'no-var': 'error',
      
      // 不允许多个空行，最多连续 1 个空行
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      
      // 生产环境禁用 console，开发环境允许
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      
      // 生产环境禁用 debugger，开发环境允许
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      
      // 禁止空余的多行（不应该出现的多行）
      'no-unexpected-multiline': 'error',
      
      // 禁止不必要的转义字符
      'no-useless-escape': 'off',
      
      // ---------- TypeScript 规则 ----------
      // 禁止定义未使用的变量
      '@typescript-eslint/no-unused-vars': 'error',
      
      // 禁止使用 @ts-ignore，推荐使用 @ts-expect-error
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      
      // 禁止使用 any 类型（教程里是 off，你可以根据需求改）
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // 禁止使用非空断言 (!)
      '@typescript-eslint/no-non-null-assertion': 'off',
      
      // 禁止使用自定义 TypeScript 模块和命名空间
      '@typescript-eslint/no-namespace': 'off',
      
      // 分号规则（交给 Prettier 处理，所以关闭）
      '@typescript-eslint/semi': 'off',
      
      // ---------- Vue 规则 ----------
      // 要求组件名称始终为多词（如 MyComponent），关闭此规则
      'vue/multi-word-component-names': 'off',
      
      // 不允许修改组件接收的 prop
      'vue/no-mutating-props': 'off',
      
      // 对模板中的自定义组件强制执行属性命名样式（关闭）
      'vue/attribute-hyphenation': 'off',
    },
  },
]);
