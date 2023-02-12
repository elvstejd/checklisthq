import React, { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { TextInput } from "../components/TextInput";
import { api } from "../utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Spinner } from "phosphor-react";
import { useRouter } from "next/router";
import Head from "next/head";
import { notify } from "../utils/notifications";

const schema = z.object({
  username: z
    .string()
    .min(4, "Username is too short, try a longer one.")
    .max(32, "Username is too long, remove some characters.")
    .regex(/^[a-zA-Z0-9]+$/, "Remove spaces, underscores and/or dashes."),
});

type SchemaType = z.infer<typeof schema>;

export default function Onboarding() {
  const [allSet, setAllSet] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const { mutate: setUsername, isLoading } = api.user.setUsername.useMutation();
  const router = useRouter();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (allSet) {
      timeout = setTimeout(() => {
        void router.push("/dashboard");
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [allSet, router]);

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    setUsername(data, {
      onSuccess: () => {
        setAllSet(true);
      },
      onError: (data) => {
        notify.error(data.message);
      },
    });
    return;
  };

  return (
    <>
      <Head>
        <title>Welcome to ChecklistHQ!</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="mb-10 w-full max-w-2xl rounded-md p-4 py-6 transition-all md:border md:shadow-md">
          {!allSet ? (
            <div>
              <h1 className="text-center text-2xl font-semibold">
                Almost there...
              </h1>
              <p className="mb-10 text-center text-gray-500">
                We just need you to pick good a username. 😎
              </p>
              <form
                onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
              >
                <input
                  autoComplete="false"
                  name="hidden"
                  type="text"
                  className="hidden"
                ></input>
                <TextInput
                  {...register("username")}
                  error={errors.username?.message}
                  autoFocus
                />
                <div className="mt-2">
                  <Button type="submit" loading={isLoading}>
                    Continue
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h1 className="text-center text-2xl font-semibold">All set!</h1>
              <p className="mb-10 text-center text-gray-500">
                Redirecting you to the dashboard...
              </p>
              <div className="flex justify-center">
                <Spinner size={24} className="animate-spin" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
