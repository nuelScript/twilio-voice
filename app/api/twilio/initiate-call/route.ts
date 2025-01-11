import { NextRequest, NextResponse } from "next/server";
import twilio from "@/lib/twilio";

export async function POST(request: NextRequest) {
  const { phoneNumber, direction } = await request.json();

  if (!phoneNumber) {
    return NextResponse.json(
      { message: "Phone number is required" },
      { status: 400 }
    );
  }

  try {
    let call;
    if (direction === "inbound") {
      call = await twilio.calls.create({
        url: `${process.env.NEXTAUTH_URL}/api/twilio`,
        to: process.env.TWILIO_PHONE_NUMBER!,
        from: phoneNumber,
      });
    } else {
      call = await twilio.calls.create({
        url: `${process.env.NEXTAUTH_URL}/api/twilio`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER!,
      });
    }

    return NextResponse.json({ message: "Call initiated", callSid: call.sid });
  } catch (error) {
    console.error("Error initiating call:", error);
    return NextResponse.json(
      { message: "Error initiating call" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return new NextResponse("Method not allowed", { status: 405 });
}
