import type { NextConfig } from 'next';

// Портфолио — чистая статика, бэкенда нет. Экспортируем в out/ и
// раздаём с GitHub Pages, как в divodivnoe.
// На project-сайте (eugenepokalyuk.github.io/ivan-cv-2026) все ссылки должны
// быть с префиксом /ivan-cv-2026 — его задаёт workflow через
// NEXT_PUBLIC_BASE_PATH. Когда появится свой домен — переменную убираем.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export',
  basePath,
  // Без слеша на конце Pages отдаёт 404 на вложенных маршрутах: он ищет
  // foo.html, а экспорт кладёт foo/index.html.
  trailingSlash: true,
  images: {
    // На Pages оптимизатора нет — картинки уезжают как есть, поэтому
    // экспорты из Figma кладём в public/ уже пожатыми в webp.
    unoptimized: true,
  },
};

export default nextConfig;
