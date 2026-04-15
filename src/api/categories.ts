import api from './axios'

export interface Category {
    id: string
    name: string
}

export const categoriesApi = {
    getAll: async (): Promise<Category[]> => {
        const res = await api.get<{ data: Category[] }>('/categories')
        return res.data.data
    },
}