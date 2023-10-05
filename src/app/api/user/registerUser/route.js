import { User } from "@/Model/UserModel";
import { dbConnect } from "@/app/helper/dbCongfig";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
dbConnect();
export const POST = async (req, res) => {
  const requestBody = await req.json();

  try {
    // check if user is already exists
    const user = await User.findOne({ email: requestBody.email });
    if (user) {
      throw new Error("User Already Exists");
    }

    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(requestBody.password, salt);
    requestBody.password = hashPassword;

    //create user
    await User.create(requestBody);
    return NextResponse.json(
      { message: "User Successfully Created" },
      { status: 201 }
    );
  } catch (error) {
    if (error.message) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 400 }
      );
    }
  }
};
