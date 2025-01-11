import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/twilio";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { phoneNumber, direction } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    let call;

    if (direction === "inbound") {
      call = await client.calls.create({
        url: `${process.env.NEXTAUTH_URL}/api/twilio`,
        to: process.env.TWILIO_PHONE_NUMBER!,
        from: phoneNumber,
      });
    } else {
      call = await client.calls.create({
        url: `${process.env.NEXTAUTH_URL}/api/twilio`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER!,
      });
    }

    return NextResponse.json(
      { message: "Call Initiated", callSid: call.sid },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
