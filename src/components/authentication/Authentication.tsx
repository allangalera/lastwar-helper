import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { authClient } from "~/auth-client";

export function Authentication() {
  const navigate = useNavigate();
  const session = authClient.useSession();

  const isAuthenticated = () => !!session().data?.session;
  const isPending = () => !!session().isPending;

  async function handleSignOut() {
    await authClient.signOut();
    navigate("/login", { replace: true });
  }

  async function handleSignInWithGoogle() {
    await authClient.signIn.social({
      provider: "google",
    });
  }
  async function handleSignInWithDiscord() {
    await authClient.signIn.social({
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
