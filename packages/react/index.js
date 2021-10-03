module.exports = {
	extends: [
		"plugin:react/recommended",
		"plugin:jsx-a11y/recommended",
		"@magister_zito/eslint-config-typescript",
	],
	settings: {
		react: {
			version: "17.0",
		},
	},
	plugins: ["jsx-a11y", "react/hooks"],
	rules: {
		"jsx-quotes": ["error", "prefer-double"],
		"react/react-in-jsx-scope": "off",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
	},
};
