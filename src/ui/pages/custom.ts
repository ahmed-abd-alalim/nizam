import { Separator } from "@inquirer/prompts";
import { rawlist_fun, checkbox_fun, check_is_Ok } from "./main.js";
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";
import { user_options_type } from "../../assets/type.js";
import AppData from "../../assets/storage/resources.json" with { type: "json" };
import type { resources_type } from "../../assets/type.js";
type Option = {
  name: string;
  value: string;
  description?: string;
};
type local_user_options_type = (
  | string[]
  | [string, boolean]
  | [string, string[]]
)[];

export async function Custom() {
  const app_data: resources_type = AppData;
  const ctx = useContext();
  const user_options: local_user_options_type = [];

  const is_react_app = () => {
    return user_options.some((item) =>
      (item as string[])[1]?.startsWith("React + vite"),
    );
  };

  const append_hint_fun = (name_: string, hint_message: string) => {
    for (const group of Object.values(app_data)) {
      (group.options as Option[]).forEach((i) => {
        if (i.name === name_) {
          i.name += chalk.gray(`\t(${hint_message.toLocaleLowerCase()})`);
        }
      });
    }
  };

  const custom_options = async () => {
    append_hint_fun("Classic Router", "old way");
    append_hint_fun("Data Router", "new way");
    append_hint_fun("React Icons", "most used");
    append_hint_fun("Lord Icon", "animated icons");
    append_hint_fun("React Helmet Async", "react 18");
    append_hint_fun("Dr. Pogodin React Helmet", "fork for react 19+");
    append_hint_fun("Unhead", "powerful, SSR/SEO friendly");

    user_options.push([
      "js_framework",
      await rawlist_fun("Select a js framework:", [
        new Separator(chalk.gray("--- typing the number or select it ---")),
        ...app_data.js_framework.options,
      ]),
    ]);
    if (await check_is_Ok("CSS Framework")) {
      user_options.push([
        "css_framework",
        await rawlist_fun("Select a CSS framework:", [
          new Separator(chalk.gray("--- typing the number or select it ---")),
          ...app_data.css_framework.options,
        ]),
      ]);
    }

    if (await check_is_Ok("UI Component Library")) {
      user_options.push([
        "ui_library",
        await checkbox_fun(
          "Select Library:",
          [
            new Separator(chalk.gray("--- popular options ---")),
            ...app_data.ui_library.options,
          ],
          (value: string[]) => {
            if (value.length === 0) return "At least one should be chosen";
            return true;
          },
        ),
      ]);
    }

    if (is_react_app())
      if (await check_is_Ok("Routing Library")) {
        user_options.push([
          "routing_library",
          await rawlist_fun("Select Library:", [
            new Separator(chalk.gray("--- typing the number or select it ---")),
            ...app_data.routing_library.options,
          ]),
        ]);

        if (user_options.find((n) => n[1] === "React Router")) {
          user_options.push([
            "react_router_rout",
            await rawlist_fun("Select way:", [
              new Separator(
                chalk.gray("--- typing the number or select it ---"),
              ),
              ...app_data.react_router_rout.options,
            ]),
          ]);
        }
      }

    if (await check_is_Ok("State Management way")) {
      user_options.push([
        "state_management",
        await rawlist_fun("Select way:", [
          new Separator(chalk.gray("--- typing the number or select it ---")),
          ...app_data.state_management.options,
        ]),
      ]);
    }

    if (await check_is_Ok("Icons Library")) {
      const found = user_options.find(
        (i) => Array.isArray(i[1]) && i[1].includes("Material UI"),
      );
      if (found) {
        append_hint_fun(
          "Material Icons",
          "strong candidate because you use Material UI",
        );
      }
      user_options.push([
        "icon_library",
        await checkbox_fun(
          "Select Library:",
          [
            new Separator(chalk.gray("--- popular options ---")),
            ...app_data.icon_library.options,
          ],
          (value: string[]) => {
            if (value.length === 0) return "At least one should be chosen";
            return true;
          },
        ),
      ]);
    }

    if (await check_is_Ok("SEO / Meta Tag Management Libraries")) {
      user_options.push([
        "head_management",
        await rawlist_fun("Select Library:", [
          new Separator(chalk.gray("--- typing the number or select it ---")),
          ...app_data.head_management.options,
        ]),
      ]);
    }

    if (await check_is_Ok("Data Fetching Libraries")) {
      user_options.push([
        "data_fetching",
        await rawlist_fun("Select Library:", [
          new Separator(chalk.gray("--- typing the number or select it ---")),
          ...app_data.data_fetching.options,
        ]),
      ]);
    }
  };

  await custom_options();
  const user_options_conv: user_options_type = Object.fromEntries(user_options);
  ctx.user_options = { ...ctx.user_options, ...user_options_conv };
}
