import { nanoid } from "../../nanoid";
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

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
    .input(z.object({ isPublic: z.boolean(), schema: checklistSchema }))
    .mutation(async ({ ctx, input }) => {
      const id = await nanoid();
      const result = await ctx.prisma.checklist.create({
        data: {
          schema: JSON.stringify(input.schema),
          id,
          userId: ctx.session.user.id,
          title: input.schema.title,
          isPublic: input.isPublic,
        },
      });
      return { id: result.id };
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().length(7),
        isPublic: z.boolean().optional(),
        newChecklist: checklistSchema.optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const id = input.id;

      const result = await ctx.prisma.checklist.update({
        where: { id },
        data: {
          schema: JSON.stringify(input.newChecklist),
          title: input.newChecklist?.title,
          isPublic: input.isPublic,
        },
      });

      return { id: result.id };
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const checklist = await ctx.prisma.checklist.findUniqueOrThrow({
          select: {
            schema: true,
            title: true,
            user: {
              select: { username: true },
            },
          },
          where: { id: input.id },
        });

        return {
          ...checklist,
          schema: JSON.parse(checklist.schema as string) as z.TypeOf<
            typeof checklistSchema
          >,
        };
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "404 Checklist Not Found",
            });
          } else throw e;
        }
      }
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.checklist.findMany({
      where: { userId: ctx.session?.user.id },
      select: { id: true, title: true },
    });
  }),
});
