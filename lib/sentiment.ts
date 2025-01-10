import { LanguageServiceClient } from "@google-cloud/language";

const client = new LanguageServiceClient();

export async function analyzeSentiment(text: string) {
  const document = {
    content: text,
    type: "PLAIN_TEXT" as const,
  };

  const [result] = await client.analyzeSentiment({ document });
  const sentiment = result.documentSentiment;

  return {
    score: sentiment?.score ?? 0,
    magnitude: sentiment?.magnitude ?? 0,
  };
}
