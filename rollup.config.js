import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";

export default {
  input: "src/bin/__main__.ts",
  output: {
    file: "dist/__main__.js",
    format: "esm",
  },
  plugins: [
    json(),
    typescript({ tsconfig: "./tsconfig.json" }),
    copy({
      targets: [
        {
          src: "src/templates/**/*",
          dest: "dist",
        },
      ],
      flatten: false,
      copyOnce: true,
    }),
  ],
};
