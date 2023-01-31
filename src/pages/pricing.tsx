import type { NextPage } from "next";
import Head from "next/head";
import { Check, X } from "phosphor-react";
import Button from "../components/Button";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const Pricing: NextPage = () => {
  return (
    <>
      <Head>
        <title>RepeatList: Pricing</title>
        <meta name="description" content="RepeatList pricing page." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h1 className="py-12 text-center text-4xl font-bold">Pricing</h1>
        <div className="mx-auto mb-24 max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.title}
                className="flex flex-col rounded-md bg-gray-50 p-5"
              >
                <div>
                  <h2 className="text-xl font-medium">{tier.title}</h2>
                  <div className="mt-4">
                    <span className="text-3xl font-medium">
                      ${tier.monthly}
                    </span>
                    <span className="ml-1 text-gray-500">per month</span>
                  </div>
                </div>
                <div className="flex h-full flex-col justify-between">
                  <ul className="mt-4 text-sm text-gray-700">
                    {tier.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-center gap-2 py-1">
                        <Check
                          className="flex- text-blue-700"
                          size={20}
                          weight="bold"
                        />
                        <span>{pro}</span>
                      </li>
                    ))}
                    {tier.cons?.map((con, idx) => (
                      <li key={idx} className="flex items-center gap-2 py-1">
                        <X className="text-gray-400" size={20} weight="bold" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button>{tier?.cta}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Pricing;

const tiers = [
  {
    title: "Free w/ No Account",
    monthly: "0",
    pros: ["Unlimited checklists", "Anonymous checklists"],
    cons: ["Deleted after 24 hours"],
    cta: "Create FREE Checklist Now",
  },
  {
    title: "Free w/ Account",
    monthly: "0",
    pros: ["Save checklists", "Manage checklists"],
    cons: ["10 limit"],
    cta: "Create My Account",
  },
  {
    title: "Premium",
    monthly: "12.99",
    pros: ["Unlimited checklists", "Save checklists", "Manage checklists"],
    cta: "Go Premium",
    isPremium: true,
  },
];
