// next/image подставляет basePath сам, <video> и <source> — нет
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBasePath(path: string) {
  return `${basePath}${path}`;
}
