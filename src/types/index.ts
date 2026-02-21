// ─── User ───────────────────────────────────────────────────────────────────

export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN'

export interface User {
    id: string
    name: string
    email: string
    phone: string
    role: UserRole
    verified_status: boolean
    created_at: string
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AuthResponse {
    token: string
    user: User
}

export interface LoginInput {
    email: string
    password: string
}

export interface RegisterInput {
    name: string
    email: string
    phone: string
    password: string
    role: 'BUYER' | 'SELLER'
}

// ─── Product ─────────────────────────────────────────────────────────────────

export type ProductStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SOLD'
export type ProductCondition = 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR'

export interface Product {
    id: string
    seller_id: string
    seller_name: string
    seller_verified: boolean
    title: string
    description: string
    price: number
    condition: ProductCondition
    status: ProductStatus
    category_id: string
    category_name: string
    images: string[]
    created_at: string
}

export interface CreateProductInput {
    title: string
    description: string
    price: number
    condition: ProductCondition
    category_id: string
    images: string[]
}

export interface ProductFilters {
    category_id?: string
    condition?: ProductCondition
    min_price?: number
    max_price?: number
    search?: string
    page?: number
    limit?: number
}

// ─── Order ───────────────────────────────────────────────────────────────────

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
export type PaymentMethod = 'COD' | 'MOBILE_MONEY'

export interface Order {
    id: string
    user_id: string
    product_id: string
    product_title: string
    product_price: number
    status: OrderStatus
    agreement_signed: boolean
    payment_method: PaymentMethod
    created_at: string
}

export interface CreateOrderInput {
    product_id: string
    payment_method: PaymentMethod
}

// ─── Agreement ───────────────────────────────────────────────────────────────

export interface Agreement {
    id: string
    order_id: string
    agreement_text: string
    signed_at: string
}

// ─── Review ──────────────────────────────────────────────────────────────────

export interface Review {
    id: string
    product_id: string
    user_id: string
    user_name: string
    rating: number
    comment: string | null
    created_at: string
}

// ─── Category ────────────────────────────────────────────────────────────────

export interface Category {
    id: string
    name: string
}

// ─── API Response wrapper ────────────────────────────────────────────────────

export interface ApiResponse<T> {
    data: T
    message?: string
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
}