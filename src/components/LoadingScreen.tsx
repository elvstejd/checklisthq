import Head from "next/head";
import { Spinner } from "phosphor-react";

export function LoadingScreen() {
  return (
    <>
      <Head>
        <title>ChecklistHQ</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size={28} className="animate-spin" />
      </div>
    </>
  );
}
