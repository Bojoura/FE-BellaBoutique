module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    camelcase: ['error', {
      properties: 'never',
      ignoreDestructuring: true,
      ignoreImports: true,
      allow: [
        'created_at',
        'updated_at',
        'image_url',
        'address_line'
      ]
    }],
    'react/prop-types': ['error', {
      ignore: ['children']
    }],
    'react/display-name': 'off',
    'no-unused-vars': ['error', {
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_'
    }]
  },
}
