import fs from "fs-extra";

await fs.copy("src/templates", "dist/templates");
