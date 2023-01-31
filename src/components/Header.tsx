import Link from "next/link";
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
            <div>
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
          <div className="flex gap-1">
            <Button variant="text">Log In</Button>
            <Button variant="outline">Create my account</Button>
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
