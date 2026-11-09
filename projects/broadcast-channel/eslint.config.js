// @ts-check
const tseslint = require("typescript-eslint");
const rootConfig = require("../../eslint.config.js");

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-inferrable-types": "off",
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "ashetm",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "ashetm",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    rules: {},
  }
);
