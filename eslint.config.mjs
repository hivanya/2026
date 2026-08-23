import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

// Конфиг перенесён с face. Отличие одно: там монорепа (client/ + server/),
// здесь только фронт в src/ — поэтому серверной секции нет, а браузерное
// окружение и a11y висят на src/**.
export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '.next/**',
      'out/**',
      '**/*.config.{js,cjs,mjs,ts}',
      // Скрипты выгрузки макета — node-окружение и разовый запуск руками;
      // в face этот каталог тоже вне линтера.
      'tools/**',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // React + hooks + правила React Compiler
  ...reactHooks.configs['recommended-latest'],

  // Клиентский код — браузерное окружение, jsx и a11y
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'jsx-a11y': jsxA11y },
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },

  // Смягчения для первичного внедрения
  {
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      // jsx-a11y — пока советующие предупреждения, не блокеры
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'jsx-a11y/no-autofocus': 'warn',
      // Ролики на странице без речи: у фонового в блоке Yango Plus звука
      // нет вовсе, у шоурила — музыка. Субтитры к ним прикладывать нечего,
      // но если в шоуриле появится закадровый голос — нужен <track>.
      'jsx-a11y/media-has-caption': 'warn',
      // Правила React Compiler — пока предупреждения
      'react-hooks/immutability': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/set-state-in-render': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/use-memo': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/globals': 'warn',
      'react-hooks/error-boundaries': 'warn',
      'react-hooks/component-hook-factories': 'warn',
      'react-hooks/incompatible-library': 'warn',
      'react-hooks/unsupported-syntax': 'warn',
    },
  },

  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // react первым, затем остальные внешние пакеты
            ['^react', '^@?\\w'],
            // внутренний алиас @/ (см. paths в tsconfig.json):
            // сначала с подпутём (@/lib/hooks), затем голый алиас
            ['^@/', '^@$'],
            // относительные импорты одной группой (без пустых строк между)
            // внутри ./ стили (./foo.module.scss) выше компонентов
            [
              '^\\./.*\\.s?css$',
              '^\\./',
              '^\\.\\./(?!\\.\\.)',
              '^\\.\\./\\.\\./(?!\\.\\.)',
              '^\\.\\./\\.\\./\\.\\./(?!\\.\\.)',
              '^\\.\\.',
            ],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
    },
  },

  // Отключаем стилевые правила, конфликтующие с Prettier
  prettier,
);
