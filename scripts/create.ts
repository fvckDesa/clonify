import prompts from "prompts";
import fs from "fs";
import path from "path";

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function joinFile(arr: (string | null)[]): string {
  return arr.filter((el) => el != null).join("\n");
}

const errMessage = (name: string, folder: string) =>
  `Component '${capitalize(name)}' already exists in folder '${folder}'`;

function isValidComponent(name: string, folder: string) {
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

const INDEX_FILE = joinFile([
  `export ${
    folder === "components" ? "{ default }" : `{ default as ${componentName} }`
  } from "./${componentName}";`,
  folder === "components"
    ? `export type { ${componentName}Props } from "./${componentName}";`
    : `export { loader as loader${componentName} } from "./loader";`,
]);

const INTERFACE = joinFile([
  `export interface ${componentName}Props {`,
  "  ",
  "}",
]);

const FN_PROPS = `{}: ${componentName}Props`;

const HOOK_IMPORT = `import { use${componentName}Data } from "./use${componentName}Data";`;

const HOOK_CALL = `const {} = use${componentName}Data();`;

const COMPONENT_FILE = joinFile([
  folder === "components" ? INTERFACE : HOOK_IMPORT,
  "",
  `function ${componentName}(${folder === "components" ? FN_PROPS : ""}) {`,
  folder === "components" ? null : `  ${HOOK_CALL}`,
  folder === "components" ? null : "",
  `  return <div>${componentName}</div>;`,
  "}",
  "",
  `export default ${componentName};`,
]);

const LOADER_FILE = joinFile([
  'import { LoaderFunctionArgs } from "react-router-dom";',
  "",
  `export interface ${componentName}Data {`,
  "  ",
  "}",
  "",
  `export async function loader({}: LoaderFunctionArgs): Promise<${componentName}Data> {`,
  "  return {};",
  "}",
]);

const HOOK_FILE = joinFile([
  'import { useLoaderData } from "react-router-dom";',
  `import type { ${componentName}Data } from "./loader";`,
  "",
  `export function use${componentName}Data() {`,
  `  const {} = useLoaderData() as ${componentName}Data;`,
  "",
  "  return {};",
  "}",
]);

const componentPath = path.resolve("./src/", folder, componentName);
fs.mkdirSync(componentPath);

if (folder === "routes") {
  fs.writeFileSync(path.resolve(componentPath, "loader.ts"), LOADER_FILE);
  fs.writeFileSync(
    path.resolve(componentPath, `use${componentName}Data.ts`),
    HOOK_FILE
  );
}

fs.writeFileSync(path.resolve(componentPath, "index.ts"), INDEX_FILE);
fs.writeFileSync(
  path.resolve(componentPath, `${componentName}.tsx`),
  COMPONENT_FILE
);
