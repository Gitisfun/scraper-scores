import dbo from "./config.js";

export const insertMany = async (collection, list) => {
  const db = dbo.getDb();
  return await db.collection(collection).insertMany(list);
};

export const findAll = async (collection) => {
  const db = dbo.getDb();
  const result = await db.collection(collection).find().toArray();
  if (result) return result;
  return [];
};

export const findOne = async (collection, search) => {
  const db = dbo.getDb();
  const result = await db.collection(collection).findOne(search);
  if (result) return result;
  return [];
};

export const findMany = async (collection, search) => {
  const db = dbo.getDb();
  const result = await db.collection(collection).find(search).toArray();
  if (result) return result;
  return [];
};

export const deleteAll = async (collection) => {
  const db = dbo.getDb();
  return await db.collection(collection).deleteMany();
};
