import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  ChefHat,
  Loader2,
} from "lucide-react";
import { Link } from "wouter";

type CategoryFormData = {
  name: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
};

type ItemFormData = {
  categoryId: number;
  name: string;
  description: string;
  price: string;
  isActive: boolean;
  isHighlighted: boolean;
  sortOrder: number;
};

export default function AdminMenu() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Category dialog state
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [categoryForm, setCategoryForm] = useState<CategoryFormData>({
    name: "",
    description: "",
    sortOrder: 0,
    isActive: true,
  });

  // Item dialog state
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [itemForm, setItemForm] = useState<ItemFormData>({
    categoryId: 0,
    name: "",
    description: "",
    price: "",
    isActive: true,
    isHighlighted: false,
    sortOrder: 0,
  });

  // Delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: "category" | "item"; id: number; name: string } | null>(null);

  // Queries
  const categoriesQuery = trpc.adminMenu.listCategories.useQuery();
  const itemsQuery = trpc.adminMenu.listItems.useQuery(
    { categoryId: selectedCategoryId ?? undefined },
  );

  const utils = trpc.useUtils();

  // Mutations
  const createCategoryMut = trpc.adminMenu.createCategory.useMutation({
    onSuccess: () => {
      utils.adminMenu.listCategories.invalidate();
      utils.menu.fullMenu.invalidate();
      setCategoryDialogOpen(false);
      toast.success("Categoría creada correctamente");
    },
    onError: (err) => toast.error(err.message),
  });

  const updateCategoryMut = trpc.adminMenu.updateCategory.useMutation({
    onSuccess: () => {
      utils.adminMenu.listCategories.invalidate();
      utils.menu.fullMenu.invalidate();
      setCategoryDialogOpen(false);
      toast.success("Categoría actualizada");
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteCategoryMut = trpc.adminMenu.deleteCategory.useMutation({
    onSuccess: () => {
      utils.adminMenu.listCategories.invalidate();
      utils.adminMenu.listItems.invalidate();
      utils.menu.fullMenu.invalidate();
      setDeleteDialogOpen(false);
      setSelectedCategoryId(null);
      toast.success("Categoría eliminada");
    },
    onError: (err) => toast.error(err.message),
  });

  const createItemMut = trpc.adminMenu.createItem.useMutation({
    onSuccess: () => {
      utils.adminMenu.listItems.invalidate();
      utils.menu.fullMenu.invalidate();
      setItemDialogOpen(false);
      toast.success("Plato creado correctamente");
    },
    onError: (err) => toast.error(err.message),
  });

  const updateItemMut = trpc.adminMenu.updateItem.useMutation({
    onSuccess: () => {
      utils.adminMenu.listItems.invalidate();
      utils.menu.fullMenu.invalidate();
      setItemDialogOpen(false);
      toast.success("Plato actualizado");
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteItemMut = trpc.adminMenu.deleteItem.useMutation({
    onSuccess: () => {
      utils.adminMenu.listItems.invalidate();
      utils.menu.fullMenu.invalidate();
      setDeleteDialogOpen(false);
      toast.success("Plato eliminado");
    },
    onError: (err) => toast.error(err.message),
  });

  // Auth check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-[#1B3A6B]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <ChefHat className="w-16 h-16 mx-auto text-[#1B3A6B] mb-4" />
          <h1 className="text-2xl font-bold text-[#1B3A6B] mb-2">Panel de Administración</h1>
          <p className="text-gray-600 mb-6">Inicia sesión para gestionar el menú</p>
          <a href={getLoginUrl()}>
            <Button className="bg-[#1B3A6B] hover:bg-[#1B3A6B]/90 text-white px-8">
              Iniciar Sesión
            </Button>
          </a>
        </div>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-[#E63946] mb-2">Acceso Denegado</h1>
          <p className="text-gray-600 mb-6">No tienes permisos de administrador</p>
          <Link href="/">
            <Button variant="outline">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Handlers
  const openNewCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: "", description: "", sortOrder: 0, isActive: true });
    setCategoryDialogOpen(true);
  };

  const openEditCategory = (cat: any) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      description: cat.description || "",
      sortOrder: cat.sortOrder,
      isActive: cat.isActive,
    });
    setCategoryDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      updateCategoryMut.mutate({ id: editingCategory.id, ...categoryForm });
    } else {
      createCategoryMut.mutate(categoryForm);
    }
  };

  const openNewItem = () => {
    setEditingItem(null);
    setItemForm({
      categoryId: selectedCategoryId || (categoriesQuery.data?.[0]?.id ?? 0),
      name: "",
      description: "",
      price: "",
      isActive: true,
      isHighlighted: false,
      sortOrder: 0,
    });
    setItemDialogOpen(true);
  };

  const openEditItem = (item: any) => {
    setEditingItem(item);
    setItemForm({
      categoryId: item.categoryId,
      name: item.name,
      description: item.description || "",
      price: item.price,
      isActive: item.isActive,
      isHighlighted: item.isHighlighted,
      sortOrder: item.sortOrder,
    });
    setItemDialogOpen(true);
  };

  const handleSaveItem = () => {
    if (editingItem) {
      updateItemMut.mutate({ id: editingItem.id, ...itemForm });
    } else {
      createItemMut.mutate(itemForm);
    }
  };

  const confirmDelete = (type: "category" | "item", id: number, name: string) => {
    setDeleteTarget({ type, id, name });
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "category") {
      deleteCategoryMut.mutate({ id: deleteTarget.id });
    } else {
      deleteItemMut.mutate({ id: deleteTarget.id });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <header className="bg-[#1B3A6B] text-white py-4 px-6 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al sitio
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <ChefHat className="w-6 h-6" />
              <h1 className="text-xl font-bold">Gestión del Menú</h1>
            </div>
          </div>
          <span className="text-sm opacity-75">
            {user?.name || user?.email || "Admin"}
          </span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          {/* Categories sidebar */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#1B3A6B] text-lg">Categorías</h2>
              <Button size="sm" onClick={openNewCategory} className="bg-[#E63946] hover:bg-[#E63946]/90">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {categoriesQuery.isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin w-5 h-5 text-[#1B3A6B]" />
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategoryId(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                    selectedCategoryId === null
                      ? "bg-[#1B3A6B] text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Todos los platos
                </button>
                {categoriesQuery.data?.map((cat) => (
                  <div key={cat.id} className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`flex-1 text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                        selectedCategoryId === cat.id
                          ? "bg-[#1B3A6B] text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      } ${!cat.isActive ? "opacity-50" : ""}`}
                    >
                      {cat.name}
                      {!cat.isActive && <span className="ml-1 text-xs">(inactiva)</span>}
                    </button>
                    <button
                      onClick={() => openEditCategory(cat)}
                      className="p-1.5 rounded hover:bg-gray-100 text-gray-500"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => confirmDelete("category", cat.id, cat.name)}
                      className="p-1.5 rounded hover:bg-red-50 text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Items main area */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-[#1B3A6B] text-lg">
                {selectedCategoryId
                  ? categoriesQuery.data?.find((c) => c.id === selectedCategoryId)?.name || "Platos"
                  : "Todos los platos"}
              </h2>
              <Button onClick={openNewItem} className="bg-[#E63946] hover:bg-[#E63946]/90">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Plato
              </Button>
            </div>

            {itemsQuery.isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin w-6 h-6 text-[#1B3A6B]" />
              </div>
            ) : itemsQuery.data?.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <ChefHat className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No hay platos en esta categoría</p>
                <Button onClick={openNewItem} variant="outline" className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir primer plato
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-[#1B3A6B]">Nombre</th>
                      <th className="text-left py-3 px-2 font-semibold text-[#1B3A6B]">Descripción</th>
                      <th className="text-right py-3 px-2 font-semibold text-[#1B3A6B]">Precio</th>
                      <th className="text-center py-3 px-2 font-semibold text-[#1B3A6B]">Activo</th>
                      <th className="text-right py-3 px-2 font-semibold text-[#1B3A6B]">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsQuery.data?.map((item) => (
                      <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50 ${!item.isActive ? "opacity-50" : ""}`}>
                        <td className="py-3 px-2 font-medium">{item.name}</td>
                        <td className="py-3 px-2 text-gray-600 max-w-[200px] truncate">
                          {item.description || "—"}
                        </td>
                        <td className="py-3 px-2 text-right font-bold text-[#E63946]">
                          {item.price} €
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className={`inline-block w-2 h-2 rounded-full ${item.isActive ? "bg-green-500" : "bg-red-400"}`} />
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => openEditItem(item)}
                              className="p-1.5 rounded hover:bg-gray-100 text-gray-600"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => confirmDelete("item", item.id, item.name)}
                              className="p-1.5 rounded hover:bg-red-50 text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Nombre</Label>
              <Input
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                placeholder="Ej: Pizzas"
              />
            </div>
            <div>
              <Label>Descripción</Label>
              <Input
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                placeholder="Descripción opcional"
              />
            </div>
            <div>
              <Label>Orden</Label>
              <Input
                type="number"
                value={categoryForm.sortOrder}
                onChange={(e) => setCategoryForm({ ...categoryForm, sortOrder: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={categoryForm.isActive}
                onCheckedChange={(checked) => setCategoryForm({ ...categoryForm, isActive: checked })}
              />
              <Label>Activa (visible en el menú público)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveCategory}
              className="bg-[#1B3A6B] hover:bg-[#1B3A6B]/90"
              disabled={createCategoryMut.isPending || updateCategoryMut.isPending}
            >
              {(createCategoryMut.isPending || updateCategoryMut.isPending) && (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              )}
              {editingCategory ? "Guardar" : "Crear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Item Dialog */}
      <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Editar Plato" : "Nuevo Plato"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Categoría</Label>
              <Select
                value={String(itemForm.categoryId)}
                onValueChange={(val) => setItemForm({ ...itemForm, categoryId: parseInt(val) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categoriesQuery.data?.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Nombre</Label>
              <Input
                value={itemForm.name}
                onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                placeholder="Ej: Pizza Mendoza"
              />
            </div>
            <div>
              <Label>Descripción</Label>
              <Input
                value={itemForm.description}
                onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                placeholder="Ingredientes o descripción"
              />
            </div>
            <div>
              <Label>Precio (sin €)</Label>
              <Input
                value={itemForm.price}
                onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                placeholder="Ej: 9.80"
              />
            </div>
            <div>
              <Label>Orden</Label>
              <Input
                type="number"
                value={itemForm.sortOrder}
                onChange={(e) => setItemForm({ ...itemForm, sortOrder: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={itemForm.isActive}
                  onCheckedChange={(checked) => setItemForm({ ...itemForm, isActive: checked })}
                />
                <Label>Activo</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={itemForm.isHighlighted}
                  onCheckedChange={(checked) => setItemForm({ ...itemForm, isHighlighted: checked })}
                />
                <Label>Destacado</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setItemDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveItem}
              className="bg-[#1B3A6B] hover:bg-[#1B3A6B]/90"
              disabled={createItemMut.isPending || updateItemMut.isPending}
            >
              {(createItemMut.isPending || updateItemMut.isPending) && (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              )}
              {editingItem ? "Guardar" : "Crear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#E63946]">Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          <p className="py-4 text-gray-700">
            ¿Estás seguro de que quieres eliminar{" "}
            <strong>{deleteTarget?.name}</strong>?
            {deleteTarget?.type === "category" && (
              <span className="block text-sm text-red-500 mt-2">
                Esto también eliminará todos los platos de esta categoría.
              </span>
            )}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-[#E63946] hover:bg-[#E63946]/90 text-white"
              disabled={deleteCategoryMut.isPending || deleteItemMut.isPending}
            >
              {(deleteCategoryMut.isPending || deleteItemMut.isPending) && (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              )}
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
