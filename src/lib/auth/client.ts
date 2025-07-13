import { createAuthClient } from "better-auth/solid";

export const { getSession, useSession, signIn, signOut } = createAuthClient();
