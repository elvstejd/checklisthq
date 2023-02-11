import { Disclosure, Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowLeft, List, SignOut, User, X } from "phosphor-react";
import { Fragment, useEffect } from "react";
import { Brand } from "../components/Brand";
import { env } from "../env/client.mjs";
import { LoadingScreen } from "./LoadingScreen";

interface ShellProps {
  pageTitle: string;
  pageDescription?: string;
  activePath: NavPath;
  children?: JSX.Element | JSX.Element[];
  backTo?: NavPath;
}

export function Shell({
  children,
  pageTitle,
  pageDescription,
  activePath,
  backTo,
}: ShellProps) {
  const { status, data } = useSession();

  if (status === "loading") return <LoadingScreen />;
  if (status === "unauthenticated") return <RedirectToDashboard />;

  return (
    <>
      <Head>
        <title>{pageTitle} | Omilist</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <Brand />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={clsx(
                            item.href === activePath
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                          )}
                          aria-current={
                            item.href === activePath ? "page" : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <User className="h-8 w-8 rounded-full text-gray-400" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={clsx(
                                  active ? "bg-gray-100" : "",
                                  "flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={() =>
                                  void signOut({
                                    callbackUrl: env.NEXT_PUBLIC_HOST + "/",
                                  })
                                }
                              >
                                <SignOut size={18} />
                                <span>Sign out</span>
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <X className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <List className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pt-2 pb-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      href={item.href}
                      className={clsx(
                        item.href === activePath
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800",
                        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
                      )}
                      aria-current={
                        item.href === activePath ? "page" : undefined
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <User className="h-10 w-10 rounded-full bg-gray-200 text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-500">
                        {data?.user?.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Disclosure.Button
                      onClick={() =>
                        void signOut({
                          callbackUrl: env.NEXT_PUBLIC_HOST + "/",
                        })
                      }
                      as="a"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {backTo && (
                <Link
                  href={backTo}
                  className="mb-2 flex w-fit items-center gap-2 rounded-full bg-blue-50 py-1 px-3 text-sm transition-colors hover:bg-blue-100"
                >
                  <ArrowLeft />
                  <span>Go back</span>
                </Link>
              )}
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                {pageTitle}
              </h1>
              <p className="text-gray-500">{pageDescription}</p>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Settings", href: "/dashboard/settings" },
] as const;

type NavPath = (typeof navigation)[number]["href"];

function RedirectToDashboard() {
  const router = useRouter();

  useEffect(() => {
    void router.push("/");
  }, [router]);

  return <LoadingScreen />;
}
