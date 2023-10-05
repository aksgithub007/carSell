import { NextResponse } from "next/server";

export const GET = async (res) => {
  try {
    const response = NextResponse.json(
      { data: null, message: "Logout Successfully" },
      { status: 200 }
    );
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};
