import express from "express";
import { fetchGamesAndDates } from "../api/games.js";
import { fetchScores } from "../api/scores.js";
import { scrapeAllGames } from "../jobs/index.js";
import { runTests } from "../jobs/test.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    //const colors = [];
    //const result = await runTests({ colors });
    //const result = await fetchGamesAndDates()
    const result = await scrapeAllGames()
    res.send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
