import React, { useEffect } from "react";
import type { ChecklistSchema } from "../../components/ChecklistForm";
import { ChecklistForm } from "../../components/ChecklistForm";
import { Shell } from "../../components/Shell";
import { useSettingsStore } from "../../stores";
import { Toggle } from "../../components/Toggle";
import type { SubmitHandler } from "react-hook-form";
import { api } from "../../utils/api";
import { notify } from "../../utils/notifications";
import { useRouter } from "next/router";
import { TRPCClientError } from "@trpc/client";

export default function New() {
  const { enableMultipleSections, toggleMultipleSections } = useSettingsStore();
  const { mutate, isLoading } = api.checklist.create.useMutation();
  const router = useRouter();

  useEffect(() => {
    toggleMultipleSections(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    mutate(cleanData, {
      onSuccess: (data) => {
        notify.success("Checklist created succesfully!");
        void router.push(`/${data.id}`);
      },
      onError: (e) => {
        if (e instanceof TRPCClientError) {
          notify.error("Error: " + e.message);
        } else {
          console.log(e);
          throw e;
        }
      },
    });
  };

  return (
    <Shell
      pageTitle="New checklist"
      backTo="/dashboard"
      activePath="/dashboard"
    >
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4">
        <div className=" md:col-span-8 lg:col-span-9">
          <ChecklistForm
            onSuccesfulSubmit={onSubmit}
            submitIsLoading={isLoading}
          />
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          <Settings />
        </div>
      </div>
    </Shell>
  );
}

export function Settings() {
  const { enableMultipleSections, toggleMultipleSections } = useSettingsStore();

  return (
    <>
      <h2 className="mt-8 mb-4 text-sm font-bold text-gray-400">SETTINGS</h2>
      <div className="flex flex-col gap-2 rounded-md border p-4">
        <Toggle
          value={enableMultipleSections}
          onChange={(value) => toggleMultipleSections(value)}
          label="Multiple sections"
          description="Allows you to break steps down into different sections, recommended for complex checklists."
        />
        <Toggle
          value={false}
          onChange={() => null}
          label="Publish as temporary"
          description="Checklist will be anonymous and deleted in 24 hours."
        />
      </div>
    </>
  );
}
