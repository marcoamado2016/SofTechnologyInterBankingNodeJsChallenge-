import mongoose from "mongoose";
const URL = process.env.MONGODB_ATLAS;
export const conexionDB = async () => {
  try {
    if (URL) await mongoose.connect(URL);
    console.log("CONECTADO A MONGO DB");
  } catch (error) {
    throw new Error();
  }
};
