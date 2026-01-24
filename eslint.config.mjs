// @ts-check
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import'; // Ajout de l'import du plugin
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            sourceType: 'commonjs',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        plugins: {
            import: importPlugin,
        },
        rules: {
            "indent": ["error", 4],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            'import/order': ['error', {
                'newlines-between': 'always',
                'groups': [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
                'alphabetize': { 'order': 'asc', 'caseInsensitive': true }
            }],
            'import/newline-after-import': ['error', { 'count': 1 }],
            'import/no-absolute-path': 'error',
        },
    },
);
