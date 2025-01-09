import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  emailVerified: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
