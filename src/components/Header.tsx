import { Popover } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { List, X } from "phosphor-react";
import React from "react";
import { Brand } from "./Brand";
import Button from "./Button";

export function Header() {
  return (
    <header>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <Brand />
            <div className="hidden md:block">
              <ul className="flex">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      className="px-4 py-2 text-gray-500 transition-colors hover:text-black"
                      href={link.path}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hidden gap-1 md:flex">
            <Button variant="text">Log In</Button>
            <Button variant="outline">Create my account</Button>
          </div>
          <div className="md:hidden">
            <Popover>
              {({ open }) => (
                <>
                  <Popover.Button>
                    {open ? <X size={24} /> : <List size={24} />}
                  </Popover.Button>
                  <Popover.Panel className="absolute left-0 right-0 z-10">
                    <div className="m-4 rounded-md border bg-white px-4 shadow-xl">
                      <ul className="flex h-full flex-col justify-between">
                        {navLinks.map((link, idx) => (
                          <li key={link.path}>
                            <Link
                              className={clsx(
                                "bg- inline-block w-full py-4 text-gray-500 transition-colors hover:text-black",
                                {
                                  "border-t": idx,
                                }
                              )}
                              href={link.path}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Popover.Panel>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}

const navLinks = [
  {
    label: "Pricing",
    path: "/pricing",
  },
  {
    label: "Use cases",
    path: "#use-cases",
  },
  {
    label: "Features",
    path: "#features",
  },
];
