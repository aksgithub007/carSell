import mongoose from "mongoose";
export const dbConnect = async () => {
  try {
    console.log("db Connected");
    return await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error.message);
  }
};
