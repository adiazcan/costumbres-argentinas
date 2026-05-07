import { drizzle } from "drizzle-orm/mysql2";
import { sql } from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

const categories = [
  { name: "Empanadas", description: "Empanadas artesanales argentinas", sortOrder: 1 },
  { name: "Pastas", description: "Pastas caseras frescas", sortOrder: 2 },
  { name: "Pizzas", description: "Pizza tamaño mediano de 6 porciones. Opción elección mitad y mitad. También ofrecemos pizzas sin gluten, veganas y sin lactosa.", sortOrder: 3 },
  { name: "Bebidas", description: "Refrescos, cervezas, vinos y más", sortOrder: 4 },
  { name: "Postres y Café", description: "Dulces argentinos y cafetería", sortOrder: 5 },
];

const items = {
  "Empanadas": [
    { name: "Empanada de carne", price: "1.60", sortOrder: 1 },
    { name: "Empanada de Pollo", price: "1.60", sortOrder: 2 },
    { name: "Empanada de Jamón y Queso", price: "1.60", sortOrder: 3 },
    { name: "Empanada de Humita (Maíz)", price: "1.60", sortOrder: 4 },
    { name: "Empanada de Tomate, Queso y Albahaca", price: "1.60", sortOrder: 5 },
    { name: "Empanada de Cebolla, Queso y Bacon", price: "1.60", sortOrder: 6 },
    { name: "Empanada de Chorizo picante y tres quesos", price: "1.60", sortOrder: 7 },
    { name: "Empanada de Jamón Serrano, rulo de cabra y orégano", price: "1.60", sortOrder: 8 },
    { name: "Empanada de chistorra, queso cheddar y cebolla caramelizada", price: "1.60", sortOrder: 9 },
  ],
  "Pastas": [
    { name: "Sorrentinos (5 uds)", price: "9.00", description: "Pasta casera rellena de jamón y mozzarella.", sortOrder: 1 },
    { name: "Agnelotis (5 uds)", price: "9.00", description: "Pasta casera rellena de ricota y jamón.", sortOrder: 2 },
    { name: "Lasagna", price: "9.00", description: "Pasta casera al horno rellena de mozzarella, jamón, verduras, pimientos y huevo.", sortOrder: 3 },
    { name: "Canelones (3 uds)", price: "9.00", description: "Pasta rellena al horno con salsa de tomate. Opciones: Pollo, Verdura o Muzzarella y Jamón.", sortOrder: 4 },
  ],
  "Pizzas": [
    { name: "Buenos Aires", price: "7.40", description: "Mozzarella", sortOrder: 1 },
    { name: "Córdoba", price: "9.20", description: "Mozzarella, jamón y pimiento rojo", sortOrder: 2 },
    { name: "La Pampa", price: "8.80", description: "Mozzarella y chorizo", sortOrder: 3 },
    { name: "Río Negro", price: "9.40", description: "Mozzarella, salami y pimiento verde", sortOrder: 4 },
    { name: "Santa Cruz", price: "8.80", description: "Mozzarella, cebolla y olivas", sortOrder: 5 },
    { name: "Misiones", price: "9.40", description: "Mozzarella, jamón, pimientos y huevo duro", sortOrder: 6 },
    { name: "Tucumán", price: "9.20", description: "Mozzarella y longaniza", sortOrder: 7 },
    { name: "San Juan", price: "8.80", description: "Mozzarella y atún", sortOrder: 8 },
    { name: "Bariloche", price: "9.40", description: "Mozzarella, jamón, rulo de cabra y sirope de fresa", sortOrder: 9 },
    { name: "Santa Fe", price: "8.00", description: "Mozzarella y jamón", sortOrder: 10 },
    { name: "Mendoza", price: "9.40", description: "Mozzarella, jamón y rodajas de tomate", sortOrder: 11 },
    { name: "Corrientes", price: "8.80", description: "Mozzarella y bacon", sortOrder: 12 },
    { name: "Neuquén", price: "9.40", description: "Mozzarella, jamón y champiñones", sortOrder: 13 },
    { name: "Ushuaia", price: "9.80", description: "Mozzarella, jamón y anchoas", sortOrder: 14 },
    { name: "Iguazú", price: "9.40", description: "Mozzarella, bacon, salsa chimichurri y olivas", sortOrder: 15 },
    { name: "La Rioja", price: "9.40", description: "Mozzarella, jamón y piña", sortOrder: 16 },
    { name: "Rosario", price: "9.80", description: "Mozzarella, pechuga de pollo, pimiento verde y cebolla", sortOrder: 17 },
    { name: "Jujuy", price: "9.40", description: "Mozzarella, jamón y palitos de cangrejo", sortOrder: 18 },
    { name: "Formosa", price: "9.20", description: "Mozzarella, jamón, ajo y perejil", sortOrder: 19 },
    { name: "Chaco", price: "8.80", description: "Mozzarella, espinacas y bechamel", sortOrder: 20 },
    { name: "Santa Clara", price: "9.80", description: "Mozzarella, champiñones, bacon, cebolla y emmental", sortOrder: 21 },
    { name: "Chubut", price: "9.20", description: "Mozzarella, gambas, olivas", sortOrder: 22 },
    { name: "Mar del Plata", price: "9.80", description: "Mozzarella, palito de cangrejo, atún y gambas", sortOrder: 23 },
    { name: "San Luis", price: "9.20", description: "Mozzarella, jamón serrano, olivas", sortOrder: 24 },
    { name: "Catamarca", price: "9.80", description: "Mozzarella, roquefort y emmental", sortOrder: 25 },
    { name: "Salta (Calzone Nº1)", price: "10.00", description: "Pizza cerrada rellena de mozzarella, jamón, pimientos, huevo duro y olivas", sortOrder: 26 },
    { name: "Tandil", price: "9.80", description: "Mozzarella, jamón serrano, ajo, perejil y maíz", sortOrder: 27 },
    { name: "Entre Ríos (Vegetal)", price: "9.80", description: "Mozzarella, rodajas de tomate, champiñones, espinacas, pimiento, cebolla y maíz", sortOrder: 28 },
    { name: "Paraná", price: "9.80", description: "Mozzarella, roquefort, emmental y chorizo picante", sortOrder: 29 },
    { name: "Patagonia", price: "9.80", description: "Mozzarella, pulpo, pimentón dulce, salsa rosa", sortOrder: 30 },
    { name: "Santiago", price: "9.80", description: "Mozzarella, jamón, melocotón, sirope de chocolate", sortOrder: 31 },
    { name: "Malvinas", price: "9.80", description: "Mozzarella, jamón serrano, rúcula, queso parmesano y aceite de oliva", sortOrder: 32 },
    { name: "Antártida", price: "9.80", description: "Mozzarella, jamón serrano, miel y albahaca", sortOrder: 33 },
    { name: "La Plata", price: "9.80", description: "Mozzarella, Bacon, Pechuga de Pollo, Cebolla y Salsa Barbacoa", sortOrder: 34 },
    { name: "San Nicolás", price: "9.80", description: "Mozzarella, bacon, champiñones y salsa carbonara", sortOrder: 35 },
    { name: "Pehuajó (Vegetal)", price: "9.80", description: "Mozzarella, salsa de setas y verduras a la parrilla", sortOrder: 36 },
    { name: "San Pedro", price: "9.80", description: "Mozzarella, jamón, rulo de cabra, salsa bechamel y nueces", sortOrder: 37 },
    { name: "Salta (Calzone Nº2)", price: "10.00", description: "Pizza cerrada rellena de mozzarella, chorizo, queso cheddar, pimiento verde y uvas pasas", sortOrder: 38 },
    { name: "Pizza a tu gusto", price: "11.00", description: "Elige tus ingredientes favoritos", sortOrder: 39 },
  ],
  "Bebidas": [
    { name: "Refrescos (Lata 330 ml)", price: "2.50", description: "Coca-Cola, Zero, Sprite, Nestea, Kas, Aquarius", sortOrder: 1 },
    { name: "Zumos", price: "2.50", description: "Piña, Naranja y Melocotón", sortOrder: 2 },
    { name: "Agua (botellín)", price: "1.00", sortOrder: 3 },
    { name: "Agua con gas 500ml", price: "2.90", sortOrder: 4 },
    { name: "Agua (1,5 Litro)", price: "2.00", sortOrder: 5 },
    { name: "Cerveza San Miguel 200ml", price: "1.50", sortOrder: 6 },
    { name: "San Miguel Jarra 500 ml", price: "3.20", sortOrder: 7 },
    { name: "Cerveza lata Ambar o San Miguel", price: "2.50", sortOrder: 8 },
    { name: "Cerveza Sin Gluten (Lata)", price: "2.50", sortOrder: 9 },
    { name: "Cerveza Quilmes (Argentina) 350ml", price: "3.50", sortOrder: 10 },
    { name: "Vino Vega Luchan (Tinto)", price: "8.90", sortOrder: 11 },
    { name: "Vino Vega de Luchan (Blanco)", price: "9.00", sortOrder: 12 },
    { name: "Vino Vega de Luchan (Rosado)", price: "9.00", sortOrder: 13 },
    { name: "Vino Alcorta (Rioja Crianza)", price: "9.90", sortOrder: 14 },
    { name: "Vino Monasterio de las Viñas (Reserva)", price: "12.00", sortOrder: 15 },
    { name: "Vinos Argentinos (Mendoza)", price: "14.00", sortOrder: 16 },
    { name: "Lambrusco", price: "9.00", sortOrder: 17 },
    { name: "Sangria", price: "9.00", sortOrder: 18 },
  ],
  "Postres y Café": [
    { name: "Flan de huevo", price: "3.00", description: "Con crema y dulce de leche", sortOrder: 1 },
    { name: "Panqueques", price: "2.50", description: "Relleno con dulce de leche", sortOrder: 2 },
    { name: "Alfajor Havana", price: "3.20", description: "Chocolate negro o merengue", sortOrder: 3 },
    { name: "Café solo", price: "1.30", sortOrder: 4 },
    { name: "Café cortado", price: "1.30", sortOrder: 5 },
    { name: "Café con leche", price: "1.50", sortOrder: 6 },
    { name: "Carajillo", price: "2.00", sortOrder: 7 },
    { name: "Infusiones", price: "1.50", sortOrder: 8 },
  ],
};

async function seed() {
  console.log("Seeding menu data...");

  // Insert categories
  for (const cat of categories) {
    await db.execute(sql`INSERT INTO menu_categories (name, description, sortOrder, isActive) VALUES (${cat.name}, ${cat.description}, ${cat.sortOrder}, true)`);
  }

  // Get category IDs
  const catRows = await db.execute(sql`SELECT id, name FROM menu_categories ORDER BY sortOrder`);

  const categoryMap = {};
  for (const row of catRows[0]) {
    categoryMap[row.name] = row.id;
  }

  console.log("Categories created:", categoryMap);

  // Insert items
  for (const [catName, catItems] of Object.entries(items)) {
    const categoryId = categoryMap[catName];
    if (!categoryId) {
      console.error(`Category not found: ${catName}`);
      continue;
    }
    for (const item of catItems) {
      await db.execute(sql`INSERT INTO menu_items (categoryId, name, description, price, isActive, isHighlighted, sortOrder) VALUES (${categoryId}, ${item.name}, ${item.description || null}, ${item.price}, true, false, ${item.sortOrder})`);
    }
    console.log(`  Inserted ${catItems.length} items for ${catName}`);
  }

  console.log("Menu seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
