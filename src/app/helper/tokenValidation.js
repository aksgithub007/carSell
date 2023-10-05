import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export const tokenValidation = async (token) => {
  //   console.log(token, "token");
  try {
    if (!token) {
      throw new Error("Token not found");
    }
    const decodedToken = jwt.verify(token, process.env.jwt_secret);
    // console.log(decodedToken, "decode token");
    const userId = await decodedToken._id;
    // console.log(userId, "user id");
    return userId;
  } catch (error) {
    return error;
  }
};
