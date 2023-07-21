import { UNIQUE_COLOR_LIST } from "../api/colors.js";
import { getAllClubs } from "../database/collections/clubs.js";
import { getAllGames } from "../database/collections/games.js";

function filterDuplicates(array) {
  const uniqueNames = new Set();
  return array.filter((item) => {
    if (!uniqueNames.has(item.team)) {
      uniqueNames.add(item.team);
      return true;
    }
    return false;
  });
}

const checkIfClubNamesEqualsMatchTeamNames = async () => {
  try {
    const clubs = await getAllClubs();
    const games = await getAllGames();

    const teams = clubs.map((e) => e.name);

    const notFound = [];
    for (let i = 0; i < games.length; i++) {
      if (!teams.includes(games[i].homeTeam)) notFound.push({ id: games[i].id, team: games[i].homeTeam });
      if (!teams.includes(games[i].awayTeam)) notFound.push({ id: games[i].id, team: games[i].awayTeam });
    }

    return filterDuplicates(notFound);
  } catch (err) {
    console.log(err);
    return { error: "An error occured while comparing the clubs and matches", details: err };
  }
};

const checkIfColorsExist = async (colors) => {
  try {
    const notFound = [];
    for (let i = 0; i < colors.length; i++) {
      if (!UNIQUE_COLOR_LIST.some((e) => e.code === colors[i])) {
        notFound.push(colors[i]);
      }
    }

    return notFound;
  } catch (err) {
    console.log(err);
    return { error: "An error occured while testing if their are new colors", details: err };
  }
};

export const runTests = async ({ colors = [] }) => {
  const result = { message: "The following tests are run, missing data will appear for each test.", tests: { clubs: null, colors: null } };
  result.tests.clubs = await checkIfClubNamesEqualsMatchTeamNames();
  result.tests.colors = await checkIfColorsExist(colors);
  return result;
};
