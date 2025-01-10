"use client";

import { AuthNavbar } from "@/components/layout/auth/navbar";
import { Separator } from "@/components/ui/separator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Mic, MessageSquare, BarChart2, Lock } from "lucide-react";
import Link from "next/link";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const features = [
    {
      icon: Mic,
      title: "Voice Communication",
      description: "Seamless integration with Twilio for real-time voice calls",
    },
    {
      icon: MessageSquare,
      title: "Transcription",
      description: "Automatic transcription of voice interactions",
    },
    {
      icon: BarChart2,
      title: "Sentiment Analysis",
      description: "Real-time sentiment analysis of voice communications",
    },
    {
      icon: Lock,
      title: "Secure Authentication",
      description: "Protected routes and API endpoints for your data",
    },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen overflow-x-hidden bg-gray-50">
        <AuthNavbar />
        <main className="pt-20">
          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                  AI-Driven Voice Communication Integration
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Welcome to our cutting-edge voice communication platform.
                  Harness the power of AI to transform your voice interactions
                  into actionable insights. Get started by creating your account
                  below.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm"
                  >
                    <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-blue-500 mb-3 md:mb-4" />
                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white p-4 md:p-8 rounded-lg shadow-md flex items-center justify-center">
                {children}
              </div>

              <div className="mt-12 space-y-6">
                <div className="flex items-center justify-center">
                  <Mic className="w-10 h-10 md:w-12 md:h-12 text-blue-600" />
                  <span className="text-xl md:text-2xl font-bold text-blue-600 ml-2">
                    VoiceAI
                  </span>
                </div>
                <Separator />
                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-sm md:text-base">
                  <p className="text-center md:text-left">
                    &copy; {new Date().getFullYear()} VoiceAI Integration. All
                    Rights Reserved
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-end space-x-4 items-center">
                    <Link href="/privacy" className="hover:underline">
                      Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:underline">
                      Terms of Use
                    </Link>
                    <Link href="/cookie" className="hover:underline">
                      Cookie Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </QueryClientProvider>
  );
}
