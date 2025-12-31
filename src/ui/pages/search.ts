import { search } from "@inquirer/prompts";
import chalk from "chalk";
import { useContext } from "../../core/context/runtime.js";
import Fuse from "fuse.js";
import searchData from '../../assets/storage/search.json'  with { type: 'json' };

interface user_option_type {
  js_framework: string;
  CSS_framework: string;
}

export async function Search() {
  const ctx = useContext();

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

  const search_data = searchData;

  const search_data_name: string[] = search_data.map((i) => i.name);

  function cleanText(text: string) {
    return text.replace(/[-&]/g, "").toLowerCase().trim();
  }

  const fuseData = search_data_name.map((name, index) => ({
    original: name,
    words: cleanText(name).split(/\s+/),
  }));

  const fuseIndex = fuseData.map((item) => ({
    original: item.original,
    wordFuse: new Fuse(item.words, { threshold: 0.4, ignoreLocation: true }),
  }));

  const search_options: any = await search({
    message: "Search for your start collection:",
    theme: question_theme,
    source: async (input) => {
      if (!input) return search_data_name.slice(0, 5);

      const inputWords = cleanText(input).split(/\s+/);

      const results = fuseIndex
        .filter((item) =>
          inputWords.every((word) => item.wordFuse.search(word).length > 0)
        )
        .map((item) => item.original);

      return results;
    },
  });

  const user_option: user_option_type | undefined = search_data.find(
    (op) => op.name === search_options
  )?.value;
  ctx.user_options = { ...ctx.user_options, ...user_option };
}
