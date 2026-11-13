"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PRODUCTS, VIVERO_CONFIG } from "@/data/vivero";

export interface ConsultaItem {
  productId: string;
  variantId?: string;
  qty: number;
}

export type ModalType = "ubicacion" | "horarios" | null;

interface ConsultaContextValue {
  items: ConsultaItem[];
  totalUnits: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  modalType: ModalType;
  setModalType: (type: ModalType) => void;
  addItem: (productId: string, qty: number, variantId?: string) => void;
  updateQty: (productId: string, qty: number, variantId?: string) => void;
  removeItem: (productId: string, variantId?: string) => void;
  clearConsulta: () => void;
  generateDraftText: (locality?: string) => string;
  copyDraftToClipboard: (locality?: string) => Promise<boolean>;
  sendWhatsApp: (locality?: string) => void;
  announcedMessage: string;
}

const ConsultaContext = createContext<ConsultaContextValue | null>(null);

const STORAGE_KEY = "vsv_consulta_cart_v2";

export function ConsultaProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ConsultaItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [announcedMessage, setAnnouncedMessage] = useState("");

  // Safely restore items from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // validate and keep only items that reference existing products
          const valid = parsed.filter(
            (it) => it && typeof it.productId === "string" && typeof it.qty === "number" && it.qty > 0 &&
            PRODUCTS.some((p) => p.id === it.productId)
          );
          setItems(valid);
        }
      }
    } catch {
      // LocalStorage error or invalid JSON: start clean
    }
    setIsHydrated(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable or full
    }
  }, [items, isHydrated]);

  const addItem = (productId: string, qty: number, variantId?: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product || qty <= 0) return;

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === productId && (variantId ? i.variantId === variantId : !i.variantId)
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          qty: next[existingIndex].qty + qty,
        };
        return next;
      }
      return [...prev, { productId, variantId, qty }];
    });

    setAnnouncedMessage(`Se agregaron ${qty} unidad(es) de ${product.commonName} a tu consulta.`);
    // clear announcement after 4s
    setTimeout(() => setAnnouncedMessage(""), 4000);
  };

  const updateQty = (productId: string, qty: number, variantId?: string) => {
    if (qty <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.productId === productId && (variantId ? i.variantId === variantId : !i.variantId)) {
          return { ...i, qty };
        }
        return i;
      })
    );
  };

  const removeItem = (productId: string, variantId?: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setItems((prev) =>
      prev.filter(
        (i) => !(i.productId === productId && (variantId ? i.variantId === variantId : !i.variantId))
      )
    );
    if (product) {
      setAnnouncedMessage(`Se quitó ${product.commonName} de tu consulta.`);
      setTimeout(() => setAnnouncedMessage(""), 4000);
    }
  };

  const clearConsulta = () => {
    setItems([]);
  };

  const totalUnits = items.reduce((acc, item) => acc + item.qty, 0);

  const generateDraftText = (locality?: string) => {
    let msg = `Hola ${VIVERO_CONFIG.name}! Quisiera consultar disponibilidad y precios por:\n\n`;

    if (items.length > 0) {
      items.forEach((entry) => {
        const prod = PRODUCTS.find((p) => p.id === entry.productId);
        if (!prod) return;
        const variant = prod.variants.find((v) => v.id === entry.variantId);
        const variantLabel = variant ? ` (${variant.label})` : "";
        msg += `• ${prod.name}${variantLabel} — Cantidad: ${entry.qty}\n`;
      });
    } else {
      msg += `• Consulta general sobre catálogo de plantas.\n`;
    }

    if (locality && locality.trim()) {
      msg += `\nLocalidad / Destino: ${locality.trim()}\n`;
    }

    msg += `\nMuchas gracias!`;
    return msg;
  };

  const copyDraftToClipboard = async (locality?: string): Promise<boolean> => {
    try {
      const text = generateDraftText(locality);
      await navigator.clipboard.writeText(text);
      setAnnouncedMessage("Borrador copiado al portapapeles.");
      setTimeout(() => setAnnouncedMessage(""), 3000);
      return true;
    } catch {
      return false;
    }
  };

  const sendWhatsApp = (locality?: string) => {
    const text = generateDraftText(locality);
    const url = `https://wa.me/${VIVERO_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <ConsultaContext.Provider
      value={{
        items,
        totalUnits,
        drawerOpen,
        setDrawerOpen,
        modalType,
        setModalType,
        addItem,
        updateQty,
        removeItem,
        clearConsulta,
        generateDraftText,
        copyDraftToClipboard,
        sendWhatsApp,
        announcedMessage,
      }}
    >
      {children}
    </ConsultaContext.Provider>
  );
}

export function useConsulta() {
  const context = useContext(ConsultaContext);
  if (!context) {
    throw new Error("useConsulta debe utilizarse dentro de un ConsultaProvider");
  }
  return context;
}
