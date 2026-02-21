import api from './axios'
import type { Product, CreateProductInput, ProductFilters, PaginatedResponse } from '@/types'

export const productsApi = {
    getAll: async (filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> => {
        const res = await api.get<PaginatedResponse<Product>>('/products', { params: filters })
        return res.data
    },

    getById: async (id: string): Promise<Product> => {
        const res = await api.get<{ data: Product }>(`/products/${id}`)
        return res.data.data
    },

    create: async (data: CreateProductInput): Promise<Product> => {
        const res = await api.post<{ data: Product }>('/products', data)
        return res.data.data
    },

    myListings: async (): Promise<Product[]> => {
        const res = await api.get<{ data: Product[] }>('/products/my')
        return res.data.data
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/products/${id}`)
    },

    approve: async (id: string): Promise<void> => {
        await api.patch(`/products/${id}/approve`)
    },

    reject: async (id: string): Promise<void> => {
        await api.patch(`/products/${id}/reject`)
    },

    getPending: async (): Promise<Product[]> => {
        const res = await api.get<{ data: Product[] }>('/admin/products/pending')
        return res.data.data
    },
}