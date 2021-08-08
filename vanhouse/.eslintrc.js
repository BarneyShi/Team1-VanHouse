
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    // CITATION: https://stackoverflow.com/a/43031230
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-unused-vars": ["off", { vars: "all", args: "after-used" }],
    "react/jsx-props-no-spreading": "off",
    "react/self-closing-comp": "off",
    "no-underscore-dangle": "off",
    "react/require-default-props": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "react/no-unescaped-entities": "off",
    "import/no-unresolved": "off",
    "no-console": "off",
    "no-alert": "off",
  },
};