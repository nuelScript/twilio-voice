"use client";

import { Transcript } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callStatus, setCallStatus] = useState("");
  const [callDirection, setCallDirection] = useState<"inbound" | "outbound">(
    "outbound"
  );

  const {
    data: transcripts = [],
    isPending: transcriptPending,
    error: transcriptError,
  } = useQuery<Transcript[]>({
    queryKey: ["transcripts", session?.user?.id],
    queryFn: async () => {
      const response = await axios.get("/api/transcripts");

      return response.data;
    },
    enabled: !!session,
    retry: 1,
  });

  async function initiateCall(e: React.FormEvent) {
    e.preventDefault();
    setCallStatus("Initiating call...");

    try {
      const response = await fetch("/api/twilio/initiate-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, direction: callDirection }),
      });

      const data = await response.json();

      if (response.ok) {
        setCallStatus(`Call initiated successfully. Call SID: ${data.callSid}`);
        setPhoneNumber("");
      } else {
        setCallStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setCallStatus("Error initiating call");
      console.error("Error initiating call:", error);
    }
  }

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
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Initiate Call</h2>
          <form
            onSubmit={initiateCall}
            className="flex flex-col md:flex-row md:items-center space-x-0 space-y-4 md:space-y-0 md:space-x-4"
          >
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="flex-grow px-4 py-2 border rounded"
              required
            />
            <select
              value={callDirection}
              onChange={(e) =>
                setCallDirection(e.target.value as "inbound" | "outbound")
              }
              className="px-4 py-2 border rounded"
            >
              <option value="outbound">Outbound</option>
              <option value="inbound">Inbound (Simulate)</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Call
            </button>
          </form>
          {callStatus && (
            <p className="mt-2 text-sm text-gray-600">{callStatus}</p>
          )}
        </div>
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
            <h2 className="text-2xl font-semibold mb-4">Initiate Call</h2>
            <form
              onSubmit={initiateCall}
              className="flex items-center space-x-4"
            >
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
                className="flex-grow px-4 py-2 border rounded"
                required
              />
              <select
                value={callDirection}
                onChange={(e) =>
                  setCallDirection(e.target.value as "inbound" | "outbound")
                }
                className="px-4 py-2 border rounded"
              >
                <option value="outbound">Outbound</option>
                <option value="inbound">Inbound (Simulate)</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Call
              </button>
            </form>
            {callStatus && (
              <p className="mt-2 text-sm text-gray-600">{callStatus}</p>
            )}
          </div>
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
