import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { LoadingScreen } from "../components/LoadingScreen";
import { env } from "../env/client.mjs";
import { api } from "../utils/api";
import { notify } from "../utils/notifications";

export default function Auth() {
  const { data } = useSession();
  const [loading, setLoading] = useState(true);
  const { data: me } = api.user.getMe.useQuery();
  const router = useRouter();

  useEffect(() => {
    if (!me) return;
    if (me.username) {
      void router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [me, router]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-10 w-full max-w-2xl rounded-md p-4 py-6 md:border md:shadow-md">
        <h1 className="mb-6 text-center text-xl font-semibold">
          No account associated with this email address. Do you want to create a
          new account?
        </h1>
        <div className="mx-auto mb-6 w-full max-w-sm rounded-md border p-3 shadow-sm">
          <p className="text-center">{data?.user?.email}</p>
        </div>
        <div className="mx-auto flex max-w-xs justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              void signOut({ callbackUrl: env.NEXT_PUBLIC_HOST + "/" });
              notify.success("No problem!");
            }}
          >
            No, thank you
          </Button>
          <Button onClick={() => void router.push("/onboarding")}>Yes!</Button>
        </div>
      </div>
    </div>
  );
}
