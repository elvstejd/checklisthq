import { type NextPage } from "next";
import Head from "next/head";
import Item from "../components/Item";
import { useRouter } from "next/router";
import type { RouterOutputs } from "../utils/api";
import { client } from "../utils/api";
import { useEffect, useState } from "react";
import { Brand } from "../components/Brand";
import { Footer } from "../components/Footer";
import clsx from "clsx";
import { TRPCClientError } from "@trpc/client";
import { SmileyXEyes } from "phosphor-react";
import Button from "../components/Button";
import Link from "next/link";

const ChecklistView: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [checklist, setChecklist] =
    useState<RouterOutputs["checklist"]["getById"]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (router.isReady) {
      void getChecklistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  async function getChecklistData() {
    try {
      const checklist = await client.checklist.getById.query({
        id: id as string,
      });
      setChecklist(checklist);
    } catch (e) {
      if (e instanceof TRPCClientError) {
        setError(e.message);
      } else throw e;
    }
  }

  return (
    <>
      <Head>
        <title>{checklist?.title ?? "Loading..."} | ChecklistHQ</title>
        <meta name="description" content="Check out this checklist!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col">
        <header>
          <div className="mx-auto my-8 flex max-w-2xl items-center justify-center px-4">
            <Brand />
          </div>
        </header>
        <main className="flex-grow">
          <div className="mx-auto max-w-2xl px-4">
            {error && <ErrorFrame message={error} />}
            {!checklist && !error && <LoadingSkeleton />}
            <h1 className="bold mb-4 text-center text-2xl font-bold">
              {checklist?.title}
            </h1>
            {checklist?.sections?.map((section, idx) => (
              <div
                key={idx}
                className="mb-6 rounded-md border border-solid border-gray-200"
              >
                {section.title && (
                  <div className="border-b py-3 px-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {section.title}
                    </h2>
                  </div>
                )}
                <div className="px-4">
                  {section.tasks.map((task, idx) => (
                    <Item
                      key={idx}
                      title={task.title}
                      done={false}
                      description={task.description}
                      isFirst={idx !== 0}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
        <div className="">
          <Footer showReportBtn />
        </div>
      </div>
    </>
  );
};

export default ChecklistView;

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
