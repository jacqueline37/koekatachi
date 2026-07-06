import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages で https://<ユーザー名>.github.io/<リポジトリ名>/ に公開する場合、
// base はリポジトリ名と一致させてください。
// 例: リポジトリ名が "koekatachi" なら base: "/koekatachi/"
// 独自ドメインや <ユーザー名>.github.io リポジトリで公開する場合は base: "/" にしてください。
export default defineConfig({
  plugins: [react()],
  base: "/koekatachi/",
});
