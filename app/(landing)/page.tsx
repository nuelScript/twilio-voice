"use client";

import { motion } from "framer-motion";
import { Mic, MessageSquare, BarChart2, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthNavbar } from "@/components/layout/auth/navbar";

export default function LandingPage() {
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
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">
                Transform Your Voice Communications with AI
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
                Harness the power of AI to turn your voice interactions into
                actionable insights. Elevate your communication strategy with
                our cutting-edge platform.
              </p>
              <Link href="/sign-up" passHref>
                <Button
                  size="lg"
                  className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                >
                  Get Started <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm"
                >
                  <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-blue-500 mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
              Ready to Revolutionize Your Voice Communications?
            </h2>
            <Link href="/sign-up" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
              >
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center">
              <Mic className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              <span className="text-lg md:text-xl font-bold text-blue-600 ml-2">
                VoiceAI
              </span>
            </div>
            <p className="text-sm md:text-base text-gray-600 text-center md:text-left">
              &copy; {new Date().getFullYear()} VoiceAI Integration. All Rights
              Reserved
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 items-center text-sm md:text-base">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-blue-600"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-blue-600">
                Terms of Use
              </Link>
              <Link
                href="/cookie"
                className="text-gray-600 hover:text-blue-600"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
