# AI-Driven Voice Communication Integration

This project implements an AI-driven voice communication integration using the Twilio Programmable Voice API, Next.js, and PostgreSQL. It includes features such as real-time voice communication, transcription storage, sentiment analysis, and a dashboard to visualize interaction data.

## Features

- Real-time voice communication using Twilio Programmable Voice API
- Transcription of voice interactions stored in PostgreSQL
- JWT authentication for securing API endpoints
- Real-time speech sentiment analysis using Google Cloud Natural Language API
- Dashboard UI to visualize transcripts and interaction data

## Prerequisites

- Node.js (v14 or later)
- PostgreSQL database
- Twilio account with Programmable Voice API access
- Google Cloud account with Natural Language API enabled

## Setup

1. Clone the repository:

```bash
git clone [https://github.com/your-username/voice-communication-integration.git](https://github.com/your-username/voice-communication-integration.git)
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```


3. Set up environment variables:
Create a `.env.local` file in the root directory and add the following variables:

```bash
DATABASE_URL=your_postgresql_connection_string
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
GOOGLE_APPLICATION_CREDENTIALS=path_to_your_google_cloud_credentials_json
NEXTAUTH_SECRET=your_nextauth_secret
```