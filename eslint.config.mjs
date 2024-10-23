import ts from "typescript-eslint";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import jest from "eslint-plugin-jest";

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  {
    ignores: ["lib/**"],
  },
  {
    files: ["**/*.*js", "**/*.*ts"],
    rules: {
      "@typescript-eslint/no-require-imports": "warn",
    },
  },
  {
    files: ["tests/**/*.*js", "tests/**/*.*ts"],
    ...jest.configs["flat/recommended"],
  },
  {
    languageOptions: {
      globals: {
        __dirname: true,
        console: true,
        exports: true,
        module: true,
        require: true,
        process: true,
      },
    },
  },
);
