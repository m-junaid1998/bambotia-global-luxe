import { useEffect, useRef, useState } from "react";
import {
  Plus,
  Trash2,
  Package,
  Upload,
  Pencil,
  X,
  RefreshCw,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Tag,
  DollarSign,
  ArrowRight,
} from "lucide-react";
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
import {
  useAdminProducts,
  AdminProduct,
} from "@/contexts/AdminProductsContext";
import { SUBCATEGORIES } from "@/data/products";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const emptyForm = {
  name: "",
  category: "jewellery" as AdminProduct["category"],
  subcategory: "",
  price: "",
  regularPrice: "",
  stock: "",
  image: "",
  description: "",
};

const DRAFT_KEY = "bambotia_admin_product_draft";

type DraftPayload = {
  form: typeof emptyForm;
  published: boolean;
  editingId: string | null;
  savedAt: number;
};

const loadDraft = (): DraftPayload | null => {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as DraftPayload) : null;
  } catch {
    return null;
  }
};

const AdminProducts = () => {
  const {
    products,
    addProduct,
    removeProduct,
    updateProduct,
    togglePublished,
    setPublishedBulk,
  } = useAdminProducts();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [published, setPublished] = useState(true);
  const [draftRestored, setDraftRestored] = useState(false);
  const skipNextPersistRef = useRef(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Scroll to & briefly highlight a newly added product
  useEffect(() => {
    if (!highlightId) return;
    const el = cardRefs.current.get(highlightId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const t = setTimeout(() => setHighlightId(null), 2400);
    return () => clearTimeout(t);
  }, [highlightId, products]);

  // Drop selections that no longer match an existing product
  useEffect(() => {
    setSelectedIds((prev) => {
      const valid = new Set(products.map((p) => p.id));
      let changed = false;
      const next = new Set<string>();
      prev.forEach((id) => {
        if (valid.has(id)) next.add(id);
        else changed = true;
      });
      return changed ? next : prev;
    });
  }, [products]);

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allSelected =
    products.length > 0 && selectedIds.size === products.length;

  const toggleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(products.map((p) => p.id)));
  };

  const handleBulkPublish = (publish: boolean) => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    setPublishedBulk(ids, publish);
    toast.success(
      `${ids.length} product${ids.length === 1 ? "" : "s"} ${
        publish ? "published" : "moved to draft"
      }`,
    );
    setSelectedIds(new Set());
  };

  // Auto-save form state to localStorage while the dialog is open
  useEffect(() => {
    if (!open) return;
    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      return;
    }
    const isEmpty =
      !form.name &&
      !form.price &&
      !form.stock &&
      !form.image &&
      !form.description;
    if (isEmpty && !editingId) {
      localStorage.removeItem(DRAFT_KEY);
      return;
    }
    const handle = setTimeout(() => {
      try {
        const payload: DraftPayload = {
          form,
          published,
          editingId,
          savedAt: Date.now(),
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
      } catch {
        // localStorage may be full (large base64 image) — ignore
      }
    }, 400);
    return () => clearTimeout(handle);
  }, [form, published, editingId, open]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setForm((f) => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(form.price);
    const regularPrice = Number(form.regularPrice) || 0;
    const stock = Number(form.stock);
    if (!form.name || !price || !form.image) {
      toast.error("Please fill all required fields and add an image");
      return;
    }
    if (regularPrice && regularPrice < price) {
      toast.error("Regular price must be greater than sale price");
      return;
    }
    const payload = {
      name: form.name,
      category: form.category,
      subcategory: form.subcategory || undefined,
      price,
      regularPrice: regularPrice || undefined,
      stock: stock || 0,
      image: form.image,
      description: form.description,
      published,
    };
    if (editingId) {
      updateProduct(editingId, payload);
      toast.success("Product updated");
    } else {
      const newId = addProduct(payload);
      setHighlightId(newId);
      toast.success("Product added", {
        description: `${payload.name} is now in your catalog.`,
        action: {
          label: "View",
          onClick: () => {
            const el = cardRefs.current.get(newId);
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            setHighlightId(newId);
          },
        },
      });
    }
    skipNextPersistRef.current = true;
    localStorage.removeItem(DRAFT_KEY);
    setForm(emptyForm);
    setEditingId(null);
    setPublished(true);
    setOpen(false);
  };

  const openAdd = () => {
    const draft = loadDraft();
    if (draft && !draft.editingId) {
      setEditingId(null);
      setForm(draft.form);
      setPublished(draft.published);
      setDraftRestored(true);
      toast.info("Restored your unsaved draft");
    } else {
      setEditingId(null);
      setForm(emptyForm);
      setPublished(true);
      setDraftRestored(false);
    }
    setOpen(true);
  };

  const openEdit = (p: AdminProduct) => {
    const draft = loadDraft();
    if (draft && draft.editingId === p.id) {
      setEditingId(p.id);
      setForm(draft.form);
      setPublished(draft.published);
      setDraftRestored(true);
      toast.info("Restored your unsaved changes");
    } else {
      setEditingId(p.id);
      setForm({
        name: p.name,
        category: p.category,
        subcategory: p.subcategory ?? "",
        price: String(p.price),
        regularPrice: p.regularPrice ? String(p.regularPrice) : "",
        stock: String(p.stock),
        image: p.image,
        description: p.description,
      });
      setPublished(p.published);
      setDraftRestored(false);
    }
    setOpen(true);
  };

  const discardDraft = () => {
    skipNextPersistRef.current = true;
    localStorage.removeItem(DRAFT_KEY);
    if (editingId) {
      const original = products.find((p) => p.id === editingId);
      if (original) {
        setForm({
          name: original.name,
          category: original.category,
          subcategory: original.subcategory ?? "",
          price: String(original.price),
          regularPrice: original.regularPrice ? String(original.regularPrice) : "",
          stock: String(original.stock),
          image: original.image,
          description: original.description,
        });
        setPublished(original.published);
      }
    } else {
      setForm(emptyForm);
      setPublished(true);
    }
    setDraftRestored(false);
    toast.success("Draft discarded");
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.4em] text-accent mb-2">
            CATALOG
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground">
            Products
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your product catalog. {products.length} custom product
            {products.length === 1 ? "" : "s"}.
          </p>
        </div>

        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o);
            if (!o) {
              // Keep draft in localStorage; just close the dialog.
              // Reset transient UI state without wiping the draft.
              setDraftRestored(false);
              setEditingId(null);
              setForm(emptyForm);
              setPublished(true);
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
            {draftRestored && (
              <div className="flex items-center justify-between gap-3 rounded-md border border-accent/40 bg-accent/10 px-3 py-2">
                <p className="text-[11px] tracking-[0.15em] text-accent-foreground/90">
                  RESTORED FROM AUTO-SAVED DRAFT
                </p>
                <button
                  type="button"
                  onClick={discardDraft}
                  className="text-[10px] tracking-[0.2em] text-muted-foreground hover:text-destructive transition-colors"
                >
                  DISCARD
                </button>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em]">
                  PRODUCT IMAGE *
                </Label>
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
                <Label className="text-xs tracking-[0.2em]">
                  PRODUCT NAME *
                </Label>
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
                    onValueChange={(v) =>
                      setForm({
                        ...form,
                        category: v as AdminProduct["category"],
                        subcategory: "",
                      })
                    }
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
                  <Label className="text-xs tracking-[0.2em]">SUB-CATEGORY</Label>
                  <Select
                    value={form.subcategory || "__none"}
                    onValueChange={(v) =>
                      setForm({ ...form, subcategory: v === "__none" ? "" : v })
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none">None</SelectItem>
                      {SUBCATEGORIES[form.category].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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

              <div className="grid grid-cols-3 gap-4 items-end">
                <div className="flex flex-col gap-2">
                  <Label className="text-xs tracking-[0.2em]">
                    REGULAR PRICE
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.regularPrice}
                    onChange={(e) =>
                      setForm({ ...form, regularPrice: e.target.value })
                    }
                    placeholder="15000"
                    className="h-10"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-xs tracking-[0.2em]">SALE PRICE *</Label>
                  <Input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="12500"
                    className="h-10"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-xs tracking-[0.2em]">DISCOUNT</Label>

                  <div className="h-10 flex items-center text-red-500 font-semibold border rounded-md px-3">
                    {(() => {
                      const r = Number(form.regularPrice);
                      const s = Number(form.price);
                      if (!r || !s || r <= s) return "0%";
                      return `${Math.round(((r - s) / r) * 100)}%`;
                    })()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em]">DESCRIPTION</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Short product description..."
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between rounded-md border border-border bg-muted/20 p-3">
                <div className="space-y-0.5">
                  <Label className="text-xs tracking-[0.2em] flex items-center gap-2">
                    {published ? (
                      <Eye className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                    {published ? "PUBLISHED" : "DRAFT"}
                  </Label>
                  <p className="text-[11px] text-muted-foreground">
                    {published
                      ? "Visible on the storefront"
                      : "Hidden from customers"}
                  </p>
                </div>
                <Switch checked={published} onCheckedChange={setPublished} />
              </div>

              <Button
                type="submit"
                className="w-full h-11 tracking-[0.2em] text-xs"
              >
                {editingId ? "SAVE CHANGES" : "ADD PRODUCT"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {products.length === 0 ? (
        <div className="bg-card border border-dashed border-border rounded-lg overflow-hidden">
          <div className="px-6 sm:px-12 py-14 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Package className="w-7 h-7 text-accent" />
            </div>
            <p className="text-[10px] tracking-[0.4em] text-accent mb-3">
              GET STARTED
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">
              Your catalog is empty
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              Add your first product to start building the BAMBOTIA storefront.
              You'll need just three things to get a listing live.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
              <div className="rounded-md border border-border bg-background/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ImageIcon className="w-4 h-4 text-accent" />
                  <p className="text-[10px] tracking-[0.25em] text-muted-foreground">
                    REQUIRED
                  </p>
                </div>
                <p className="text-sm font-medium text-foreground">
                  Product image
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Upload a JPG or PNG of your product.
                </p>
              </div>
              <div className="rounded-md border border-border bg-background/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-accent" />
                  <p className="text-[10px] tracking-[0.25em] text-muted-foreground">
                    REQUIRED
                  </p>
                </div>
                <p className="text-sm font-medium text-foreground">
                  Product name
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  e.g. "Royal Gold Bangle".
                </p>
              </div>
              <div className="rounded-md border border-border bg-background/50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-accent" />
                  <p className="text-[10px] tracking-[0.25em] text-muted-foreground">
                    REQUIRED
                  </p>
                </div>
                <p className="text-sm font-medium text-foreground">
                  Price in PKR
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Stock and description are optional.
                </p>
              </div>
            </div>

            <Button
              onClick={openAdd}
              className="tracking-[0.2em] text-xs h-11 px-6"
            >
              <Plus className="w-4 h-4" /> ADD YOUR FIRST PRODUCT
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-md border border-border bg-card px-4 py-3">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={allSelected}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all products"
              />
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {selectedIds.size > 0
                  ? `${selectedIds.size} selected`
                  : `Select all (${products.length})`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={selectedIds.size === 0}
                onClick={() => handleBulkPublish(true)}
                className="tracking-[0.2em] text-[10px] h-9"
              >
                <Eye className="w-3.5 h-3.5" /> PUBLISH
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={selectedIds.size === 0}
                onClick={() => handleBulkPublish(false)}
                className="tracking-[0.2em] text-[10px] h-9"
              >
                <EyeOff className="w-3.5 h-3.5" /> DRAFT
              </Button>
              {selectedIds.size > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedIds(new Set())}
                  className="tracking-[0.2em] text-[10px] h-9 text-muted-foreground"
                >
                  CLEAR
                </Button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((p) => (
              <div
                key={p.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(p.id, el);
                  else cardRefs.current.delete(p.id);
                }}
                className={`bg-card border rounded-lg overflow-hidden group relative transition-colors ${
                  selectedIds.has(p.id)
                    ? "border-accent ring-1 ring-accent/40"
                    : "border-border"
                } ${!p.published ? "opacity-75" : ""} ${
                  highlightId === p.id
                    ? "ring-2 ring-accent shadow-lg animate-pulse"
                    : ""
                }`}
              >
                <div className="aspect-square bg-muted/30 overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                      !p.published ? "grayscale" : ""
                    }`}
                  />
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-md bg-background/90 backdrop-blur border border-border flex items-center justify-center">
                    <Checkbox
                      checked={selectedIds.has(p.id)}
                      onCheckedChange={() => toggleSelected(p.id)}
                      aria-label={`Select ${p.name}`}
                    />
                  </div>
                  <span
                    className={`absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] tracking-[0.2em] font-medium backdrop-blur ${
                      p.published
                        ? "bg-accent/90 text-accent-foreground"
                        : "bg-muted/90 text-muted-foreground border border-border"
                    }`}
                  >
                    {p.published ? (
                      <>
                        <Eye className="w-3 h-3" /> LIVE
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" /> DRAFT
                      </>
                    )}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-[10px] tracking-[0.3em] text-accent uppercase">
                    {p.category}
                  </p>
                  <h3 className="font-serif text-lg text-foreground line-clamp-1">
                    {p.name}
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        PKR {p.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Stock: {p.stock}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-accent"
                        onClick={() => {
                          togglePublished(p.id);
                          toast.success(
                            p.published
                              ? "Moved to draft"
                              : "Published to storefront",
                          );
                        }}
                        aria-label={
                          p.published ? "Unpublish product" : "Publish product"
                        }
                      >
                        {p.published ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
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
        </>
      )}
    </div>
  );
};

export default AdminProducts;
