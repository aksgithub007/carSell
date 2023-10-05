import { User } from "@/Model/UserModel";
import { tokenValidation } from "@/app/helper/tokenValidation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const { dbConnect } = require("@/app/helper/dbCongfig");

dbConnect();
export const GET = async (req, res) => {
  //   const cookieStore = cookies();
  //   const token = cookieStore.get("token")?.value;
  const token = req.cookies.get("token")?.value;
  try {
    const userId = await tokenValidation(token);
    // console.log(userId);
    const data = await User.findById(userId).select("-password");
    if (!data) {
      throw new Error("User not available");
    }
    return NextResponse.json(
      { data: data, message: "All User Fetched" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
