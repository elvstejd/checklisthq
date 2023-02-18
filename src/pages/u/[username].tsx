/* eslint-disable @next/next/no-img-element */
import { TRPCClientError } from "@trpc/client";
import clsx from "clsx";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowRight, SmileyXEyes } from "phosphor-react";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import type { RouterOutputs } from "../../utils/api";
import { client } from "../../utils/api";

const UserProfile: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [profile, setProfile] =
    useState<RouterOutputs["user"]["getPublicProfile"]>();

  const [error, setError] = useState<string>();

  useEffect(() => {
    if (router.isReady) {
      void getProfileData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  async function getProfileData() {
    try {
      const profile = await client.user.getPublicProfile.query({
        username: username as string,
      });
      setProfile(profile);
    } catch (e) {
      if (e instanceof TRPCClientError) {
        setError(e.message);
      } else throw e;
    }
  }
  return (
    <>
      <Head>
        <title>User profile | ChecklistHQ</title>
        <meta name="description" content="Check out this checklist!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex min-h-screen flex-col">
        <main className="flex-grow">
          <div className="mx-auto max-w-2xl px-4">
            {error && <ErrorFrame message={error} />}
            {!profile && !error && <LoadingSkeleton />}
            <div className="h-32 rounded-lg bg-gray-200"></div>
            <div className="-mt-7 flex flex-col items-center justify-center">
              <img
                src={profile?.image ?? "hello"}
                className="aspect-square h-16 rounded-full border-4 border-white object-cover"
                alt="profile picture"
              />
              <p className="text-xl font-bold md:text-2xl">
                {profile?.username}
              </p>
              <p className="mt-1 rounded-md bg-slate-100 p-1 px-2 text-sm text-slate-800">
                {profile?.Checklists.length} checklists
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-4">
              {profile?.Checklists.map((checklist) => (
                <Link
                  href={`/${checklist.id}`}
                  target="_blank"
                  key={checklist.id}
                >
                  <div className="group flex items-center rounded-md border px-4 py-2">
                    <span className="flex-grow"> {checklist.title}</span>
                    <ArrowRight className="transition-colors group-hover:text-blue-600" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
        <div>
          <Footer showReportBtn />
        </div>
      </div>
    </>
  );
};

export default UserProfile;

function LoadingSkeleton() {
  return (
    <div role="status" className="animate-pulse">
      <div className="flex justify-center">
        <div className="mx-24 mb-4 h-8 w-full rounded-md bg-gray-200"></div>
      </div>

      <div className="mb-6 rounded-md border border-solid border-gray-200 px-4">
        {["", "", "", "", "", ""].map((_, k) => (
          <div
            key={k}
            className={clsx(
              "group flex cursor-pointer items-center gap-4 border-t-gray-200 py-3",
              k !== 0 ? "border-t" : "border-t-0"
            )}
          >
            <div className="flex aspect-square h-10 items-center justify-center rounded-full bg-gray-200"></div>
            <div className="w-full">
              <div className="h-4 w-24 rounded-sm bg-gray-200"></div>
              <div className="mt-1 h-8 w-48 rounded-sm bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}

function ErrorFrame({ message }: { message: string }) {
  return (
    <div className="mt-12 flex flex-col items-center">
      <SmileyXEyes size={128} weight="fill" className="mx-auto text-gray-300" />
      <p className="mb-4 text-center text-lg">{message}</p>
      <Link href="/new">
        <Button variant="outline">Create my own checklist instead</Button>
      </Link>
    </div>
  );
}
