// frontend/src/api/cart.ts

import api from './axios'

export interface CartItem {
    cart_item_id: string
    product_id: string
    title: string
    price: number
    images: string[]
    condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR'
    product_status: string
    seller_name: string
    seller_verified: boolean
    category_name: string
    added_at: string
}

export const cartApi = {
    getCart: async (): Promise<CartItem[]> => {
        const res = await api.get<{ data: CartItem[] }>('/cart')
        return res.data.data
    },

    addToCart: async (product_id: string): Promise<void> => {
        await api.post('/cart', { product_id })
    },

    removeFromCart: async (product_id: string): Promise<void> => {
        await api.delete(`/cart/${product_id}`)
    },

    clearCart: async (): Promise<void> => {
        await api.delete('/cart')
    },
}