import axios from "axios";
import cheerio from "cheerio";
import { SCORES_URL } from "../logic/constants/urls.js";
import { formatDateToString, formatToCorrectDate } from "../logic/date.js";
import { cleanScoreRoundTitle } from "../logic/index.js";
import { exists } from "../logic/scraper.js";
import { Game } from "../models/game.js";

export const fetchScores = async () => {
  try {
    const response = await axios.get(SCORES_URL);
    if (response) {
      const $ = cheerio.load(response.data);

      const content = $(".pageContent");
      const root = findRoot($, content);
      const rounds = findRounds($, root);
      return scrapeRounds($, rounds);
    }
    return null;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong when scraping");
  }
};

const findRoot = ($, root) => {
  try {
    const temp = $(root).find("table");
    return $(temp.first()).find("tbody").first();
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong when scraping root");
  }
};

const findRounds = ($, root) => {
  try {
    const temp = $(root).children();

    return temp;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong when finding rounds");
  }
};

const scrapeRounds = ($, root) => {
  try {
    const dateList = [];
    const roundList = [];
    for (let i = 0; i < root.length; i++) {
      const element = root[i];
      if (i % 2 === 0) {
        const span = $(element).find("span");
        const date = cleanScoreRoundTitle($(span).text());
        const tempDate = formatToCorrectDate(date);
        const formatedDate = formatDateToString(tempDate);
        console.log(formatedDate);
        dateList.push(formatedDate);
      } else {
        roundList.push(element);
      }
    }

    const games = [];

    for (let i = 0; i < root.length / 2; i++) {
      const table = $(roundList[i]).find("tbody").children();
      let tempLeague;
      for (let j = 0; j < table.length; j++) {
        const row = table[j];

        if (exists($, row, "b")) {
          tempLeague = $(row).text();
        } else {
          const columns = $(row).children();

          if (columns.length === 8) {
            const homeTeam = $(columns[0]).text();
            const awayTeam = $(columns[2]).text();
            const homeScore = $(columns[4]).text();
            const awayScore = $(columns[6]).text();
            const score = `${homeScore} - ${awayScore}`;
            const game = new Game(
              "",
              homeTeam,
              score,
              awayTeam,
              dateList[i],
              tempLeague
            );
            games.push(game);
          }
          if (columns.length === 5) {
            const homeTeam = $(columns[0]).text();
            const awayTeam = $(columns[2]).text();
            const score = "UITGESTELD";
            const game = new Game(
              "",
              homeTeam,
              score,
              awayTeam,
              dateList[i],
              tempLeague
            );
            games.push(game);
          }
        }
      }
    }
    return games;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong when scraping games");
  }
};
