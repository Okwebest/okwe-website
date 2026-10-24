// https://prettier.io/docs/en/options.html
/** @type {import('prettier').Config} */
const config = {
  trailingComma: 'es5',
  bracketSpacing: true,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  arrowParens: 'always',
  tailwindStylesheet: './src/app/globals.css',
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
