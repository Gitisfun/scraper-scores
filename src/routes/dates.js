import express from "express";
import { getAllDates } from "../database/collections/dates.js";
import { convertToStringDateList } from "../logic/date.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await getAllDates();
    // console.log(results);
    const temp = convertToStringDateList(results);
    // console.log(temp);
    res.send(temp);
  } catch (err) {
    next(err);
  }
});

export default router;
