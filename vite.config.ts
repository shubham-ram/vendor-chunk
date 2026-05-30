import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  build: {
    rolldownOptions: {
      treeshake: false,
      output: {
        codeSplitting: {
          groups: [
            {
              test: /node_modules\/(@mui|@emotion)/,
              name: "ui",
            },
            {
              test: /node_modules\/(lodash|dayjs)/,
              name: "utils",
            },
            {
              test: /node_modules\/(chart\.js|react-chartjs-2)/,
              name: "charts",
            },
          ],
        },
      },
    },
  },
});
