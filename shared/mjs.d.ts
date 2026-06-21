declare module "*.mjs" {
  export const categories: Array<{
    name: string;
    description?: string;
    sortOrder: number;
  }>;

  export const items: Record<
    string,
    Array<{
      name: string;
      price: string;
      description?: string;
      sortOrder: number;
    }>
  >;
}
