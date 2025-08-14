const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
	expoConfig,
	eslintPluginPrettierRecommended,
	{
		ignores: ['.expo', 'node_modules/**', 'ios/**', 'android/**', 'assets/**', '.vscode', '.idea', '.run'],
	},
]);
