import { NextRequest, NextResponse } from "next/server";
import { analyzeSentiment } from "@/lib/sentiment";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const transcriptionText = formData.get("TranscriptionText");
  const callSid = formData.get("CallSid");

  if (transcriptionText && callSid) {
    try {
      const sentiment = await analyzeSentiment(transcriptionText.toString());

      await db.transcript.create({
        data: {
          callSid: callSid.toString(),
          text: transcriptionText.toString(),
          sentiment: sentiment.score,
          magnitude: sentiment.magnitude,
        },
      });

      return NextResponse.json({ message: "Transcription saved successfully" });
    } catch (error) {
      console.error("Error saving transcription:", error);
      return NextResponse.json(
        { message: "Error saving transcription" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Invalid transcription data" },
      { status: 400 }
    );
  }
}

export async function GET() {
  return new NextResponse("Method not allowed", { status: 405 });
}
