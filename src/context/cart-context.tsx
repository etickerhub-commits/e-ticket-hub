"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types";

const SERVICE_FEE = 80;

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (eventId: string, ticketTypeId: string, quantity: number) => void;
  removeItem: (eventId: string, ticketTypeId: string) => void;
  clearCart: () => void;
  subtotal: number;
  fees: number;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("eth-cart");
    if (raw) {
      setItems(JSON.parse(raw));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("eth-cart", JSON.stringify(items));
  }, [items]);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const fees = items.length > 0 ? SERVICE_FEE : 0;
  const total = subtotal + fees;

  const value = useMemo(
    () => ({
      items,
      addItem: (incoming: CartItem) => {
        setItems((prev) => {
          const idx = prev.findIndex(
            (item) => item.eventId === incoming.eventId && item.ticketTypeId === incoming.ticketTypeId,
          );
          if (idx === -1) {
            return [...prev, incoming];
          }
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + incoming.quantity };
          return next;
        });
      },
      updateQuantity: (eventId: string, ticketTypeId: string, quantity: number) => {
        setItems((prev) =>
          prev
            .map((item) =>
              item.eventId === eventId && item.ticketTypeId === ticketTypeId
                ? { ...item, quantity: Math.max(1, quantity) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        );
      },
      removeItem: (eventId: string, ticketTypeId: string) => {
        setItems((prev) =>
          prev.filter((item) => !(item.eventId === eventId && item.ticketTypeId === ticketTypeId)),
        );
      },
      clearCart: () => setItems([]),
      subtotal,
      fees,
      total,
    }),
    [items, subtotal, fees, total],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

