/* eslint-disable @next/next/no-img-element */
import { TRPCClientError } from "@trpc/client";
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
            {profile && (
              <>
                <div className="h-32 rounded-lg bg-gray-100"></div>
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
                <div className="mt-10 flex flex-col gap-3">
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
              </>
            )}
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
    <>
      <div className="animate-pulse h-32 rounded-lg bg-gray-100"></div>
      <div className="animate-pulse -mt-7 flex flex-col items-center justify-center">
        <div className="animate-pulse aspect-square h-16 rounded-full border-4 border-white bg-gray-100" />
        <p className="animate-pulse h-7 w-40 rounded-md bg-gray-100 text-xl font-bold md:text-2xl"></p>
        <p className="animate-pulse mt-1 h-6 w-28 rounded-md bg-slate-100 p-1 px-2 text-sm text-slate-800"></p>
      </div>
      <div className="mt-10 flex flex-col gap-2">
        {["", "", ""].map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse group flex h-10 items-center rounded-md bg-gray-100"
          ></div>
        ))}
      </div>
    </>
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
