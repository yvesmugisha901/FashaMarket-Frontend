import api from './axios'

export const reviewsApi = {
    create: async (data: {
        product_id: string
        order_id: string
        rating: number
        comment: string
    }) => {
        const res = await api.post('/reviews', data)
        return res.data
    },

    getByProduct: async (productId: string) => {
        const res = await api.get(`/reviews/product/${productId}`)
        return res.data
    },
}