import api from './axios'
import type { Order, CreateOrderInput, OrderStatus } from '@/types'

export const ordersApi = {
    create: async (data: CreateOrderInput): Promise<Order> => {
        const res = await api.post<{ data: Order }>('/orders', data)
        return res.data.data
    },

    getById: async (id: string): Promise<Order> => {
        const res = await api.get<{ data: Order }>(`/orders/${id}`)
        return res.data.data
    },

    myOrders: async (): Promise<Order[]> => {
        const res = await api.get<{ data: Order[] }>('/orders/my')
        return res.data.data
    },

    signAgreement: async (orderId: string): Promise<void> => {
        await api.post(`/orders/${orderId}/sign`)
    },

    submitPaymentProof: async (orderId: string, paymentReference: string): Promise<void> => {
        await api.post(`/orders/${orderId}/payment-proof`, { payment_reference: paymentReference })
    },

    confirmReceived: async (orderId: string): Promise<void> => {
        await api.post(`/orders/${orderId}/confirm-received`)
    },

    confirmCash: async (orderId: string): Promise<void> => {
        await api.post(`/orders/${orderId}/confirm-cash`)
    },

    updateStatus: async (orderId: string, status: OrderStatus): Promise<void> => {
        await api.patch(`/orders/${orderId}/status`, { status })
    },

    getAll: async (): Promise<Order[]> => {
        const res = await api.get<{ data: Order[] }>('/admin/orders')
        return res.data.data
    },
}