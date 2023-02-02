import Link from "next/link";
import { EnvelopeSimple } from "phosphor-react";
import React from "react";
import Button from "../components/Button";
import { signIn } from "next-auth/react";
import { env } from "../env/client.mjs";

export default function SignUp() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-10 w-full max-w-2xl rounded-md p-4 py-6 md:border md:shadow-md">
        <h1 className="mb-14 text-center text-2xl font-semibold">
          Create Your RepeatList Account
        </h1>
        <div className="mx-auto flex max-w-xs flex-col gap-2">
          <Button
            variant="outline"
            onClick={() =>
              void signIn("google", {
                callbackUrl: env.NEXT_PUBLIC_HOST + "/onboarding",
              })
            }
          >
            <div className="flex items-center">
              {googleIcon}
              Continue with Google
            </div>
          </Button>
          <Button variant="outline">
            <div className="flex items-center">
              <EnvelopeSimple size={25} className="mr-3" />
              Continue with Email
            </div>
          </Button>
        </div>
        <div className="mt-8 text-center text-sm">
          <span>Already have an account?</span>
          <Link href="/login">
            <span className="ml-2 font-bold text-blue-600">Log In instead</span>
          </Link>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          <span>
            By completing this registration process, you agree to RepeatList’s{" "}
          </span>
          <Link href="/terms">
            <span className="underline">Terms of Service</span>
          </Link>
          <span> and acknowledge that </span>
          <span>RepeatList’s </span>
          <Link href="/privacy">
            <span className="underline">Privacy Policy</span>
          </Link>
          <span> applies to you.</span>
        </div>
      </div>
    </div>
  );
}

const googleIcon = (
  <div className="mr-3">
    <svg width="25" height="25">
      <g fill="none" fill-rule="evenodd">
        <path
          d="M20.66 12.7c0-.61-.05-1.19-.15-1.74H12.5v3.28h4.58a3.91 3.91 0 0 1-1.7 2.57v2.13h2.74a8.27 8.27 0 0 0 2.54-6.24z"
          fill="#4285F4"
        ></path>
        <path
          d="M12.5 21a8.1 8.1 0 0 0 5.63-2.06l-2.75-2.13a5.1 5.1 0 0 1-2.88.8 5.06 5.06 0 0 1-4.76-3.5H4.9v2.2A8.5 8.5 0 0 0 12.5 21z"
          fill="#34A853"
        ></path>
        <path
          d="M7.74 14.12a5.11 5.11 0 0 1 0-3.23v-2.2H4.9A8.49 8.49 0 0 0 4 12.5c0 1.37.33 2.67.9 3.82l2.84-2.2z"
          fill="#FBBC05"
        ></path>
        <path
          d="M12.5 7.38a4.6 4.6 0 0 1 3.25 1.27l2.44-2.44A8.17 8.17 0 0 0 12.5 4a8.5 8.5 0 0 0-7.6 4.68l2.84 2.2a5.06 5.06 0 0 1 4.76-3.5z"
          fill="#EA4335"
        ></path>
      </g>
    </svg>
  </div>
);
