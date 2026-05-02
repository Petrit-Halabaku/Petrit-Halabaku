import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.dirname(fileURLToPath(import.meta.url));

// Turbopack omits `opts.from` for some PostCSS transforms. @tailwindcss/postcss falls back to
// path.dirname(path.resolve("")) = parent of CWD, so its enhanced-resolve looks for tailwindcss
// one level above the project and fails. This plugin pins `from` to a virtual path inside the
// project so the base directory is always correct.
const pinFrom = {
  postcssPlugin: "tw-pin-from",
  prepare() {
    return {
      Once(_root, { result }) {
        if (!result.opts.from) {
          result.opts.from = path.join(appRoot, "_tw_virtual.css");
        }
      },
    };
  },
};

export default {
  plugins: [pinFrom, "@tailwindcss/postcss"],
};
