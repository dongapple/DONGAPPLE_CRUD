import react from 'eslint-plugin-react'

export default tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    react: react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    prettier: prettierPlugin,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': 'error',
  },
})
