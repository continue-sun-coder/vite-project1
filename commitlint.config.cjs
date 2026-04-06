module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复 bug
        'docs',     // 文档
        'style',    // 代码格式
        'refactor', // 重构
        'perf',     // 性能优化
        'test',     // 测试
        'chore',    // 构建/工具
        'revert',   // 回滚
        'build',    // 构建系统
        'ci',       // CI 配置
      ],
    ],
    'type-case': [0],              // 不限制 type 大小写
    'type-empty': [0],             // 不限制 type 是否为空
    'scope-empty': [0],            // 允许不写 scope
    'scope-case': [0],             // 不限制 scope 大小写
    'subject-full-stop': [0],      // 不限制结尾句号
    'subject-case': [0],           // 不限制 subject 大小写
    'header-max-length': [2, 'always', 100],  // 改成 2（error）或保持 0（off）
  },
}