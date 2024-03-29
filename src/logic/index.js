export const withoutDay = (text) => {
  if (text.includes("maandag")) return text.replace("maandag", "").trim();
  if (text.includes("dinsdag")) return text.replace("dinsdag", "").trim();
  if (text.includes("woensdag")) return text.replace("woensdag", "").trim();
  if (text.includes("donderdag")) return text.replace("donderdag", "").trim();
  if (text.includes("vrijdag")) return text.replace("vrijdag", "").trim();
  if (text.includes("zondag")) return text.replace("zondag", "").trim();
  return text.replace("zaterdag", "").trim();
};

export const reverseText = (text) => {
  return text.split("").reverse().join("");
};

export const withoutJibberish = (text, removedText) => {
  return text.replace(removedText, "").trim();
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

export const removeSubstring = (text, search) => {
  return text.replace(search, "").trim();
};

export const cleanScoreRoundTitle = (text) => {
  return text.replace("expand_moreSpeeldag", "").trim();
};

export const exists = ($, root, element) => {
  return $(root).find(element).length > 0;
};
