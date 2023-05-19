import prompts from "prompts";
import fs from "fs";
import path from "path";

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

const errMessage = (name: string, folder: string) =>
  `Component '${capitalize(name)}' already exists in folder '${folder}'`;

function isValidComponent(name: string, folder: string) {
  console.log(name, folder);
  const componentsPath = path.resolve("./src/", folder, name);
  return !fs.existsSync(componentsPath);
}

function onCancel() {
  process.exit(1);
}

const { folder } = await prompts(
  {
    type: "select",
    name: "folder",
    message: "Component folder?",
    choices: [
      { title: "components", value: "components", selected: true },
      { title: "routes", value: "routes" },
    ],
  },
  { onCancel }
);

const { componentName } = await prompts(
  {
    type: "text",
    name: "componentName",
    message: "Component name?",
    format: (name) => capitalize(name),
    validate: (name) =>
      isValidComponent(capitalize(name), folder) || errMessage(name, folder),
  },
  { onCancel }
);

const INDEX_FILE = [
  `export ${
    folder === "components" ? "{ default }" : `{ default as ${componentName} }`
  } from "./${componentName}"`,
  folder === "components"
    ? `export type { ${componentName}Props } from "./${componentName}"`
    : null,
].join("\n");

const INTERFACE = [`export interface ${componentName}Props {`, "", "}"].join(
  "\n"
);

const COMPONENT_FILE = [
  folder === "components" ? INTERFACE : null,
  `function ${componentName}() {`,
  `  return <div>${componentName}</div>`,
  "}",
  "",
  `export default ${componentName}`,
].join("\n");

const componentPath = path.resolve("./src/", folder, componentName);
fs.mkdirSync(componentPath);
fs.writeFileSync(path.resolve(componentPath, "index.ts"), INDEX_FILE);
fs.writeFileSync(
  path.resolve(componentPath, `${componentName}.tsx`),
  COMPONENT_FILE
);
