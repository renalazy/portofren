/** Static export for GitHub Pages, served under /portofren. */
const basePath = "/portofren";

export default {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
