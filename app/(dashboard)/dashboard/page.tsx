"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Transcript } from "@/types";
import axios from "axios";
import { PuffLoader } from "react-spinners";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { data: session } = useSession();

  const {
    data: transcripts = [],
    isPending: transcriptPending,
    error: transcriptError,
  } = useQuery<Transcript[]>({
    queryKey: ["transcripts", session?.user?.email],
    queryFn: async () => {
      const response = await axios.get("/api/transcripts");

      return response.data.transcripts;
    },
    enabled: !!session,
    retry: 1,
  });

  const chartData = {
    labels: transcripts.map((t) => new Date(t.createdAt).toLocaleString()),
    datasets: [
      {
        label: "Sentiment Score",
        data: transcripts.map((t) => t.sentiment),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  if (transcriptPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader color="blue" />
      </div>
    );
  }

  if (transcripts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Voice Communication Dashboard
        </h1>
        <div className="text-center text-gray-500">
          <p>No transcripts available at the moment.</p>
        </div>
      </div>
    );
  }

  if (transcriptError) {
    return (
      <div className="flex items-center justify-center h-screen">
        Error loading data. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Voice Communication Dashboard</h1>
      {transcripts.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No transcripts available at the moment.</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Sentiment Analysis</h2>
            <Line data={chartData} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Recent Transcripts</h2>
            <ul className="space-y-4">
              {transcripts.map((transcript) => (
                <li key={transcript.id} className="border p-4 rounded">
                  <p className="font-semibold">
                    {new Date(transcript.createdAt).toLocaleString()}
                  </p>
                  <p>{transcript.text}</p>
                  <p className="text-sm text-gray-600">
                    Sentiment: {transcript.sentiment.toFixed(2)} | Magnitude:{" "}
                    {transcript.magnitude.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
