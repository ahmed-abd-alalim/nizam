import { rawlist, confirm, Separator, checkbox } from "@inquirer/prompts";
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";
import { user_options_type } from "../../assets/type.js";

export async function Custom() {
  const ctx = useContext();
  const user_options: (string[] | [string, boolean])[] = [];
  const question_theme = {
    prefix: {
      idle: `${chalk.yellowBright("[")}${chalk.blueBright(
        "?"
      )}${chalk.yellowBright("]")}`,
      done: `${chalk.yellowBright("[")}${chalk.greenBright(
        "✔"
      )}${chalk.yellowBright("]")}`,
    },
    style: {
      message: (text: any) => chalk.blueBright(text),
      answer: (text: any) => chalk.greenBright(text),
    },
  };
  const checkbox_theme = {
    icon: {
      checked: ` ${chalk.greenBright("✔")} `,
      unchecked: ` ${chalk.redBright("✖")} `,
      pointer: "➤",
    },
    style: {
      message: (text: any) => chalk.blueBright(text),
      answer: (text: any) => chalk.greenBright(text),
      description: (text: any) => chalk.yellowBright(`[!] ${text}`),
      highlight: (text: any) => chalk.cyanBright(text),
    },
  };

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
      {
        name: "Blueprint UI",
        value: "Blueprint UI",
        description:
          "A React UI toolkit optimized for data-dense and complex desktop-style applications.",
      },
    ],
  };

  const check_is_Ok = async (qu_title: string) => {
    return await confirm({
      message: `Do you want use ${qu_title}?`,
      default: false,
      theme: question_theme,
    });
  };

  const custom_options = async () => {
    user_options.push([
      "js_framework",
      await rawlist({
        message: "Select a js framework:",
        choices: nizam_choices.js_framework,
        theme: question_theme,
      }),
    ]);

    if (await check_is_Ok("CSS framework")) {
      user_options.push([
        "CSS_framework",
        await rawlist({
          message: "Select a CSS framework:",
          choices: nizam_choices.css_framework,
          theme: question_theme,
        }),
      ]);
    }

    if (await check_is_Ok("UI Component Library")) {
      const selectedlibrary: string[] = await checkbox({
        message: "Select Library:",
        choices: nizam_choices.ui_library,
        validate: async (value) => {
          if (value.length === 0) return "At least one should be chosen";
          return true;
        },
        theme: checkbox_theme,
      });
      // @ts-ignore
      user_options.push(["ui_library", selectedlibrary]);
    }
  };

  await custom_options();
  const user_options_conv: user_options_type = Object.fromEntries(user_options);
  ctx.user_options = { ...ctx.user_options, ...user_options_conv };
}
