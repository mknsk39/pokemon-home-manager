import parserVue from 'vue-eslint-parser'
import parserTs from '@typescript-eslint/parser'
import withNuxt from './.nuxt/eslint.config.mjs'
import storybook from "eslint-plugin-storybook";

export default withNuxt(
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: parserVue,
            parserOptions: {
                parser: parserTs,
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: parserTs,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
    },
    ...storybook.configs["flat/recommended"]
)
