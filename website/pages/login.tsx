import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const session = useSession();
  const supabase = useSupabaseClient();

  const redirectRoute = "/restricted/chat-gpt";

  if (session) {
    router.replace(redirectRoute);
    return null;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-lg px-12 py-4 max-w-sm w-full">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']}
          theme="dark"
          socialLayout="horizontal"
          redirectTo={redirectRoute}
          showLinks={false}
        />
      </div>
    </div>
  );
}
