import { fetchGamesAndDates } from "../api/games.js";
import { fetchRankings } from "../api/rankings.js";
import { fetchScores } from "../api/scores.js";
import {
  createDates,
  deleteAllFromDates,
} from "../database/collections/dates.js";
import {
  createGames,
  deleteAllFromGames,
} from "../database/collections/games.js";
import {
  createRankings,
  deleteAllFromRankings,
} from "../database/collections/rankings.js";

export const scrapeFromCalendarPage = async () => {
  try {
    const result = await fetchGamesAndDates();

    if (result) {
      // const deletedResultDates = await deleteAllFromDates();
      // const insertedResultDates = await createDates(result.dates);
      // const deletedResultGames = await deleteAllFromGames();
      const insertedResultGames = await createGames(result.games);

      // if (!deletedResultGames.acknowledged)
      //   throw new Error("Failed to delete records");
      if (!insertedResultGames.acknowledged)
        throw new Error("Failed to insert records");
      // if (!deletedResultDates.acknowledged)
      //   throw new Error("Failed to delete records");
      // if (!insertedResultDates.acknowledged)
      //   throw new Error("Failed to insert records");
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const scrapeFromRankingPage = async () => {
  try {
    const result = await fetchRankings();

    if (result) {
      const deletedResult = await deleteAllFromRankings();
      const insertedResult = await createRankings(result);

      if (!deletedResult.acknowledged)
        throw new Error("Failed to delete records");
      if (!insertedResult.acknowledged)
        throw new Error("Failed to insert records");
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const scrapeFromScoresPage = async () => {
  try {
    const result = await fetchScores();

    if (result) {
      const deletedResultGames = await deleteAllFromGames();
      const insertedResult = await createGames(result);

      if (!deletedResultGames.acknowledged)
        throw new Error("Failed to delete records");
      if (!insertedResult.acknowledged)
        throw new Error("Failed to insert records");
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
