import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    productId: string;
    slug: string;
    name: string;
    producer: string; 
    image: string;
    vintage: number | string;
    unitPrice: number;
    orderQuantity: number;
    stockLevel: number;
}

export interface CartState {
    items: CartItem[]
    isDrawer: boolean
    isCart: boolean
    thankYouMessage: boolean
}

interface CartActions {
    addItem: (item: Omit<CartItem, 'orderQuantity'>, orderQuantity?: number) => boolean
    updateQuantity: (id: string, orderQuantity: number) => void
    removeItem: (id: string) => void
    clearCart: () => void
    subTotal: () => number
    itemCount: () => number
    drawerToggle: () => void
    cartToggle: () => void
    showThankYou: () => void
    hideThankYou: () => void
}

type CartStore = CartState & CartActions

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            // State
            items: [],
            isDrawer: false,
            isCart: true,
            thankYouMessage: false, 
            
            // Actions
            addItem: (item, orderQuantity = 1) =>  {
                if (!item.productId || orderQuantity <= 0) {
                    return false;
                }

                set((state) => {
                    const existing = state.items.find(
                        (i) => i.productId === item.productId
                    );

                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                            i.productId === item.productId ? {...i} : i),
                            // i.productId === item.productId ? {...i, orderQuantity: i.orderQuantity + orderQuantity} : i),
                        };
                    }

                    return { items: [...state.items, { ...item, orderQuantity }] }
                });

                return true;
            },

            /*************************************************************************************************/

            updateQuantity: (productId, orderQuantity) => set((state) => ({
                items: 
                orderQuantity <= 0 
                    ? state.items.filter((i) => i.productId !== productId)  
                    : state.items.map((i) => i.productId === productId ? { ...i, orderQuantity } : i
                )
            })),

            /*************************************************************************************************/

            removeItem: (productId) => set((state) => ({
                items: state.items.filter((i) => 
                    i.productId !== productId
                )
            })),

            /*************************************************************************************************/

            clearCart: () => set({
                items: []
            }),

            /*************************************************************************************************/

            subTotal: () => {
                const { items } = get();
                return items.reduce((sum, i) => sum + i.unitPrice * i.orderQuantity, 0)
            },

            /*************************************************************************************************/

            itemCount: () => {
                const { items } = get();
                return items.reduce((sum, i) => sum + i.orderQuantity, 0)
            },

            /*************************************************************************************************/

            drawerToggle: () => set((state) => ({
                isDrawer: !state.isDrawer
            })),

            cartToggle: () => set((state) => ({
                isCart: !state.isCart
            })),

            /*************************************************************************************************/

            showThankYou: () => set({
                thankYouMessage: true
            }),

            hideThankYou: () => set({
                thankYouMessage: false
            }),
        }),
        { name: 'cart-storage' }
    )
)

