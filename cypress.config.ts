import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    specPattern: "cypress/component/**/*.cy.tsx",
    supportFile: "cypress/support/component.tsx",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
