## Zustand Breakdown

# TS Ref

interface CartItem {
    productId: string;
    slug: string;
    name: string;
    image: string;
    vintage?: string;
    unitPrice: number;
    quantity: number;
}

interface CartState {
    items: CartItem[]
}

interface CartActions {
    addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
    updateQuantity: (id: string, quantity: number) => void
    removeItem: (id: string) => void
    clearCart: () => void
    subTotal: () => number
    itemCount: () => number
}

type CartStore = CartState & CartActions

## React vs Zustand

# State examples

React:
const [items, setItems] = useState<CartItems[]>([])
const [isOpen, setIsOpen] = useState<boolean>(false)
const [discount, setDiscount] = useState<number>(0)

Zustand:
items: []
isOpen: false
discount: 0

# Set state

React:
setItems(prevItems => prevItems.filter((i) => i.productId !== productId))

setItems - function to updatet the CURRENT value to a NEW a value (eg, false > true || 0 > 1 || "Accept" > "Decline")
() - whatever action + syntax to update the state

Zustand:
set((state) => ({
    items: state.items.filter((i) => i.productId !== productId)
}))

set                 -> function to update the state (eg, setItems(...))
(state) => ({...})  -> updater function: takes the old collection in and returns an object of the pieces to change
items:              -> property to have its state managed, paird with its new value
state.items         -> a doorway to the entire collection/array
....                -> action that will be carried out (eg, .filter((i) => i.productId !== productId))

default state eg,

const items = []

-> update state by adding item

addItem: (item, quantity = 1) => set((state) => {
    const existing = state.items.find(
        (i) => i.productId === item.productId
    );

    if (existing) {
        return {
            items: state.items.map((i) =>
            i.productId === item.productId ? {...i, quantity: i.quantity + quantity} : i),
        };
    }

    return { items: [...state.items, { ...item, quantity }] }
}),

items = [
    {
        productId: string,
        slug: 'bas-dr-muscat-de-beaumes-de-venise-2000'
        name: 'Muscat de Beaumes de Venise',
        producer: 'Bas Déré'
        imageUrl: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fg5nz3uq4%2Fproduction%2F2f725e67e8172d6207a1f1d98e883454237d7e3b-1536x1536.webp&w=256&q=75'http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fg5nz3uq4%2Fproduction%2F2f725e67e8172d6207a1f1d98e883454237d7e3b-1536x1536.webp&w=256&q=75',
        vintage: 2000,
        unitPrice: 30;
        quantity: 1
    }
]