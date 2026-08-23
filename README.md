# ivan-cv-2026

Портфолио Ивана — одностраничник, чистая статика, бэкенда нет.

## Стек

- Next.js 16 (App Router) + React 19, React Compiler
- `output: 'export'` — статика в `out/`, раздаётся с GitHub Pages
- SCSS Modules, токены и миксины в `src/styles`
- framer-motion — все скролл-эффекты и парящая карточка

## Запуск

```bash
nvm use          # node 24, см. .nvmrc
npm install
npm run dev      # http://localhost:3000
```

Проверки: `npm run lint`, `npm run lint:styles`, `npm run build`.
