import natural from "natural";

const analyzer = new natural.SentimentAnalyzer(
  "English",
  natural.PorterStemmer,
  "afinn"
);

export async function analyzeSentiment(text: string) {
  const tokens = new natural.WordTokenizer().tokenize(text);
  const sentiment = analyzer.getSentiment(tokens);

  return {
    score: sentiment,
    magnitude: Math.abs(sentiment),
  };
}
