import { fetchClubs } from "../api/clubs.js";
import { fetchGamesAndDates } from "../api/games.js";
import { fetchRankings } from "../api/rankings.js";
import { fetchScores } from "../api/scores.js";
import { createClubs, deleteAllFromClubs } from "../database/collections/clubs.js";
import { createDates, deleteAllFromDates } from "../database/collections/dates.js";
import { createGames, deleteAllFromGames } from "../database/collections/games.js";
import { createRankings, deleteAllFromRankings } from "../database/collections/rankings.js";

const removeDuplicateGames = (games, scores) => {
  const duplicateIds = [];

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    for (let j = 0; j < scores.length; j++) {
      const score = scores[j];
      if (game?.id === score?.id) {
        duplicateIds.push(game?.id);
        score.time = game.time;
      }
    }
  }

  const tempGames = games.filter((x) => !duplicateIds.includes(x.id));

  return [...tempGames, ...scores];
};

const removeDuplicateDates = (data) => {
  const uniqueMap = {};

  const uniqueArray = data.filter((obj) => {
    // Use the 'id' property as the key for checking uniqueness
    const key = obj.round;

    // If the key is not in the uniqueMap, add it and return true (to keep the object)
    if (!uniqueMap[key]) {
      uniqueMap[key] = true;
      return true;
    }

    // If the key is already in the uniqueMap, return false (to filter out the duplicate)
    return false;
  });
  return uniqueArray;
};

export const scrapeAllGames = async () => {
  try {
    const games = await fetchGamesAndDates();
    const scores = await fetchScores();

    const allDates = [...games.dates, ...scores.dates];

    const allGamesWithoutDuplicates = removeDuplicateGames(games.games, scores.games);
    const allDatesWithoutDuplicates = removeDuplicateDates(allDates);

    if (allGamesWithoutDuplicates && allDatesWithoutDuplicates) {
      const deletedResultGames = await deleteAllFromGames();
      const insertedResultGames = await createGames(allGamesWithoutDuplicates);
      const deletedResultDates = await deleteAllFromDates();
      const insertedResultDates = await createDates(allDatesWithoutDuplicates);

      if (!deletedResultDates.acknowledged) throw new Error("Failed to delete dates");
      if (!deletedResultGames.acknowledged) throw new Error("Failed to delete records");
      if (!insertedResultGames.acknowledged) throw new Error("Failed to insert records");
      if (!insertedResultDates.acknowledged) throw new Error("Failed to insert dates");
    }

    return allGamesWithoutDuplicates;
  } catch (err) {
    return false;
  }
};

export const scrapeFromRankingPage = async () => {
  try {
    const result = await fetchRankings();

    if (result) {
      const deletedResult = await deleteAllFromRankings();
      const insertedResult = await createRankings(result);

      if (!deletedResult.acknowledged) throw new Error("Failed to delete records");
      if (!insertedResult.acknowledged) throw new Error("Failed to insert records");
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const scrapeFromClubsPage = async () => {
  try {
    const result = await fetchClubs();

    if (result) {
      const deletedResult = await deleteAllFromClubs();
      const insertedResult = await createClubs(result);

      if (!deletedResult.acknowledged) throw new Error("Failed to delete records");
      if (!insertedResult.acknowledged) throw new Error("Failed to insert records");
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const loadInitialData = async () => {
  await scrapeFromClubsPage();
  await scrapeAllGames();
  await scrapeFromRankingPage();
};

export const refreshData = async () => {
  //await scrapeFromClubsPage();
  await scrapeAllGames();
  await scrapeFromRankingPage();
};
