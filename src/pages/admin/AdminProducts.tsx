import { useState } from "react";
import { Plus, Trash2, Package, Upload, Pencil, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminProducts, AdminProduct } from "@/contexts/AdminProductsContext";
import { toast } from "sonner";

const emptyForm = {
  name: "",
  category: "jewellery" as AdminProduct["category"],
  price: "",
  stock: "",
  image: "",
  description: "",
};

const AdminProducts = () => {
  const { products, addProduct, removeProduct, updateProduct } = useAdminProducts();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(form.price);
    const stock = Number(form.stock);
    if (!form.name || !price || !form.image) {
      toast.error("Please fill all required fields and add an image");
      return;
    }
    const payload = {
      name: form.name,
      category: form.category,
      price,
      stock: stock || 0,
      image: form.image,
      description: form.description,
    };
    if (editingId) {
      updateProduct(editingId, payload);
      toast.success("Product updated");
    } else {
      addProduct(payload);
      toast.success("Product added");
    }
    setForm(emptyForm);
    setEditingId(null);
    setOpen(false);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (p: AdminProduct) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      price: String(p.price),
      stock: String(p.stock),
      image: p.image,
      description: p.description,
    });
    setOpen(true);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.4em] text-accent mb-2">CATALOG</p>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your product catalog. {products.length} custom product{products.length === 1 ? "" : "s"}.
          </p>
        </div>

        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o);
            if (!o) {
              setEditingId(null);
              setForm(emptyForm);
            }
          }}
        >
          <Button onClick={openAdd} className="tracking-[0.2em] text-xs h-11">
            <Plus className="w-4 h-4" /> ADD PRODUCT
          </Button>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">
                {editingId ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em]">PRODUCT IMAGE *</Label>
                {form.image ? (
                  <div className="space-y-2">
                    <div className="relative aspect-video w-full rounded-md border border-border bg-muted/30 overflow-hidden group">
                      <img
                        src={form.image}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, image: "" }))}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 backdrop-blur border border-border flex items-center justify-center text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        aria-label="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <label className="cursor-pointer block">
                      <div className="flex items-center justify-center gap-2 h-10 border border-dashed border-border rounded-md text-xs tracking-[0.2em] text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-colors">
                        <RefreshCw className="w-3.5 h-3.5" /> REPLACE IMAGE
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <div className="flex flex-col items-center justify-center gap-2 aspect-video w-full border border-dashed border-border rounded-md text-xs tracking-[0.2em] text-muted-foreground hover:bg-muted/30 hover:text-foreground transition-colors">
                      <Upload className="w-5 h-5" />
                      <span>UPLOAD IMAGE</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em]">PRODUCT NAME *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Royal Gold Bangle"
                  className="h-11"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em]">CATEGORY *</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => setForm({ ...form, category: v as AdminProduct["category"] })}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jewellery">Jewellery</SelectItem>
                      <SelectItem value="cosmetics">Cosmetics</SelectItem>
                      <SelectItem value="purses">Purses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em]">STOCK</Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    placeholder="0"
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em]">PRICE (PKR) *</Label>
                <Input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="12500"
                  className="h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em]">DESCRIPTION</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short product description..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full h-11 tracking-[0.2em] text-xs">
                {editingId ? "SAVE CHANGES" : "ADD PRODUCT"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {products.length === 0 ? (
        <div className="bg-card border border-dashed border-border rounded-lg p-16 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-serif text-xl text-foreground mb-2">No products yet</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Click "Add Product" to create your first listing.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => (
            <div key={p.id} className="bg-card border border-border rounded-lg overflow-hidden group">
              <div className="aspect-square bg-muted/30 overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 space-y-2">
                <p className="text-[10px] tracking-[0.3em] text-accent uppercase">{p.category}</p>
                <h3 className="font-serif text-lg text-foreground line-clamp-1">{p.name}</h3>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">PKR {p.price.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Stock: {p.stock}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => openEdit(p)}
                      aria-label="Edit product"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        removeProduct(p.id);
                        toast.success("Product removed");
                      }}
                      aria-label="Delete product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
