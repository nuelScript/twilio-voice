export const confirmLink = (token: string, email: string) =>
  `http://localhost:3000/verify-email?token=${token}&email=${encodeURIComponent(
    email
  )}`;

export const resetLink = (token: string, email: string) =>
  `http://localhost:3000/reset-password?token=${token}&email=${encodeURIComponent(
    email
  )}`;
