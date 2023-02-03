import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  setUsername: protectedProcedure
    .input(
      z.object({
        username: z
          .string()
          .min(4)
          .max(32)
          .regex(/^[a-zA-Z0-9]+$/),
      })
    )
    .mutation(async ({ ctx, input: { username } }) => {
      const userId = ctx.session.user.id;
      await ctx.prisma.user.update({
        where: { id: userId },
        data: { username },
      });
    }),
});
