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
import { SimpleChecklistForm } from "../../components/SimpleChecklistForm";

export default function New() {
  const {
    enableMultipleSections,
    toggleMultipleSections,
    setPublishAsPublic,
    publishAsPublic,
  } = useSettingsStore();
  const { mutate, isLoading } = api.checklist.create.useMutation();
  const router = useRouter();

  useEffect(() => {
    toggleMultipleSections(false);
    setPublishAsPublic(false);
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

    mutate(
      { schema: cleanData, isPublic: publishAsPublic },
      {
        onSuccess: (data) => {
          notify.success("Checklist created succesfully!");
          void router.push(`/${data.id}`);
        },
        onError: () => {
          notify.error(
            "An unexpected error happened. If you believe this should not be happening please contact us."
          );
        },
      }
    );
  };

  return (
    <Shell
      pageTitle="New checklist"
      backTo="/dashboard"
      activePath="/dashboard"
    >
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4">
        <div className=" md:col-span-8 lg:col-span-9">
          {enableMultipleSections ? (
            <ChecklistForm
              onSuccesfulSubmit={onSubmit}
              submitIsLoading={isLoading}
            />
          ) : (
            <SimpleChecklistForm
              onSuccesfulSubmit={onSubmit}
              submitIsLoading={isLoading}
            />
          )}
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          <Settings />
        </div>
      </div>
    </Shell>
  );
}

export function Settings({ id }: { id?: string }) {
  const {
    enableMultipleSections,
    toggleMultipleSections,
    publishAsPublic,
    setPublishAsPublic,
  } = useSettingsStore();

  const { mutate, isLoading } = api.checklist.update.useMutation();

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
          value={publishAsPublic}
          loading={isLoading}
          onChange={(value) => {
            setPublishAsPublic(value);
            if (id)
              mutate(
                { id, isPublic: value },
                {
                  onSuccess: () =>
                    notify.success("Checklist visibility updated!"),
                  onError: (e) => {
                    if (e instanceof TRPCClientError) {
                      notify.error("Error: " + e.message);
                    }
                  },
                }
              );
          }}
          label="Set public"
          description="When enabled, the checklist will show on your public profile."
        />
      </div>
    </>
  );
}
