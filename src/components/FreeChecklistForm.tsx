import clsx from "clsx";
import type {
  Control,
  UseFieldArrayRemove,
  UseFormRegister,
  SubmitHandler,
  UseFormWatch,
  UseFormUnregister,
} from "react-hook-form";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { SpanInput } from "../components/SpanInput";
import { X } from "phosphor-react";
import Button from "../components/Button";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { z } from "zod";

const defaultValues = {
  title: "",
  sections: [
    {
      tasks: [
        {
          title: "",
        },
      ],
    },
  ],
};

const checklistSchema = z.object({
  title: z.string().min(1),
  sections: z
    .array(
      z.object({
        title: z.string().min(1).optional(),
        tasks: z
          .array(
            z.object({
              title: z.string().min(1),
              description: z.string().min(1).optional(),
            })
          )
          .min(2)
          .max(30),
      })
    )
    .min(1)
    .max(10),
});

type ChecklistSchema = z.infer<typeof checklistSchema>;

export function FreeChecklistForm() {
  const { register, unregister, control, watch, handleSubmit } =
    useForm<ChecklistSchema>({
      defaultValues,
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

        if (section.title) {
          return { ...newSection, title: section.title };
        }

        return newSection;
      }),
    };

    createMutation(cleanData, {
      onSuccess: (data) => {
        void router.push(`/${data.id}`);
      },
    });
  };

  return (
    <div>
      <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
        <div className="relative mt-3 mb-4 flex justify-center">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange } }) => (
              <SpanInput
                className="bold text-center text-2xl font-bold"
                placeholder="Your Awesome Title Here"
                uniqueClass="checklist-title"
                onChange={onChange}
                autoFocus
              />
            )}
          />
        </div>
        {sections.map((section, sectionIndex) => (
          <div
            key={section.id}
            className="mb-6 rounded-md border border-solid border-gray-200"
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
                }}
              />
            </div>
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
}: {
  sectionIndex: number;
  control: Control<ChecklistSchema>;
  register: UseFormRegister<ChecklistSchema>;
  unregister: UseFormUnregister<ChecklistSchema>;
  sectionRemove: UseFieldArrayRemove;
  watch: UseFormWatch<ChecklistSchema>;
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
          }}
        />
      ))}
      <div className="border-t border-t-gray-200 py-3">
        <button
          className="empty:before:text-gray-40 w-fit rounded-md border border-transparent px-2 py-1 text-gray-400"
          onClick={() => append({ description: "", title: "" })}
          type="button"
        >
          Add step...
        </button>
      </div>
    </>
  );
}

function TaskInput({
  sectionIndex,
  taskIndex,
  remove,
  sectionRemove,
  watch,
  control,
}: {
  sectionIndex: number;
  taskIndex: number;
  register: UseFormRegister<ChecklistSchema>;
  unregister: UseFormUnregister<ChecklistSchema>;
  remove: UseFieldArrayRemove;
  sectionRemove: UseFieldArrayRemove;
  watch: UseFormWatch<ChecklistSchema>;
  control: Control<ChecklistSchema>;
}) {
  const watchSections = watch("sections");

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
            />
          )}
        />
      </div>
      <div className="flex opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
        <Button
          square
          variant="outline"
          noBorder
          type="button"
          onClick={() => {
            remove(taskIndex);

            const lastTaskOnTheSection =
              watchSections[sectionIndex]?.tasks.length === 0;

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
