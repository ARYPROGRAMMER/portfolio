// eslint-config-next 16 ships native flat configs, so no eslintrc bridge needed.
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**", "assets/**"],
  },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // r3f introduces valid DOM-unknown props on three.js elements.
      "react/no-unknown-property": "off",
    },
  },
];

export default config;
