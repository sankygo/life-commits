import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

export default {
  // Specify the root directory to avoid conflicts with nested ESLint configs
  root: true,

  // Extend the base ESLint configurations
  extends: [
    js.configs.recommended, // Base JS rules
    'plugin:@typescript-eslint/recommended', // TypeScript ESLint plugin rules
    'plugin:react-hooks/recommended', // React Hooks plugin
    'plugin:react-refresh/recommended', // React Refresh plugin
  ],

  // Define the parser for TypeScript files
  parser: typescriptEslintParser,
  
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module', // For ES Modules
  },

  // Define the environment (Global variables)
  env: {
    browser: true, // If your code runs in the browser environment
  },

  // Plugins used in your config
  plugins: [
    'react-hooks', 
    'react-refresh',
    '@typescript-eslint',
  ],

  // Define custom rules or override existing ones
  rules: {
    'react-refresh/only-export-components': [
      'warn', 
      { allowConstantExport: true },
    ],
    // Add other custom rules as needed
  },

  // Files to lint
  files: ['**/*.{ts,tsx}'],
};
