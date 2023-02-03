import Head from "next/head";
import { SettingsMenu } from "../components/SettingsMenu";
import { Brand } from "../components/Brand";
import { ChecklistForm } from "../components/ChecklistForm";

export default function New() {
  return (
    <>
      <Head>
        <title>Create new checklist</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto max-w-2xl px-4">
          <div className="my-4 flex items-center justify-between">
            <Brand />
            <SettingsMenu />
          </div>
          <ChecklistForm />
        </div>
      </main>
    </>
  );
}
