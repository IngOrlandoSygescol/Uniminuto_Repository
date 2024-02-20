import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import connectionPool from "../../../../../config/db";

export async function GET(req: NextRequest) {
  try {

    const [SedesSubSedesRes]: any = await connectionPool.query(`SELECT * FROM subSedes`);
    console.log(SedesSubSedesRes);
    return NextResponse.json(SedesSubSedesRes, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ body: "Internal Server Error" }, { status: 500 });
  }
}
