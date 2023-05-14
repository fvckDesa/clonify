import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    specPattern: "cypress/component/**/*.cy.tsx",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
