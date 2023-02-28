import cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const fetchClubs = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const file = fs.readFileSync(`${__dirname}/clubs.html`);
    const $ = cheerio.load(file);

    const content = $(".table-responsive");
    const rows = $(content).children();

    for (const row of rows) {
      // console.log($(row).text());
      console.log($(row).hasClass("row-even"));
    }

    return true;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong when scraping");
  }
};
