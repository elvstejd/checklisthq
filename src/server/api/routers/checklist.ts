import { nanoid } from "../../nanoid";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

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

const checklistSchema = z.object({
  title: z
    .string()
    .min(1, "Missing checklist title")
    .max(150, "Checklist title is too long. Please keep it under 150 chars."),
  sections: z
    .array(
      z.object({
        title: z
          .string()
          .min(1, "Section title appears to be empty. Please provide one.")
          .max(80, "Reached 80 char limit.")
          .optional(),
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
    .max(10),
});

export const checklistRouter = createTRPCRouter({
  freeCreate: publicProcedure
    .input(freeChecklistSchema)
    .mutation(async ({ ctx, input }) => {
      const id = await nanoid();
      const result = await ctx.prisma.checklist.create({
        data: {
          schema: JSON.stringify(input),
          id,
          userId: "_anon",
          title: input.title,
        },
      });
      return { id: result.id };
    }),
  create: protectedProcedure
    .input(checklistSchema)
    .mutation(async ({ ctx, input }) => {
      const id = await nanoid();
      const result = await ctx.prisma.checklist.create({
        data: {
          schema: JSON.stringify(input),
          id,
          userId: ctx.session.user.id,
          title: input.title,
        },
      });
      return { id: result.id };
    }),
  update: protectedProcedure
    .input(
      z.object({ id: z.string().length(7), newChecklist: checklistSchema })
    )
    .mutation(async ({ ctx, input }) => {
      const id = input.id;

      const result = await ctx.prisma.checklist.update({
        where: { id },
        data: {
          schema: JSON.stringify(input.newChecklist),
          title: input.newChecklist.title,
        },
      });

      return { id: result.id };
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .output(checklistSchema)
    .query(async ({ ctx, input }) => {
      const checklist = await ctx.prisma.checklist.findUniqueOrThrow({
        where: { id: input.id },
        include: { user: { select: { username: true } } },
      });

      if (checklist) {
        console.log(checklist.schema);

        return JSON.parse(checklist.schema as string) as z.TypeOf<
          typeof checklistSchema
        >;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.checklist.findMany({
      where: { userId: ctx.session?.user.id },
      select: { id: true, title: true },
    });
  }),
});
