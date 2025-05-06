// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	modules: ['@nuxt/eslint'],
	devtools: { enabled: true },
	css: ['@picocss/pico'],
	alias: {
		'@': resolve(__dirname, './src'),
		'~': resolve(__dirname, './') },
	eslint: {
		config: {
			stylistic: {
				semi: true,
				indent: 'tab',
			},
		},
	},
});
