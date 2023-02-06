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

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [checklist, setChecklist] = useState<
    RouterOutputs["checklist"]["getById"] | undefined
  >();

  useEffect(() => {
    if (router.isReady) {
      void getChecklistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  async function getChecklistData() {
    const checklist = await client.checklist.getById.query({
      id: id as string,
    });
    setChecklist(checklist);
  }

  return (
    <>
      <Head>
        <title>{checklist?.title ?? "Loading..."} | Omilist</title>
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
            {!checklist && <LoadingSkeleton />}
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

export default Home;

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
