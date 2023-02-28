import * as dotenv from "dotenv";
dotenv.config();

import Express from "express";
import http from "http";
import cors from "cors";

import clubsRoute from "./src/routes/clubs.js";
import datesRoute from "./src/routes/dates.js";
import gamesRoute from "./src/routes/games.js";
import rankingsRoute from "./src/routes/rankings.js";

import errorHandler from "./src/errors/ErrorHandler.js";
import ApiError from "./src/errors/ApiError.js";
import dbo from "./src/database/config.js";
import { fetchScores } from "./src/api/scores.js";
import { fetchClubs } from "./src/api/clubs.js";

// cron.schedule("* * * * * *", () => {
//   console.log("running a task every minute");
// });

// fetchScores();

fetchClubs();

const app = Express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the API!!!");
});

app.use("/api/clubs/", clubsRoute);
app.use("/api/dates/", datesRoute);
app.use("/api/games/", gamesRoute);
app.use("/api/rankings/", rankingsRoute);

app.use((req, res, next) => {
  next(ApiError.notFound("Route not found"));
});

app.use(errorHandler);

dbo.connectToServer(() =>
  server.listen(port, () => console.log(`Server is running on port ${port}`))
);

/*

------- TODOS -------

o Remove todos



*/
