module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": ["warn", { semi: false }],
    "import/no-extraneous-dependencies": "off",
    "react/jsx-props-no-spreading": "off",
    // "arrow-body-style": "off",
    // "prefer-arrow-callback": "off",
    // "no-unused-vars": ["error", { vars: "local", args: "none" }],
    "react/prop-types": "off",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".jsx"],
      },
    },
  },
}
