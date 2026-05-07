import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@example.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("menu (public)", () => {
  it("returns categories list", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const categories = await caller.menu.categories();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0]).toHaveProperty("name");
    expect(categories[0]).toHaveProperty("isActive");
  });

  it("returns full menu with items nested in categories", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const fullMenu = await caller.menu.fullMenu();
    expect(Array.isArray(fullMenu)).toBe(true);
    expect(fullMenu.length).toBeGreaterThan(0);
    expect(fullMenu[0]).toHaveProperty("items");
    expect(Array.isArray(fullMenu[0].items)).toBe(true);
  });

  it("returns items filtered by category", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    const categories = await caller.menu.categories();
    const firstCat = categories[0];
    const items = await caller.menu.items({ categoryId: firstCat.id });
    expect(Array.isArray(items)).toBe(true);
    for (const item of items) {
      expect(item.categoryId).toBe(firstCat.id);
    }
  });
});

describe("adminMenu (protected)", () => {
  it("denies access to unauthenticated users", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.adminMenu.listCategories()).rejects.toThrow();
  });

  it("denies access to non-admin users", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.adminMenu.listCategories()).rejects.toThrow();
  });

  it("allows admin to list categories", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const categories = await caller.adminMenu.listCategories();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it("allows admin to create, update and delete an item", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Get first category
    const categories = await caller.adminMenu.listCategories();
    const catId = categories[0].id;

    // Create item
    const { id } = await caller.adminMenu.createItem({
      categoryId: catId,
      name: "Test Pizza Vitest",
      description: "Pizza de prueba",
      price: "99.99",
      isActive: true,
      isHighlighted: false,
      sortOrder: 999,
    });
    expect(id).toBeGreaterThan(0);

    // Update item
    const updateResult = await caller.adminMenu.updateItem({
      id,
      name: "Test Pizza Updated",
      price: "88.88",
    });
    expect(updateResult.success).toBe(true);

    // Delete item
    const deleteResult = await caller.adminMenu.deleteItem({ id });
    expect(deleteResult.success).toBe(true);
  });

  it("allows admin to create, update and delete a category", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    // Create category
    const { id } = await caller.adminMenu.createCategory({
      name: "Test Category Vitest",
      description: "Categoría de prueba",
      sortOrder: 999,
      isActive: true,
    });
    expect(id).toBeGreaterThan(0);

    // Update category
    const updateResult = await caller.adminMenu.updateCategory({
      id,
      name: "Test Category Updated",
    });
    expect(updateResult.success).toBe(true);

    // Delete category
    const deleteResult = await caller.adminMenu.deleteCategory({ id });
    expect(deleteResult.success).toBe(true);
  });
});
