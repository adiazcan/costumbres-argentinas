import { categories as seedCategories, items as seedItems } from "../seed-menu.mjs";

export type StaticMenuCategory = {
  id: number;
  name: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type StaticMenuItem = {
  id: number;
  categoryId: number;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  isActive: boolean;
  isHighlighted: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type StaticFullMenuCategory = StaticMenuCategory & {
  items: StaticMenuItem[];
};

export type StaticMenuStore = {
  categories: StaticMenuCategory[];
  items: StaticMenuItem[];
  nextCategoryId: number;
  nextItemId: number;
};

function cloneCategory(category: StaticMenuCategory): StaticMenuCategory {
  return {
    ...category,
    createdAt: new Date(category.createdAt),
    updatedAt: new Date(category.updatedAt),
  };
}

function cloneItem(item: StaticMenuItem): StaticMenuItem {
  return {
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  };
}

export function createStaticMenuStore(): StaticMenuStore {
  const now = new Date();
  let nextCategoryId = 1;
  let nextItemId = 1;

  const categories = seedCategories
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category) => ({
      id: nextCategoryId++,
      name: category.name,
      description: category.description ?? null,
      sortOrder: category.sortOrder,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    }));

  const categoryIds = new Map(categories.map((category) => [category.name, category.id]));

  const items = Object.entries(seedItems)
    .flatMap(([categoryName, categoryItems]) => {
      const categoryId = categoryIds.get(categoryName);
      if (!categoryId) {
        return [];
      }

      return categoryItems
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((item) => ({
          id: nextItemId++,
          categoryId,
          name: item.name,
          description: item.description ?? null,
          price: item.price,
          imageUrl: null,
          isActive: true,
          isHighlighted: false,
          sortOrder: item.sortOrder,
          createdAt: now,
          updatedAt: now,
        }));
    });

  return {
    categories: categories.map(cloneCategory),
    items: items.map(cloneItem),
    nextCategoryId,
    nextItemId,
  };
}

export function buildStaticFullMenu(): StaticFullMenuCategory[] {
  const store = createStaticMenuStore();

  return store.categories.map((category) => ({
    ...cloneCategory(category),
    items: store.items
      .filter((item) => item.categoryId === category.id)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id)
      .map(cloneItem),
  }));
}
