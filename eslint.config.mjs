import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", 'prettier'),
  {
    plugins: {
      prettier
    },
    rules: {
      'arrow-body-style': 'off',
      'jsx-quotes': 'off',
      'comma-dangle': 'off',
      'object-curly-newline': 'off',
      'linebreak-style': 'off',

      'react/jsx-filename-extension': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-tag-spacing': 'off',
      'react/prop-types': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'react/require-default-props': 'off',
      'react/react-in-jsx-scope': 'off',

      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/prefer-default-export': 'off',
      'prettier/prettier': 'error',
    }
  }
];

export default eslintConfig;
