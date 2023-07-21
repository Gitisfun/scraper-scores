import express from "express";
import { runTests } from "../jobs/test.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const colors = [];
    const result = await runTests({ colors });
    res.send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
