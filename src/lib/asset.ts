/** Caminho de um arquivo de public/ respeitando a base do site (no GitHub Pages ela é /portfolio/). */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
