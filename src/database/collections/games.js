import { findAll, findMany, insertMany, deleteAll } from "../queries.js";
import { GAMES_COLLECTION } from "../../logic/constants/collections.js";

export const createGames = async (list) => {
  return await insertMany(GAMES_COLLECTION, list);
};

export const getGames = async (search) => {
  return await findMany(GAMES_COLLECTION, search);
};

export const getAllGames = async () => {
  return await findAll(GAMES_COLLECTION);
};

export const deleteAllFromGames = async () => {
  return await deleteAll(GAMES_COLLECTION);
};
