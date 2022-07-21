module.exports = {
    ignorePatterns: ['.eslintrc.js'],
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended'
    ],
    settings: {
        react: {
            version: 'detect'
        }
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12
    },
    plugins: ['react'],
    rules: {
        'react/react-in-jsx-scope': 0,
        'react/jsx-uses-react': 0,
        'comma-dangle': ['error', 'never'],
        'arrow-parens': [2, 'as-needed'],
        'no-redeclare': [2, { builtinGlobals: false }]
    }
}
