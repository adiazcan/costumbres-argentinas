import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getAllCategories,
  getAllItems,
  getItemsByCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  createItem,
  updateItem,
  deleteItem,
} from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Public menu endpoints
  menu: router({
    categories: publicProcedure.query(async () => {
      return getAllCategories();
    }),
    items: publicProcedure.input(z.object({ categoryId: z.number().optional() })).query(async ({ input }) => {
      if (input.categoryId) {
        return getItemsByCategory(input.categoryId);
      }
      return getAllItems();
    }),
    fullMenu: publicProcedure.query(async () => {
      const categories = await getAllCategories();
      const items = await getAllItems();
      return categories.map(cat => ({
        ...cat,
        items: items.filter(item => item.categoryId === cat.id),
      }));
    }),
  }),

  // Admin menu management endpoints
  adminMenu: router({
    // Categories CRUD
    listCategories: adminProcedure.query(async () => {
      return getAllCategories();
    }),
    createCategory: adminProcedure
      .input(z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        sortOrder: z.number().default(0),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        const id = await createCategory(input);
        return { id };
      }),
    updateCategory: adminProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        sortOrder: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateCategory(id, data);
        return { success: true };
      }),
    deleteCategory: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteCategory(input.id);
        return { success: true };
      }),

    // Items CRUD
    listItems: adminProcedure
      .input(z.object({ categoryId: z.number().optional() }))
      .query(async ({ input }) => {
        if (input.categoryId) {
          return getItemsByCategory(input.categoryId);
        }
        return getAllItems();
      }),
    createItem: adminProcedure
      .input(z.object({
        categoryId: z.number(),
        name: z.string().min(1),
        description: z.string().optional(),
        price: z.string(),
        imageUrl: z.string().optional(),
        isActive: z.boolean().default(true),
        isHighlighted: z.boolean().default(false),
        sortOrder: z.number().default(0),
      }))
      .mutation(async ({ input }) => {
        const id = await createItem(input);
        return { id };
      }),
    updateItem: adminProcedure
      .input(z.object({
        id: z.number(),
        categoryId: z.number().optional(),
        name: z.string().min(1).optional(),
        description: z.string().nullable().optional(),
        price: z.string().optional(),
        imageUrl: z.string().nullable().optional(),
        isActive: z.boolean().optional(),
        isHighlighted: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateItem(id, data);
        return { success: true };
      }),
    deleteItem: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteItem(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
