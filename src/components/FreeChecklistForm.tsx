import clsx from "clsx";
import { useEffect, useState } from "react";
import type {
  Control,
  UseFieldArrayRemove,
  UseFormRegister,
  SubmitHandler,
  UseFormWatch,
  UseFormUnregister,
  FieldErrorsImpl,
  UseFormReset,
} from "react-hook-form";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { SpanInput } from "../components/SpanInput";
import { Article, Plus, X } from "phosphor-react";
import Button from "../components/Button";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { z } from "zod";
import { notify } from "../utils/notifications";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";

export function FreeChecklistForm() {
  const {
    register,
    unregister,
    control,
    watch,
    handleSubmit,
    resetField,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ChecklistSchema>({
    defaultValues,
    resolver: zodResolver(freeChecklistSchema),
  });

  const { fields: sections, remove } = useFieldArray({
    control,
    name: "sections",
    shouldUnregister: true,
  });

  const router = useRouter();

  const { mutate: createMutation, isLoading } =
    api.checklist.freeCreate.useMutation();

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

        return newSection;
      }),
    };

    createMutation(cleanData, {
      onSuccess: (data) => {
        notify.success("Checklist created succesfully!");
        void router.push(`/${data.id}`);
      },
      onError: (e) => {
        if (e instanceof TRPCClientError) {
          notify.error("Error: " + e.message);
        } else {
          throw e;
        }
      },
    });
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div>
      <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
        <div className="relative mt-3 mb-4 flex flex-col items-center">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange } }) => (
              <SpanInput
                className="bold text-center text-2xl font-bold"
                error={errors.title?.message}
                placeholder="Your Awesome Title Here"
                uniqueClass="checklist-title"
                onChange={onChange}
                autoFocus
              />
            )}
          />
          <p className="mt-1 text-sm text-red-600">{errors.title?.message}</p>
        </div>
        {sections.map((section, sectionIndex) => (
          <div key={section.id}>
            <div
              className={clsx(
                "mb-6 rounded-md border border-solid border-gray-200",
                {
                  "border-red-500":
                    errors.sections?.[sectionIndex]?.tasks?.message,
                }
              )}
            >
              <div className="px-4">
                <TasksInputArray
                  {...{
                    control,
                    register,
                    unregister,
                    sectionIndex,
                    watch,
                    sectionRemove: remove,
                    errors,
                    resetField,
                    clearErrors,
                    reset,
                  }}
                />
              </div>
            </div>
            <p className="text-sm text-red-600">
              {errors.sections?.[sectionIndex]?.tasks?.message}
            </p>
          </div>
        ))}
        <div className="flex justify-center">
          <Button loading={isLoading} type="submit">
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
}

function TasksInputArray({
  sectionIndex,
  control,
  register,
  unregister,
  sectionRemove,
  watch,
  errors,
  reset,
}: {
  sectionIndex: number;
  control: Control<ChecklistSchema>;
  register: UseFormRegister<ChecklistSchema>;
  unregister: UseFormUnregister<ChecklistSchema>;
  sectionRemove: UseFieldArrayRemove;
  watch: UseFormWatch<ChecklistSchema>;
  errors: Partial<FieldErrorsImpl<ChecklistSchema>>;
  reset: UseFormReset<ChecklistSchema>;
}) {
  const {
    fields: tasks,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.tasks`,
  });

  return (
    <>
      {tasks.map((task, taskIndex) => (
        <TaskInput
          key={task.id}
          {...{
            sectionIndex,
            taskIndex,
            register,
            unregister,
            remove,
            sectionRemove,
            watch,
            control,
            errors,
            reset,
          }}
        />
      ))}
      <div className="border-t border-t-gray-200 py-3">
        <button
          className="empty:before:text-gray-40 flex w-fit items-center gap-2 rounded-md border border-transparent px-2 py-1 text-gray-400"
          onClick={() => {
            append({ description: "", title: "" });
            reset(
              {},
              {
                keepValues: true,
              }
            );
          }}
          type="button"
        >
          <Plus />
          <span>Add step...</span>
        </button>
      </div>
    </>
  );
}

function TaskInput({
  sectionIndex,
  taskIndex,
  register,
  unregister,
  remove,
  sectionRemove,
  watch,
  control,
  errors,
}: {
  sectionIndex: number;
  taskIndex: number;
  register: UseFormRegister<ChecklistSchema>;
  unregister: UseFormUnregister<ChecklistSchema>;
  remove: UseFieldArrayRemove;
  sectionRemove: UseFieldArrayRemove;
  watch: UseFormWatch<ChecklistSchema>;
  control: Control<ChecklistSchema>;
  errors: Partial<FieldErrorsImpl<ChecklistSchema>>;
}) {
  const [showDesc, setShowDesc] = useState(false);
  const watchSections = watch("sections");

  useEffect(() => {
    if (!showDesc) {
      unregister(`sections.${sectionIndex}.tasks.${taskIndex}.description`);
    } else {
      register(`sections.${sectionIndex}.tasks.${taskIndex}.description`);
    }
  }, [register, sectionIndex, showDesc, taskIndex, unregister]);

  return (
    <div
      className={clsx(
        "group flex items-baseline gap-4 border-t-gray-200 py-3",
        taskIndex !== 0 ? "border-t" : "border-t-0"
      )}
    >
      <div className="w-full">
        <Controller
          control={control}
          name={`sections.${sectionIndex}.tasks.${taskIndex}.title`}
          render={({ field: { onChange } }) => (
            <SpanInput
              placeholder="Describe the step"
              className="block font-medium text-slate-900"
              uniqueClass="step-title"
              onChange={onChange}
              autoFocus={taskIndex !== 0}
              error={
                errors.sections?.[sectionIndex]?.tasks?.[taskIndex]?.title
                  ?.message
              }
            />
          )}
        />
        <p className="mt-1 text-sm text-red-600">
          {errors.sections?.[sectionIndex]?.tasks?.[taskIndex]?.title?.message}
        </p>

        {showDesc && (
          <>
            <textarea
              placeholder="Add more information..."
              {...register(
                `sections.${sectionIndex}.tasks.${taskIndex}.description`
              )}
              className={clsx(
                "transition-color hover:border-gray-40 mt-1 block w-full rounded-md border border-transparent bg-white px-2 py-1 text-sm text-gray-500",
                {
                  "border-red-500 bg-red-50 outline-none hover:border-red-500 focus-visible:bg-red-50":
                    errors.sections?.[sectionIndex]?.tasks?.[taskIndex]
                      ?.description?.message,
                }
              )}
            />
            <p className="mt-1 text-sm text-red-600">
              {
                errors.sections?.[sectionIndex]?.tasks?.[taskIndex]?.description
                  ?.message
              }
            </p>
          </>
        )}
      </div>
      <div className="flex opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
        <Button
          square
          noBorder
          variant="outline"
          onClick={() => setShowDesc((v) => !v)}
          type="button"
        >
          <Article />
        </Button>
        <Button
          square
          variant="outline"
          noBorder
          type="button"
          onClick={() => {
            remove(taskIndex);

            const lastTaskOnTheSection =
              watchSections[sectionIndex]?.tasks.length === 0;
            // remove the section when user removes the last task on it
            if (sectionIndex > 0 && lastTaskOnTheSection) {
              sectionRemove(sectionIndex);
            }
          }}
        >
          <X />
        </Button>
      </div>
    </div>
  );
}

const defaultValues = {
  title: "",
  sections: [
    {
      tasks: [
        {
          title: "",
          description: "",
        },
      ],
    },
  ],
};

const freeChecklistSchema = z.object({
  title: z
    .string()
    .min(1, "Missing checklist title")
    .max(150, "Checklist title is too long. Please keep it under 150 chars."),
  sections: z
    .array(
      z.object({
        tasks: z
          .array(
            z.object({
              title: z
                .string()
                .min(1, "Task title appears to be empty. Please provide one.")
                .max(100, "Task title must not surpass 100 characters."),
              description: z.string().max(500).optional(),
            })
          )
          .min(2, "Please add another task, a minimum of 2 are required.")
          .max(
            30,
            "There is a limit of 30 tasks per section. If you need more please contact us."
          ),
      })
    )
    .min(1)
    .max(1),
});

type ChecklistSchema = z.infer<typeof freeChecklistSchema>;
