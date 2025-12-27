import { useContext } from "../../../core/context/runtime.js";

export async function Tailwind() {
  const { user_options } = useContext();

  try {
    // add import tailwindcss from '@tailwindcss/vite' in vite.config.ts
    // add  tailwindcss(), in plugins in vite.config.ts
    // add  @import "tailwindcss"; in index.css
    // edit index.css
  } catch (err: any) {
    throw err;
  }
}
