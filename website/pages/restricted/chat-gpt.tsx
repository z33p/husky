import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function ChatGpt() {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const session = useSession();

  if (session)
    return (
      <div className="">
        <h1>Hello world {session.user.email}</h1>

        <button
          onClick={async () => {
            await supabaseClient.auth.signOut()
            router.push('/login')
          }}
        >
          Logout
        </button>
      </div>
    );

  return null;
}