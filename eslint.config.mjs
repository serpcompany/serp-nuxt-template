// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
    rules: {
        'vue/no-setup-props-destructure': 'error',
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-console': 'warn',
        'no-unused-vars': 'off',
        'prefer-const': 'warn',
    },
});
