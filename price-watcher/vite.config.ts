import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { cpSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),

    {
      name: "copy-extension",
      closeBundle() {
        cpSync("extension", "dist", {
          recursive: true
        });
      }
    }
  ]
});
