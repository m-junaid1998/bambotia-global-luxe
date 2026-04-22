import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface AdminProduct {
  id: string;
  name: string;
  category: "jewellery" | "cosmetics" | "purses";
  price: number;
  stock: number;
  image: string;
  description: string;
  createdAt: number;
  published: boolean;
}

interface AdminProductsContextValue {
  products: AdminProduct[];
  addProduct: (p: Omit<AdminProduct, "id" | "createdAt">) => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, p: Omit<AdminProduct, "id" | "createdAt">) => void;
  togglePublished: (id: string) => void;
}

const STORAGE_KEY = "bambotia_admin_products";

const AdminProductsContext = createContext<AdminProductsContextValue | undefined>(undefined);

export const AdminProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<AdminProduct[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: AdminProduct[] = JSON.parse(stored);
        // Backfill `published` for products saved before this field existed
        setProducts(parsed.map((p) => ({ ...p, published: p.published ?? true })));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const addProduct: AdminProductsContextValue["addProduct"] = (p) => {
    setProducts((prev) => [
      { ...p, id: crypto.randomUUID(), createdAt: Date.now() },
      ...prev,
    ]);
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct: AdminProductsContextValue["updateProduct"] = (id, p) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...p } : prod))
    );
  };

  const togglePublished = (id: string) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === id ? { ...prod, published: !prod.published } : prod
      )
    );
  };

  return (
    <AdminProductsContext.Provider value={{ products, addProduct, removeProduct, updateProduct, togglePublished }}>
      {children}
    </AdminProductsContext.Provider>
  );
};

export const useAdminProducts = () => {
  const ctx = useContext(AdminProductsContext);
  if (!ctx) throw new Error("useAdminProducts must be used within AdminProductsProvider");
  return ctx;
};
