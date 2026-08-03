import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    productId: string
    name: string
    price: number
    quantity: number
    image: string
    producer?: string
    vintage?: number
}

interface CartState {
    items: CartItem[]

    // Computed Values
    totalItems: number
    totalPrice: number
    
    // Actions
    addItem: (item: Omit<CartItem, 'quantity' | 'producer' | 'vintage'>) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void

    // Helper methods
    getItem: (id: string) => CartItem | undefined
    hasItem: (id:string) => boolean
}

const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            // State
            items: [],

            get totalItems() {
                return get().items.reduce((sum, item) => sum + item.quantity, 0)
            },

            /*****************************************/

            get totalPrice() {
                return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
            },

            /*****************************************/

            addItem: (newItem) => {
                const items = get().items;
                const existingItem = items.find(item => item.productId === newItem.productId);

                if (existingItem) {
                    set({
                        items: items.map(item => 
                            item.productId === newItem.productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        )
                    })
                } else {
                    set({
                        items: [ ...items, { ...newItem, quantity: 1 }]
                    })
                }
            },

            /*****************************************/

            removeItem: (productId) => {
                set({
                    items: get().items.filter(item => item.productId !== productId)
                })
            },

            /*****************************************/

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                set({
                    items: get().items.map(item => 
                        item.productId === productId ? { ...item, quantity } : item
                    )
                })
            },

            /*****************************************/

            clearCart: () => set({ items: [] }),

            /*****************************************/

            getItem: (productId) => {
                return get().items.find(item => item.productId === productId)
            },

            /*****************************************/

            hasItem: (productId) => {
                return get().items.some(item => item.productId === productId)
            }
        }),
        { name: 'house-wine-cart' }
    )
)