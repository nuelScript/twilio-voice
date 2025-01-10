import { db } from "@/lib/db";
import { analyzeSentiment } from "@/lib/sentiment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { TranscriptionText, CallSid } = await req.json();

  if (TranscriptionText && CallSid) {
    try {
      const sentiment = await analyzeSentiment(TranscriptionText);

      await db.transcript.create({
        data: {
          callSid: CallSid,
          text: TranscriptionText,
          sentiment: sentiment.score,
          magnitude: sentiment.magnitude,
        },
      });

      return NextResponse.json(
        { message: "Transcription saved successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error saving transcription:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Transcription text or CallSid missing" },
      { status: 400 }
    );
  }
}
