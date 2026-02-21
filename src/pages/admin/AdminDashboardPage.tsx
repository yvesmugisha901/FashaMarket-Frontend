import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    Users, Package, ShoppingCart, TrendingUp,
    CheckCircle, XCircle, Shield, ClipboardList,
    BarChart2, Clock, BadgeCheck
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import api from '@/api/axios'

type Tab = 'overview' | 'users' | 'products' | 'orders' | 'logs' | 'revenue'

const ORDER_STATUSES = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED']

export default function AdminDashboardPage() {
    const [tab, setTab] = useState<Tab>('overview')
    const qc = useQueryClient()

    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => (await api.get('/admin/stats')).data.data,
    })

    const { data: users = [] } = useQuery({
        queryKey: ['admin-users'],
        queryFn: async () => (await api.get('/admin/users')).data.data,
        enabled: tab === 'users',
    })

    const { data: products = [] } = useQuery({
        queryKey: ['admin-products'],
        queryFn: async () => (await api.get('/admin/products')).data.data,
        enabled: tab === 'products',
    })

    const { data: orders = [] } = useQuery({
        queryKey: ['admin-orders'],
        queryFn: async () => (await api.get('/admin/orders')).data.data,
        enabled: tab === 'orders',
    })

    const { data: logs = [] } = useQuery({
        queryKey: ['admin-logs'],
        queryFn: async () => (await api.get('/admin/audit-logs')).data.data,
        enabled: tab === 'logs',
    })

    const { data: revenue } = useQuery({
        queryKey: ['admin-revenue'],
        queryFn: async () => (await api.get('/admin/revenue')).data.data,
        enabled: tab === 'revenue',
    })

    const verifyUser = useMutation({
        mutationFn: (id: string) => api.patch(`/admin/users/${id}/verify`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
    })

    const suspendUser = useMutation({
        mutationFn: (id: string) => api.patch(`/admin/users/${id}/suspend`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
    })

    const approveProduct = useMutation({
        mutationFn: (id: string) => api.patch(`/admin/products/${id}/approve`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-products'] }),
    })

    const rejectProduct = useMutation({
        mutationFn: (id: string) => api.patch(`/admin/products/${id}/reject`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-products'] }),
    })

    const updateOrderStatus = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) =>
            api.patch(`/admin/orders/${id}/status`, { status }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-orders'] }),
    })

    const TABS = [
        { id: 'overview', label: 'Overview', icon: <BarChart2 className="h-4 w-4" /> },
        { id: 'users', label: 'Users', icon: <Users className="h-4 w-4" /> },
        { id: 'products', label: 'Products', icon: <Package className="h-4 w-4" /> },
        { id: 'orders', label: 'Orders', icon: <ShoppingCart className="h-4 w-4" /> },
        { id: 'logs', label: 'Audit Logs', icon: <ClipboardList className="h-4 w-4" /> },
        { id: 'revenue', label: 'Revenue', icon: <TrendingUp className="h-4 w-4" /> },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                    <p className="text-sm text-gray-500 mt-1">Full system control and monitoring</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-8 overflow-x-auto">
                    {TABS.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id as Tab)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab === t.id
                                ? 'bg-brand-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {t.icon}
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Overview */}
                {tab === 'overview' && stats && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[
                                { label: 'Total Users', value: stats.total_users, icon: <Users className="h-5 w-5" />, color: 'text-blue-600 bg-blue-50' },
                                { label: 'Total Products', value: stats.total_products, icon: <Package className="h-5 w-5" />, color: 'text-brand-600 bg-brand-50' },
                                { label: 'Total Orders', value: stats.total_orders, icon: <ShoppingCart className="h-5 w-5" />, color: 'text-purple-600 bg-purple-50' },
                                { label: 'Revenue (RWF)', value: Number(stats.total_revenue).toLocaleString(), icon: <TrendingUp className="h-5 w-5" />, color: 'text-green-600 bg-green-50' },
                            ].map((s) => (
                                <div key={s.label} className="card p-5">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                                        {s.icon}
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                                    <p className="text-sm text-gray-500 mt-1">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="card p-5 border-l-4 border-yellow-400">
                                <p className="text-sm text-gray-500">Pending Products</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending_products}</p>
                                <button onClick={() => setTab('products')} className="text-xs text-brand-600 mt-2 hover:underline">Review now →</button>
                            </div>
                            <div className="card p-5 border-l-4 border-orange-400">
                                <p className="text-sm text-gray-500">Pending Orders</p>
                                <p className="text-3xl font-bold text-orange-600 mt-1">{stats.pending_orders}</p>
                                <button onClick={() => setTab('orders')} className="text-xs text-brand-600 mt-2 hover:underline">View orders →</button>
                            </div>
                            <div className="card p-5 border-l-4 border-brand-400">
                                <p className="text-sm text-gray-500">Orders Today</p>
                                <p className="text-3xl font-bold text-brand-600 mt-1">{stats.today_orders}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Users */}
                {tab === 'users' && (
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">User</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Role</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Products</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Orders</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.map((user: any) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-400">{user.email}</p>
                                                <p className="text-xs text-gray-400">{user.phone}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`badge ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                                                    user.role === 'SELLER' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">{user.product_count}</td>
                                            <td className="px-4 py-3 text-gray-600">{user.order_count}</td>
                                            <td className="px-4 py-3">
                                                {user.verified_status ? (
                                                    <span className="badge bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                                                        <BadgeCheck className="h-3 w-3" /> Verified
                                                    </span>
                                                ) : (
                                                    <span className="badge bg-gray-100 text-gray-500">Unverified</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    {!user.verified_status && user.role === 'SELLER' && (
                                                        <button
                                                            onClick={() => verifyUser.mutate(user.id)}
                                                            className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded hover:bg-green-100 transition-colors"
                                                        >
                                                            Verify
                                                        </button>
                                                    )}
                                                    {user.role !== 'ADMIN' && (
                                                        <button
                                                            onClick={() => suspendUser.mutate(user.id)}
                                                            className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100 transition-colors"
                                                        >
                                                            Suspend
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Products */}
                {tab === 'products' && (
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Product</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Seller</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Price</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {products.map((product: any) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                        {product.images?.[0] && (
                                                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 max-w-[200px] truncate">{product.title}</p>
                                                        <p className="text-xs text-gray-400">{product.category_name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">{product.seller_name}</td>
                                            <td className="px-4 py-3 font-medium">{Number(product.price).toLocaleString()} RWF</td>
                                            <td className="px-4 py-3">
                                                <span className={`badge ${product.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                                    product.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                                        product.status === 'SOLD' ? 'bg-gray-100 text-gray-600' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {product.status === 'PENDING' && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => approveProduct.mutate(product.id)}
                                                            className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => rejectProduct.mutate(product.id)}
                                                            className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                            title="Reject"
                                                        >
                                                            <XCircle className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Orders */}
                {tab === 'orders' && (
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Order</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Buyer</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Product</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Amount</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Payment</th>
                                        <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {orders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                                <p className="font-mono text-xs text-gray-500">#{order.id.slice(0, 8).toUpperCase()}</p>
                                                <p className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-gray-900">{order.buyer_name}</p>
                                                <p className="text-xs text-gray-400">{order.buyer_phone}</p>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 max-w-[150px] truncate">{order.product_title}</td>
                                            <td className="px-4 py-3 font-medium">{Number(order.product_price).toLocaleString()} RWF</td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-gray-500">{order.payment_method}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus.mutate({ id: order.id, status: e.target.value })}
                                                    className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brand-500"
                                                >
                                                    {ORDER_STATUSES.map((s) => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Audit Logs */}
                {tab === 'logs' && (
                    <div className="card overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-brand-600" />
                            <span className="font-medium text-gray-900">Audit Trail</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {logs.length === 0 && (
                                <div className="px-4 py-8 text-center text-gray-400 text-sm">
                                    No admin actions recorded yet.
                                </div>
                            )}
                            {logs.map((log: any) => (
                                <div key={log.id} className="px-4 py-3 flex items-start gap-3">
                                    <div className="p-1.5 bg-brand-50 rounded-lg flex-shrink-0 mt-0.5">
                                        <ClipboardList className="h-3.5 w-3.5 text-brand-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900">
                                            <span className="font-medium">{log.admin_name}</span>
                                            {' '}<span className="text-gray-500">performed</span>{' '}
                                            <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">{log.action}</span>
                                            {' '}<span className="text-gray-500">on</span>{' '}
                                            <span className="text-gray-700">{log.target_type}</span>
                                        </p>
                                        {log.details && <p className="text-xs text-gray-400 mt-0.5">{log.details}</p>}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                                        <Clock className="h-3 w-3" />
                                        {new Date(log.created_at).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Revenue */}
                {tab === 'revenue' && revenue && (
                    <div className="space-y-6">
                        <div className="card overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-200 font-medium text-gray-900">
                                Sales by Category
                            </div>
                            <div className="divide-y divide-gray-100">
                                {revenue.by_category.length === 0 && (
                                    <p className="px-4 py-6 text-sm text-gray-400 text-center">No delivered orders yet.</p>
                                )}
                                {revenue.by_category.map((row: any) => (
                                    <div key={row.category} className="px-4 py-3 flex items-center justify-between">
                                        <span className="font-medium text-gray-900">{row.category}</span>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">{Number(row.revenue).toLocaleString()} RWF</p>
                                            <p className="text-xs text-gray-400">{row.sales} sales</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-200 font-medium text-gray-900">
                                Daily Revenue (Last 30 Days)
                            </div>
                            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                                {revenue.daily.length === 0 && (
                                    <p className="px-4 py-6 text-sm text-gray-400 text-center">No revenue data yet.</p>
                                )}
                                {revenue.daily.map((row: any) => (
                                    <div key={row.date} className="px-4 py-3 flex items-center justify-between">
                                        <span className="text-gray-600">{new Date(row.date).toLocaleDateString()}</span>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">{Number(row.revenue).toLocaleString()} RWF</p>
                                            <p className="text-xs text-gray-400">{row.order_count} orders</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}