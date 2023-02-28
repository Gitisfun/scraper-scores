import { LEAGUES } from "./constants/leagues.js";

export const checkIfInTeamsList = (text, league) => {
  for (const team of LEAGUES[league].teams) {
    if (text.includes(team)) {
      return true;
    }
  }
  return false;
};

export const withoutDay = (text) => {
  return text.replace("zaterdag", "").trim();
};

export const withoutLeague = (text) => {
  return text.replace("Klassement", "").trim();
};

export const getHomeScore = (score) => {
  let temp = score.substr(0, score.indexOf("-")).trim();
  return temp.replace(/\D/g, "");
};

export const getAwayScore = (score) => {
  let temp = score.substr(score.indexOf("-") + 1).trim();
  return temp.replace(/\D/g, "");
};

export const formatTime = (time) => {
  if (time.includes(".")) return time.replace(".", ":");
  return time;
};

export const cleanScoreRoundTitle = (text) => {
  return text.replace("expand_moreSpeeldag", "").trim();
};
