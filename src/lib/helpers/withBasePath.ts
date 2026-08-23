// next/image сам подставляет basePath, а вот <video src>, <source> и
// background-image в inline-стилях — нет. На project-сайте GitHub Pages
// без префикса они отдают 404, поэтому все «ручные» пути гоняем через это.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBasePath(path: string) {
  return `${basePath}${path}`;
}
