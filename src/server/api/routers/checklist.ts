import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const checklistRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSections: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return [
        {
          title: "Avoid breaking focus",
          tasks: [
            {
              id: 1,
              title: "Tidy up your environment",
              description:
                "Messy rooms, beds, tables, will hurt your concentration.",
            },
            {
              id: 2,
              title: "Remove noise from your environment",
              description:
                "If you must, wear headphones that cancel noise or move to a quieter environment.",
            },
            {
              id: 3,
              title: "Give flow at least 25 minutes to come",
            },
          ],
        },
        {
          title: "Improve your focus",
          tasks: [
            {
              id: 1,
              title: "Play instrumental music",
              description:
                "The brain is hardwired to listen to human voices. Music with vocals is like multitasking.",
              done: false,
            },
            {
              id: 2,
              title: "Work in 90 minutes",
              done: false,
            },
          ],
        },
      ];
    }),
});
