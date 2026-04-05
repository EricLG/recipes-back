// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import'; // Ajout de l'import du plugin
import globals from 'globals';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
    {
        ignores: ['eslint.config.mjs'],
    },
    eslint.configs.recommended,
    stylistic.configs.recommended,
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
            '@stylistic': stylistic
        },
        rules: {
            "@typescript-eslint/no-unsafe-assignment": 'off',
            "@typescript-eslint/no-unsafe-member-access": 'off',
            "@typescript-eslint/no-unsafe-call": 'off',
            '@stylistic/indent': ['error', 4],
            '@stylistic/array-bracket-newline': ['error', { "multiline": true }],
            '@stylistic/brace-style': ['error', '1tbs', { "allowSingleLine": false }],
            '@stylistic/padded-blocks': ['error', { "classes": "always" }],
            '@stylistic/object-property-newline': ['error', { "allowAllPropertiesOnSameLine": true }],
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
            'import/no-duplicates': 'error',
        },
    },
]);
