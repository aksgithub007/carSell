import { User } from "@/Model/UserModel";
import { dbConnect } from "@/app/helper/dbCongfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
dbConnect();

export const POST = async (request, response) => {
  const requestBody = await request.json();
  // console.log(requestBody, "request body");
  //Check user is exist or not
  try {
    const user = await User.findOne({ email: requestBody.email });
    if (!user) {
      throw new Error("User Not Found");
    }
    // console.log(user, "user");
    //Check Password Validation
    const validatePassword = await bcrypt.compare(
      requestBody.password,
      user.password
    );
    // console.log(validatePassword, "validate password");
    if (!validatePassword) {
      throw new Error("Password is Incorrect ");
    }
    const token = jwt.sign({ _id: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });
    // console.log(token, "token");
    if (token) {
      cookies().set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: "1d",
      });
    }
    return NextResponse.json(
      { data: user, message: "Login Successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
