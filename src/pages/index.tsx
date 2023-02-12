import clsx from "clsx";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Barbell, GearSix, GraduationCap, HouseLine } from "phosphor-react";
import { useEffect } from "react";
import Button from "../components/Button";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import sal from "sal.js";

const Home: NextPage = () => {
  useEffect(() => {
    sal();
  }, []);

  return (
    <>
      <Head>
        <title>ChecklistHQ | Create and Share Checklist Templates</title>
        <meta
          name="description"
          content="Make lightning strike twice with checklist templates"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <section>
          <div className="mx-auto max-w-6xl px-4 pt-16 lg:pt-28">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-12">
              <div className="col-span-12 mx-auto max-w-2xl lg:col-span-5">
                <h1 className="mt-3 text-center text-4xl font-bold lg:text-left lg:text-5xl">
                  Make lightning strike twice with checklist templates
                </h1>
                <p className="mt-5 text-center text-lg lg:text-left">
                  Sometimes a reusable checklist is all you need to ensure your
                  processes yield perfection every single time.
                </p>
                <div className="mt-10 lg:mt-4 lg:w-fit">
                  <Link href={"/new"} className="flex justify-center">
                    <Button>Create a checklist now – FREE</Button>
                  </Link>
                  <p className="mt-2 text-center text-sm text-gray-500 lg:text-left">
                    No account required.
                  </p>
                </div>
              </div>
              <div className="col-span-12 mx-auto max-w-2xl lg:col-span-7">
                <div
                  data-sal="fade"
                  data-sal-easing="ease-out"
                  data-sal-duration="500"
                  data-sal-delay="200"
                  className="relative"
                >
                  <Image
                    src={"/visual.png"}
                    alt="laptop and phone showing different checklists"
                    width={1576}
                    height={929}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="mx-auto max-w-6xl px-4">
            <h2
              id="use-cases"
              className="mt-32 mb-12 text-center text-3xl font-semibold"
            >
              Use cases
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {useCases.map((useCase, idx) => {
                const Icon = useCase.icon;

                return (
                  <div
                    data-sal="slide-up"
                    data-sal-easing="ease-out"
                    data-sal-duration="400"
                    data-sal-delay={200 + (idx + 1) * 100}
                    key={useCase.title}
                    className="rounded-md border p-6"
                  >
                    <div
                      className={clsx("w-fit rounded-md p-2", {
                        "bg-yellow-100": useCase.color === "yellow",
                        "bg-purple-100": useCase.color === "purple",
                        "bg-blue-100": useCase.color === "blue",
                        "bg-pink-100": useCase.color === "pink",
                      })}
                    >
                      <Icon
                        size={24}
                        className={clsx({
                          "text-yellow-700": useCase.color === "yellow",
                          "text-purple-700": useCase.color === "purple",
                          "text-blue-700": useCase.color === "blue",
                          "text-pink-700": useCase.color === "pink",
                        })}
                      />
                    </div>
                    <h3 className="mt-4 font-medium">{useCase.title}</h3>
                    <p className="mt-1 text-gray-600">{useCase.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section></section>
      </main>
      <Footer />
    </>
  );
};

export default Home;

const useCases = [
  {
    icon: GearSix,
    title: "Work Processes",
    description:
      "Define company processes and procedures in the form of checklists.",
    color: "blue",
  },
  {
    icon: GraduationCap,
    title: "Education & Learning",
    description:
      "Create checklists as guides that students and learners can follow.",
    color: "yellow",
  },
  {
    icon: Barbell,
    title: "Health & Wellness",
    description:
      "Create checklists for the routines you follow to stay healthy.",
    color: "pink",
  },
  {
    icon: HouseLine,
    title: "Home Maintenance",
    description:
      "Schedule and track home maintenance tasks, such as cleaning and yard work.",
    color: "purple",
  },
];
