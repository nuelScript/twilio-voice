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
DATABASE_URL=""
AUTH_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
NEXTAUTH_URL=""
EMAIL_ADDRESS="" # I made use of Google third party apps to send emails using nodemailer
APP_PASSWORD=""
TWILIO_PHONE_NUMBER=""
```

4. Set up the database:

```bash
npx prisma generate
npx prisma db push

# or

bunx prisma generate
bunx prisma db push
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Usage

1. Sign up or log in to the application.
2. Navigate to the dashboard to view transcripts and sentiment analysis.
3. To make a voice call, use the Twilio API to initiate a call to your application's voice endpoint.

## API Endpoints

- `/api/auth/*`: Authentication endpoints (handled by NextAuth.js)
- `/api/twilio/voice`: Handles incoming voice calls
- `/api/twilio/initiate-call`: Handles outgoing calls (Not properly working yet)
- `/api/transcripts`: Fetches stored transcripts
- `/api/transcription-callback`: Handles the transcription of recorded calls and stores the transcript in the database

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.