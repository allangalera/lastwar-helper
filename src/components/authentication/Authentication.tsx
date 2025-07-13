import { createEffect, onMount, Show } from "solid-js";
import { useSession, signOut, signIn } from "../../lib/auth/client";
import { useNavigate } from "@tanstack/solid-router";
import { useQueryClient } from "@tanstack/solid-query";

export function Authentication() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const session = useSession();

  const isAuthenticated = () => !!session().data?.session;
  const isPending = () => session().isPending;

  async function handleSignOut() {
    await signOut();
    queryClient.clear();
    navigate({ to: "/login" });
  }

  async function handleSignInWithGoogle() {
    await signIn.social({
      provider: "google",
    });
  }
  async function handleSignInWithDiscord() {
    await signIn.social({
      provider: "discord",
    });
  }
  return (
    <div>
      <Show when={!isPending()} fallback={<p>loading . . .</p>}>
        <Show
          when={isAuthenticated()}
          fallback={
            <>
              <button onClick={handleSignInWithGoogle}>
                sign in with google
              </button>
              <button onClick={handleSignInWithDiscord}>
                sign in with discord
              </button>
            </>
          }
        >
          <button onClick={handleSignOut}>sign out</button>
        </Show>
      </Show>
    </div>
  );
}
