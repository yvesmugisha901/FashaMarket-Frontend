// frontend/src/context/CartContext.tsx

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { cartApi, CartItem } from '@/api/cart'
import { useAuth } from '@/context/AuthContext'   // adjust path if different

interface CartContextType {
    items: CartItem[]
    count: number
    loading: boolean
    isInCart: (product_id: string) => boolean
    addToCart: (product_id: string) => Promise<void>
    removeFromCart: (product_id: string) => Promise<void>
    clearCart: () => Promise<void>
    refresh: () => Promise<void>
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()   // only fetch if logged in

    const refresh = useCallback(async () => {
        if (!user) { setItems([]); return }
        setLoading(true)
        try {
            const data = await cartApi.getCart()
            setItems(data)
        } catch {
            // silently fail — cart is non-critical
        } finally {
            setLoading(false)
        }
    }, [user])

    // Load cart when user logs in
    useEffect(() => { refresh() }, [refresh])

    const isInCart = (product_id: string) =>
        items.some((i) => i.product_id === product_id)

    const addToCart = async (product_id: string) => {
        await cartApi.addToCart(product_id)
        // Optimistic update — add placeholder, then refresh for full data
        await refresh()
    }

    const removeFromCart = async (product_id: string) => {
        // Optimistic update
        setItems((prev) => prev.filter((i) => i.product_id !== product_id))
        await cartApi.removeFromCart(product_id)
    }

    const clearCart = async () => {
        setItems([])
        await cartApi.clearCart()
    }

    return (
        <CartContext.Provider value={{
            items,
            count: items.length,
            loading,
            isInCart,
            addToCart,
            removeFromCart,
            clearCart,
            refresh,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used inside CartProvider')
    return ctx
}