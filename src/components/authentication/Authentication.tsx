import { Show } from "solid-js";
import { authClient } from "~/auth-client";

export function Authentication() {
  const session = authClient.useSession();

  const isAuthenticated = () => !!session().data?.session;
  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          //   router.push("/login"); // redirect to login page
        },
      },
    });
  }

  async function handleSignIn() {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  }
  return (
    <div>
      <Show
        when={isAuthenticated()}
        fallback={<button onClick={handleSignIn}>sign in with google</button>}
      >
        <button onClick={handleSignOut}>sign out</button>
      </Show>
    </div>
  );
}
