/* eslint-disable @typescript-eslint/no-require-imports */

const http = require("http");
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const twilio = require("twilio");
const { PrismaClient } = require("@prisma/client");
const natural = require("natural");
const url = require("url");

// Initialize Prisma client
const prisma = new PrismaClient();

// Initialize sentiment analyzer
const analyzer = new natural.SentimentAnalyzer(
  "English",
  natural.PorterStemmer,
  "afinn"
);

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

function analyzeSentiment(text) {
  const tokens = new natural.WordTokenizer().tokenize(text);
  const sentiment = analyzer.getSentiment(tokens);
  return {
    score: sentiment,
    magnitude: Math.abs(sentiment),
  };
}

async function handleTranscriptionCallback(transcriptionSid) {
  try {
    const transcription = await twilioClient
      .transcriptions(transcriptionSid)
      .fetch();
    const transcriptionText = transcription.transcriptionText;
    const callSid = transcription.callSid;

    const sentiment = analyzeSentiment(transcriptionText);

    await prisma.transcript.create({
      data: {
        callSid: callSid || "",
        text: transcriptionText,
        sentiment: sentiment.score,
        magnitude: sentiment.magnitude,
      },
    });

    console.log("Transcription saved successfully");
  } catch (error) {
    console.error("Error handling transcription:", error);
  }
}

function handleVoiceRequest(req, res) {
  const twiml = new VoiceResponse();
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const params = new URLSearchParams(body);
    const digits = params.get("Digits");

    console.log(`Received digits: ${digits}`);

    if (digits) {
      switch (digits) {
        case "1":
          console.log("User pressed 1, initiating recording");
          twiml.say("You pressed one. Let's record your message.");
          twiml.record({
            transcribe: true,
            transcribeCallback: "/transcription-callback",
            maxLength: 30,
            playBeep: true,
          });
          break;
        case "2":
          console.log("User pressed 2, providing information");
          twiml.say(
            "You pressed two. Here's some information about our AI-driven voice communication service."
          );
          twiml.say(
            "We use natural language processing to analyze your messages and provide insightful feedback."
          );
          break;
        default:
          console.log(`User pressed invalid option: ${digits}`);
          twiml.say("Sorry, that's not a valid option.");
          break;
      }
    } else {
      console.log("Initial greeting, presenting menu options");
      twiml.say("Welcome to your AI-driven voice communication app!");
      twiml
        .gather({
          numDigits: 1,
          action: "/",
          method: "POST",
        })
        .say(
          "Press 1 to leave a message for AI analysis. Press 2 for more information."
        );
    }

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log(`Received ${req.method} request for ${parsedUrl.pathname}`);

  if (
    (parsedUrl.pathname === "/" || parsedUrl.pathname === "/voice") &&
    req.method === "POST"
  ) {
    handleVoiceRequest(req, res);
  } else if (
    parsedUrl.pathname === "/transcription-callback" &&
    req.method === "POST"
  ) {
    console.log("Received transcription callback");
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const params = new URLSearchParams(body);
      const transcriptionSid = params.get("TranscriptionSid");

      if (transcriptionSid) {
        console.log(`Processing transcription with SID: ${transcriptionSid}`);
        await handleTranscriptionCallback(transcriptionSid);
      } else {
        console.log("No TranscriptionSid found in the callback");
      }

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Transcription callback received");
    });
  } else {
    console.log(`404 for path: ${parsedUrl.pathname}`);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  server.close(() => {
    prisma.$disconnect();
    console.log("Server shut down gracefully");
  });
});
