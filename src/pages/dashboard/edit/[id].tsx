import { useEffect, useState } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import clsx from "clsx";
import type { RouterOutputs } from "../../../utils/api";
import { api } from "../../../utils/api";
import { client } from "../../../utils/api";
import { Shell } from "../../../components/Shell";
import type { ChecklistSchema } from "../../../components/ChecklistForm";
import { ChecklistForm } from "../../../components/ChecklistForm";
import { Settings } from "../new";
import type { SubmitHandler } from "react-hook-form";
import { useSettingsStore } from "../../../stores";
import { notify } from "../../../utils/notifications";

const Edit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { enableMultipleSections, toggleMultipleSections } = useSettingsStore();
  const [checklist, setChecklist] = useState<
    RouterOutputs["checklist"]["getById"] | undefined
  >();
  const { mutate, isLoading } = api.checklist.update.useMutation();

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

    if (checklist?.sections[0]?.title) {
      toggleMultipleSections(true);
    } else {
      toggleMultipleSections(false);
    }

    setChecklist(checklist);
  }

  const onSubmit: SubmitHandler<ChecklistSchema> = (data) => {
    const cleanData = {
      ...data,
      sections: data.sections.map((section) => {
        const newSection = {
          tasks: section.tasks.map((task) => {
            const newTask = { title: task.title };
            if (task.description) {
              return task;
            }
            return newTask;
          }),
        };

        if (section.title && enableMultipleSections) {
          return { ...newSection, title: section.title };
        }

        return newSection;
      }),
    };

    console.log({ cleanData });

    if (id) {
      mutate(
        { id: id as string, newChecklist: cleanData },
        {
          onSuccess: () => {
            notify.success("Checklist updated succesfully!");
          },
          onError: () => {
            notify.error(
              "An unexpected error happened. If you believe this should not be happening please contact us."
            );
          },
        }
      );
    }
  };

  return (
    <Shell activePath="/dashboard" pageTitle="Edit" backTo="/dashboard">
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4">
        <div className=" md:col-span-8 lg:col-span-9">
          {checklist ? (
            <ChecklistForm
              submitIsLoading={isLoading}
              onSuccesfulSubmit={onSubmit}
              defaultValues={checklist}
              submitLabel="Update"
            />
          ) : (
            <LoadingSkeleton />
          )}
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          <Settings />
        </div>
      </div>
    </Shell>
  );
};

export default Edit;

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
