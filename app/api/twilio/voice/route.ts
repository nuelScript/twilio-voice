import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const VoiceResponse = twilio.twiml.VoiceResponse;

export async function POST(request: NextRequest) {
  const twiml = new VoiceResponse();
  const formData = await request.formData();
  const digits = formData.get("Digits");

  if (digits) {
    switch (digits) {
      case "1":
        twiml.say("You pressed one. Let's record your message.");
        twiml.record({
          transcribe: true,
          transcribeCallback: "/api/twilio/transcription-callback",
          maxLength: 30,
          playBeep: true,
        });
        break;
      case "2":
        twiml.say(
          "You pressed two. Here's some information about our AI-driven voice communication service."
        );
        twiml.say(
          "We use advanced natural language processing to analyze your messages and provide insightful feedback."
        );
        break;
      default:
        twiml.say("Sorry, that's not a valid option.");
        break;
    }
  } else {
    twiml.say("Welcome to your AI-driven voice communication app!");
    twiml
      .gather({
        numDigits: 1,
        action: "/api/twilio/voice",
        method: "POST",
      })
      .say(
        "Press 1 to leave a message for AI analysis. Press 2 for more information."
      );
  }

  return new NextResponse(twiml.toString(), {
    headers: { "Content-Type": "text/xml" },
  });
}

export async function GET() {
  return new NextResponse("Method not allowed", { status: 405 });
}
