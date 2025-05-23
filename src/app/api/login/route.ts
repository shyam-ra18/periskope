import { NextResponse } from "next/server";
import { generateToken } from "@/utils/generateToken";
import Cookies from "js-cookie";

export async function POST(req: Request) {
  const body = await req.json();
  const { user } = body;

  if (!user || !user.email || !user.id) {
    return NextResponse.json(
      { success: false, message: "Invalid user data" },
      { status: 400 }
    );
  }

  const token = generateToken(user);

  const response = NextResponse.json({ success: true });

  // Set secure HttpOnly cookie
  response.cookies.set("access_token", token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return response;
}
