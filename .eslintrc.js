module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  ignorePatterns: [
    'dist',
    'node_modules',
    '.eslintrc.js',
    'vite.config.js',
    'postcss.config.js',
    'tailwind.config.js',
    'commitlint.config.cjs',
    'proxy',
    'server',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react', 'react-hooks', 'react-refresh', 'prettier'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/jsx-uses-react': 2,
    'react/prop-types': 0,
    'no-console': [
      //提交时不允许有console.log
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
    // 禁止不必要的转义字符
    'no-useless-escape': 'off',
    'no-debugger': 'warn', //提交时不允许有debugger
    //  禁止在函数中进行无意义的返回
    'no-useless-return': 'error',
    //  对于字符串拼接，限制只能使用字符串模板的方式 `hello ${name}`
    'prefer-template': 'error',
    // 重新配置 react-hooks 相关内容
    'react-hooks/rules-of-hooks': 'error',
    // 控制 JSX 元素的属性每行的最大数量:每个属性都单独一行
    'react/jsx-max-props-per-line': [2, { 'maximum': 1, 'when': 'always' }]
    // 控制第一个属性是否换行
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    //  控制闭合标签的位置
    'react/jsx-closing-bracket-location': [1, 'line-aligned']
  },
};
