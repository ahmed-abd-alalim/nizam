import checkboxPlus from "inquirer-checkbox-plus-plus";
import resources_json from "../../assets/storage/resources.json" with { type: "json" };
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";
import type {
  resources_type,
  options_resources_type,
} from "../../assets/type.js";

interface groupedChoices_type {
  name: string;
  value: string;
  disabled?: boolean;
  description?: string;
}
interface resources_refruns_data_type {
  name: string;
  key: string;
  options: options_resources_type;
}
type fixed_options_type = [string, string[]][];
type single_options_type = [string, string[]][];
type multi_options_type = string;
type depended_on_options_type = [string, string, string[]][];

export async function Search() {
  const ctx = useContext();
  const resources: resources_type = resources_json;
  const groupedChoices: groupedChoices_type[] = [];
  const resources_refruns_data: resources_refruns_data_type[] = [];
  const fixed_options: fixed_options_type[] = [];
  const single_options: single_options_type[] = [];
  const multi_options: multi_options_type[] = [];
  const depended_on_options: depended_on_options_type = [];

  Object.values(resources).forEach((section) => {
    if (section.type === "fixed") {
      fixed_options.push([
        section.name,
        section.options.map((i: options_resources_type) => i.name),
      ]);
    }
  });

  Object.values(resources).forEach((section) => {
    if (section.type === "single") {
      single_options.push([
        section.name,
        section.options.map((i: options_resources_type) => i.name),
      ]);
    }
  });

  Object.values(resources).forEach((section) => {
    if (section.type === "multi") {
      multi_options.push(
        (Object.keys(resources) as (keyof typeof resources)[]).find(
          (k) => resources[k] === section,
        )!,
      );
    }
  });

  Object.values(resources).forEach((section) => {
    if (section.depended_on) {
      depended_on_options.push([
        section.depended_on,
        section.name,
        section.options.map((n: options_resources_type) => n.name),
      ]);
    }
  });

  Object.values(resources).forEach((section) => {
    if (section.options) {
      resources_refruns_data.push({
        name: section.name,
        key: (Object.keys(resources) as (keyof typeof resources)[]).find(
          (k) => resources[k] === section,
        )!,
        options: section.options,
      });
    }
  });

  resources_refruns_data.forEach((section) => {
    if (section.options) {
      groupedChoices.push({
        name: ``,
        value: "citrus-header",
        disabled: true,
      });
      groupedChoices.push({
        name: `=== ${section.name} ===`,
        value: "citrus-header",
        disabled: true,
      });
      section.options.forEach((el: groupedChoices_type) => {
        groupedChoices.push(el);
      });
    }
  });

  const answers = await checkboxPlus({
    message: chalk.blueBright(" Enter in the search and select:"),
    pageSize: 10,
    highlight: true,
    searchable: true,
    loop: false,
    validate: function (answer) {
      // not empty
      if (answer.length === 0) {
        return "You must choose at least one.";
      }
      // search about fixed options
      const unselect_fixed_value = fixed_options.find(
        ([, values]: any) => !values.some((v: string) => answer.includes(v)),
      )?.[0];
      if (unselect_fixed_value) {
        return `just select at least one from ${unselect_fixed_value}`;
      }

      // search about single options
      const more_one_single_value = [...single_options, ...fixed_options].find(
        ([, h]: any) => {
          const selectedCount = h.filter((v: string) =>
            answer.includes(v),
          ).length;
          return selectedCount > 1;
        },
      )?.[0];
      if (more_one_single_value) {
        return `just select only one from ${more_one_single_value}`;
      }

      //search about options depends on anouther
      const depended_on_value = depended_on_options.find(([n, , o]) => {
        return answer.includes(n) && !o.some((v: string) => answer.includes(v));
      });
      if (depended_on_value) {
        return `one of the (${depended_on_value?.[1].toLowerCase()}) options must be used because ${depended_on_value?.[0].toLowerCase()} depends on it`;
      }

      return true;
    },
    source: (_answersSoFar, input: string = "") => {
      return Promise.resolve(
        groupedChoices.filter((choice) => {
          if (input === "") return true;
          return (
            !choice.disabled &&
            choice.name.toLowerCase().includes(input.toLowerCase())
          );
        }),
      );
    },
    theme: {
      icon: {
        checked: ` ${chalk.greenBright("✔")} `,
        unchecked: ` ${chalk.redBright("✖")} `,
        cursor: `${chalk.yellowBright("➤")} `,
        disabled: "",
      },
      style: {
        disabledChoice: (text) => chalk.gray(text.replace("(disabled)", "")),
        description: (text) => chalk.yellowBright(`[!] ${text}`),
        highlight: (text) => chalk.cyanBright(text),
        searching: (text) => chalk.cyanBright(text),
        noResults: (text) => chalk.red(text),
        error: (text) => chalk.bgRed.white(text),
        searchHint: (text) => chalk.dim.italic(text),
        renderSelectedChoices: (selected) =>
          chalk.greenBright(selected.map((c) => c.name).join(", ")),
      },
    },
  });

  const result = Object.entries(
    answers.reduce<Record<string, string[]>>((acc, answer) => {
      const resource = resources_refruns_data.find((r) =>
        r.options.some((o: options_resources_type) => o.name === answer),
      );
      if (!resource) return acc;
      acc[resource.key] ??= [];
      acc[resource.key].push(answer);
      return acc;
    }, {}),
  );

  const result_filter = result.map((s) => {
    if (!multi_options.includes(s[0])) {
      return [s[0], s[1].toString()];
    } else {
      return s;
    }
  });

  const user_options_conv = Object.fromEntries(result_filter);
  ctx.user_options = { ...ctx.user_options, ...user_options_conv };
}
