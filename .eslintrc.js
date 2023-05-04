module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true
	},
	"extends": "eslint:recommended",
	"overrides": [
	],
	"parserOptions": {
		"ecmaVersion": "latest"
	},
  	"globals": {
  		"React": true,
  		"process": true
  	},
	"rules": {
		'no-console': 0,
		"indent": [
			"warn",
			4
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"warn",
			"single"
		],
		"semi": [
			"error",
			"never"
		]
	}
}
