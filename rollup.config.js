import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default {
  input: "src/bin/__main__.ts",
  output: {
    file: "dist/__main__.js",
    format: "esm",
  },
  plugins: [json(), typescript({ tsconfig: "./tsconfig.json" })],
};
