module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
  settings: {
    react: {
      version: "detect"
    },
  },
  rules: {
    "react/prop-types": 0
  }
};
