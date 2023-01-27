import { nanoid } from "../../nanoid";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const checklistSchema = z.object({
  title: z.string().min(1),
  sections: z
    .array(
      z.object({
        title: z.string().min(1).optional(),
        tasks: z
          .array(
            z.object({
              title: z.string().min(1),
              description: z.string().min(1).optional(),
            })
          )
          .min(2)
          .max(30),
      })
    )
    .min(1)
    .max(10),
});

export const checklistRouter = createTRPCRouter({
  create: publicProcedure
    .input(checklistSchema)
    .mutation(async ({ ctx, input }) => {
      const id = await nanoid();
      const result = await ctx.prisma.checklist.create({
        data: { schema: JSON.stringify(input), id, userId: "anon" },
      });
      return { id: result.id };
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .output(checklistSchema)
    .query(async ({ ctx, input }) => {
      const checklist = await ctx.prisma.checklist.findUniqueOrThrow({
        where: { id: input.id },
      });

      if (checklist) {
        return JSON.parse(checklist.schema as string) as z.TypeOf<
          typeof checklistSchema
        >;
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred, please try again later.",
      });
    }),
});
