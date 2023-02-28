import express from "express";
import {
  scrapeFromCalendarPage,
  scrapeFromRankingPage,
  scrapeFromScoresPage,
} from "../jobs/index.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  await scrapeFromScoresPage();
  res.send({ message: "You hit the clubs route" });
});

router.get("/a", async (req, res, next) => {
  await scrapeFromCalendarPage();
  res.send({ message: "You hit the clubs route" });
});

router.get("/b", async (req, res, next) => {
  await scrapeFromRankingPage();
  res.send({ message: "You hit the clubs route" });
});

export default router;
