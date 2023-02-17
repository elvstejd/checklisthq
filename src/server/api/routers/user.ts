import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const usernameSchema = z
  .string()
  .min(4)
  .max(32)
  .regex(/^[a-zA-Z0-9]+$/);

export const userRouter = createTRPCRouter({
  setUsername: protectedProcedure
    .input(
      z.object({
        username: usernameSchema,
      })
    )
    .mutation(async ({ ctx, input: { username } }) => {
      const userId = ctx.session.user.id;
      await ctx.prisma.user.update({
        where: { id: userId },
        data: { username },
      });
    }),
  getMe: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { username: true },
    });
  }),
  getPublicProfile: publicProcedure
    .input(z.object({ username: usernameSchema }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username: input.username },
        select: {
          username: true,
          image: true,
          Checklists: {
            select: {
              title: true,
              id: true,
            },
            where: {}, // TODO: only select public checklists
          },
        },
      });

      if (!user)
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

      return user;
    }),
});
