import { Separator } from "@inquirer/prompts";
import { rawlist_fun, checkbox_fun, check_is_Ok } from "./main.js";
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";
import { user_options_type } from "../../assets/type.js";

export async function Custom() {
  const ctx = useContext();
  const user_options: (string[] | [string, boolean] | [string, string[]])[] =
    [];

  const nizam_choices = {
    js_framework: [
      new Separator(chalk.gray("--- Popular Options ---")),
      "React + vite + js",
      "React + vite + ts",
    ],
    css_framework: [
      new Separator(chalk.gray("--- Popular Options ---")),
      "Bootstrap",
      "Tailwindcss",
      "Bulma",
      "Foundation",
      "Materialize",
    ],
    ui_library: [
      new Separator(chalk.gray("--- Popular Options ---")),
      {
        name: "Material UI",
        value: "Material UI",
        description:
          "A popular React UI library based on Google’s Material Design, with ready made components and strong theming support.",
      },
      {
        name: "Ant Design",
        value: "Ant Design",
        description:
          "A powerful enterprise focused React UI framework with rich components and clean, professional design.",
      },
      {
        name: "Headless UI",
        value: "Headless UI",
        description: `Headless UI has no CSS at all. you must style it yourself ${chalk.redBright(
          "(usually with Tailwind CSS)"
        )}.`,
      },
    ],
    icon_library: [
      new Separator(chalk.gray("--- Popular Options ---")),
      {
        name: `React Icons ${chalk.gray("\t(most used)")}`,
        value: "React Icons",
        description:
          "A popular library that provides thousands of icons from multiple icon packs (like FontAwesome, Material, and more) as easy-to-use React components.",
      },
      {
        name: "Lucide React",
        value: "Lucide React",
        description:
          "A modern, lightweight icon library that offers clean and customizable SVG icons as React components.",
      },
      {
        name: `Lord Icon ${chalk.gray("\t\t(animated icons)")}`,
        value: "Lord Icon",
        description: "Animated SVG icons with a React wrapper.",
      },
      {
        name: `Material Icons`,
        value: "Material Icons",
        description:
          "Google's official icon set for Material Design Provides a wide range of icons with consistent style, mainly used in Material-UI projects.",
      },
    ],
  };

  const custom_options = async () => {
    user_options.push([
      "js_framework",
      await rawlist_fun("Select a js framework:", nizam_choices.js_framework),
    ]);
    if (await check_is_Ok("CSS framework")) {
      user_options.push([
        "CSS_framework",
        await rawlist_fun(
          "Select a CSS framework:",
          nizam_choices.css_framework
        ),
      ]);
    }

    if (await check_is_Ok("UI Component Library")) {
      user_options.push([
        "ui_library",
        await checkbox_fun(
          "Select Library:",
          nizam_choices.ui_library,
          (value: string[]) => {
            if (value.length === 0) return "At least one should be chosen";
            return true;
          }
        ),
      ]);
    }

    if (await check_is_Ok("Icons Library")) {
      const found = user_options.find(
        (i) => Array.isArray(i[1]) && i[1].includes("Material UI")
      );
      if (found) {
        const materialIconOption = nizam_choices.icon_library.find(
          (i): i is { name: string; value: string; description: string } =>
            "name" in i && i.name === "Material Icons"
        );
        if (materialIconOption) {
          materialIconOption.name += chalk.gray(
            "\t(strong candidate because you use Material UI)"
          );
        }
      }
      user_options.push([
        "icon_library",
        await checkbox_fun(
          "Select Library:",
          nizam_choices.icon_library,
          (value: string[]) => {
            if (value.length === 0) return "At least one should be chosen";
            return true;
          }
        ),
      ]);
    }
  };

  await custom_options();
  const user_options_conv: user_options_type = Object.fromEntries(user_options);
  ctx.user_options = { ...ctx.user_options, ...user_options_conv };
}
