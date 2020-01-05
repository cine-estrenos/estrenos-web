module.exports = {
  root: true,
  extends: [
    "react-app",
    "plugin:prettier/recommended",
    "plugin:cypress/recommended",
    "prettier/react"
  ],
  plugins: ["cypress", "react-hooks"],
  env: {
    "cypress/globals": true
  },
  globals: {
    __PATH_PREFIX__: true
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver" : {
      alias : {
        map : [
          ["pages","./src/pages/"],
          ["utils","./src/utils/"],
          ["components","./src/components/"],
          ["images","./src/images/"],
        ],
        extensions: [".js"]
      }
    }
  },
  rules: {
    "no-console": "warn",
    "no-unused-vars": [
      "warn",
      {
        args: "after-used",
        ignoreRestSiblings: false,
        argsIgnorePattern: "^_$"
      }
    ],
    "prettier/prettier": [
      "warn",
      {
        printWidth: 120,
        trailingComma: "all",
        tabWidth: 2,
        semi: true,
        singleQuote: true,
        arrowParens: "always"
      }
    ],
    "react/self-closing-comp": "warn",
    "react-hooks/rules-of-hooks": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-sort-props": ["warn", {
      callbacksLast: true,
      shorthandFirst: true,
      noSortAlphabetically: false,
      reservedFirst: true
    }]
  }
};
