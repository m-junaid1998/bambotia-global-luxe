import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from "react";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  quantity: number;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  city: string;
  area: string;
  address: string;
  notes?: string;
}

export interface OrderTimelineEntry {
  status: OrderStatus;
  at: number;
  note?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  placedAt: number;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  estimatedDelivery: string;
  timeline: OrderTimelineEntry[];
}

const STORAGE_KEY = "bambotia_orders";

interface OrdersContextValue {
  orders: Order[];
  addOrder: (
    o: Omit<Order, "id" | "status" | "timeline">,
  ) => Order;
  updateStatus: (id: string, status: OrderStatus, note?: string) => void;
  cancelOrder: (id: string, reason?: string) => void;
  getOrder: (id: string) => Order | undefined;
}

const OrdersContext = createContext<OrdersContextValue | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const addOrder: OrdersContextValue["addOrder"] = (payload) => {
    const order: Order = {
      ...payload,
      id: crypto.randomUUID(),
      status: "pending",
      timeline: [{ status: "pending", at: Date.now(), note: "Order placed" }],
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const updateStatus: OrdersContextValue["updateStatus"] = (id, status, note) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status,
              timeline: [...o.timeline, { status, at: Date.now(), note }],
            }
          : o,
      ),
    );
  };

  const cancelOrder: OrdersContextValue["cancelOrder"] = (id, reason) => {
    updateStatus(id, "cancelled", reason || "Order cancelled");
  };

  const getOrder = (id: string) => orders.find((o) => o.id === id);

  const value = useMemo(
    () => ({ orders, addOrder, updateStatus, cancelOrder, getOrder }),
    [orders],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
};

export const STATUS_META: Record<
  OrderStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
  processing: {
    label: "Processing",
    className: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  },
  shipped: {
    label: "Shipped",
    className: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
  },
  delivered: {
    label: "Delivered",
    className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
  },
};