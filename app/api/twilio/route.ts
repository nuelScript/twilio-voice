import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST() {
  try {
    const twiml = new twilio.twiml.VoiceResponse();

    twiml.say(
      "Hello from your AI-driven voice communication app! How can I assist you today?"
    );

    // Record the call
    twiml.record({
      transcribe: true,
      transcribeCallback: "/api/transcription-callback",
      maxLength: 30,
      playBeep: true,
    });

    twiml.say("Thank you for your message. Our AI will analyze it shortly.");

    return new NextResponse(twiml.toString(), {
      headers: {
        "Content-Type": "text/xml",
      },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
