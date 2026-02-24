import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    Users, Package, ShoppingCart, TrendingUp,
    CheckCircle, XCircle, Shield, ClipboardList,
    BarChart2, Clock, BadgeCheck, ArrowUpRight
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
        <div className="min-h-screen bg-zinc-50">
            <Navbar />

            {/* Header */}
            <div className="bg-white border-b border-zinc-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Admin Panel</h1>
                            <p className="text-sm text-zinc-500 mt-0.5">Full system control and monitoring</p>
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                            System Live
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mt-6 overflow-x-auto pb-px">
                        {TABS.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id as Tab)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${tab === t.id
                                    ? 'bg-zinc-900 text-white shadow-sm'
                                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                                    }`}
                            >
                                {t.icon}
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* ── OVERVIEW ── */}
                {tab === 'overview' && stats && (
                    <div className="space-y-6">
                        {/* Main stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                            {[
                                { label: 'Total Users', value: stats.total_users, icon: <Users className="h-5 w-5" />, bg: 'bg-blue-500', change: 'All time' },
                                { label: 'Total Products', value: stats.total_products, icon: <Package className="h-5 w-5" />, bg: 'bg-violet-500', change: 'All time' },
                                { label: 'Total Orders', value: stats.total_orders, icon: <ShoppingCart className="h-5 w-5" />, bg: 'bg-orange-500', change: 'All time' },
                                { label: 'Total Revenue (RWF)', value: Number(stats.total_revenue).toLocaleString(), icon: <TrendingUp className="h-5 w-5" />, bg: 'bg-brand-600', change: 'Delivered orders' },
                                { label: 'My Commission (RWF)', value: Number(stats.total_commission || 0).toLocaleString(), icon: <TrendingUp className="h-5 w-5" />, bg: 'bg-green-600', change: '10% per sale' },
                            ].map((s) => (
                                <div key={s.label} className="bg-white rounded-2xl border border-zinc-100 p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center text-white`}>
                                            {s.icon}
                                        </div>
                                        <ArrowUpRight className="h-4 w-4 text-zinc-300" />
                                    </div>
                                    <p className="text-2xl font-bold text-zinc-900 tracking-tight">{s.value}</p>
                                    <p className="text-sm text-zinc-500 mt-1">{s.label}</p>
                                    <p className="text-xs text-zinc-400 mt-0.5">{s.change}</p>
                                </div>
                            ))}
                        </div>

                        {/* Alert cards */}
                        <div className="grid sm:grid-cols-3 gap-4">
                            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-amber-700">Pending Products</p>
                                    <Package className="h-4 w-4 text-amber-500" />
                                </div>
                                <p className="text-4xl font-black text-amber-600">{stats.pending_products}</p>
                                <button onClick={() => setTab('products')}
                                    className="mt-3 text-xs font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1 transition-colors">
                                    Review now <ArrowUpRight className="h-3 w-3" />
                                </button>
                            </div>
                            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-orange-700">Pending Orders</p>
                                    <ShoppingCart className="h-4 w-4 text-orange-500" />
                                </div>
                                <p className="text-4xl font-black text-orange-600">{stats.pending_orders}</p>
                                <button onClick={() => setTab('orders')}
                                    className="mt-3 text-xs font-semibold text-orange-700 hover:text-orange-900 flex items-center gap-1 transition-colors">
                                    View orders <ArrowUpRight className="h-3 w-3" />
                                </button>
                            </div>
                            <div className="bg-zinc-900 rounded-2xl p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-zinc-400">Orders Today</p>
                                    <TrendingUp className="h-4 w-4 text-zinc-400" />
                                </div>
                                <p className="text-4xl font-black text-white">{stats.today_orders}</p>
                                <p className="mt-3 text-xs text-zinc-500">Since midnight</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── USERS ── */}
                {tab === 'users' && (
                    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                            <h2 className="font-semibold text-zinc-900">All Users</h2>
                            <span className="text-xs text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-full">{users.length} total</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-zinc-50 border-b border-zinc-100">
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">User</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Role</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Products</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Orders</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Status</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50">
                                    {users.map((user: any) => (
                                        <tr key={user.id} className="hover:bg-zinc-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 bg-zinc-900 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                                        {user.name[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-zinc-900">{user.name}</p>
                                                        <p className="text-xs text-zinc-400">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-violet-100 text-violet-700' :
                                                    user.role === 'SELLER' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-zinc-100 text-zinc-600'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-zinc-600 font-medium">{user.product_count}</td>
                                            <td className="px-6 py-4 text-zinc-600 font-medium">{user.order_count}</td>
                                            <td className="px-6 py-4">
                                                {user.verified_status ? (
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                                        <BadgeCheck className="h-3 w-3" /> Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-500">
                                                        Unverified
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {!user.verified_status && user.role === 'SELLER' && (
                                                        <button
                                                            onClick={() => verifyUser.mutate(user.id)}
                                                            className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
                                                        >
                                                            Verify
                                                        </button>
                                                    )}
                                                    {user.role !== 'ADMIN' && (
                                                        <button
                                                            onClick={() => suspendUser.mutate(user.id)}
                                                            className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors font-medium"
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

                {/* ── PRODUCTS ── */}
                {tab === 'products' && (
                    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                            <h2 className="font-semibold text-zinc-900">All Products</h2>
                            <span className="text-xs text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-full">{products.length} total</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-zinc-50 border-b border-zinc-100">
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Product</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Seller</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Price</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Status</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50">
                                    {products.map((product: any) => (
                                        <tr key={product.id} className="hover:bg-zinc-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                                                        {product.images?.[0] && (
                                                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-zinc-900 max-w-[200px] truncate">{product.title}</p>
                                                        <p className="text-xs text-zinc-400 mt-0.5">{product.category_name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-zinc-600">{product.seller_name}</td>
                                            <td className="px-6 py-4 font-semibold text-zinc-900">{Number(product.price).toLocaleString()} <span className="text-xs font-normal text-zinc-400">RWF</span></td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${product.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                                    product.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                                        product.status === 'SOLD' ? 'bg-zinc-100 text-zinc-600' :
                                                            'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.status === 'PENDING' && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => approveProduct.mutate(product.id)}
                                                            className="flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors font-medium"
                                                        >
                                                            <CheckCircle className="h-3.5 w-3.5" /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => rejectProduct.mutate(product.id)}
                                                            className="flex items-center gap-1 text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors font-medium"
                                                        >
                                                            <XCircle className="h-3.5 w-3.5" /> Reject
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

                {/* ── ORDERS ── */}
                {tab === 'orders' && (
                    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                            <h2 className="font-semibold text-zinc-900">All Orders</h2>
                            <span className="text-xs text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-full">{orders.length} total</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-zinc-50 border-b border-zinc-100">
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Order</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Buyer</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Product</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Amount</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Payment</th>
                                        <th className="text-left px-6 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wide">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50">
                                    {orders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-zinc-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-mono text-xs font-semibold text-zinc-700 bg-zinc-100 px-2 py-1 rounded-lg w-fit">
                                                    #{order.id.slice(0, 8).toUpperCase()}
                                                </p>
                                                <p className="text-xs text-zinc-400 mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-zinc-900">{order.buyer_name}</p>
                                                <p className="text-xs text-zinc-400">{order.buyer_phone}</p>
                                            </td>
                                            <td className="px-6 py-4 text-zinc-600 max-w-[160px] truncate">{order.product_title}</td>
                                            <td className="px-6 py-4 font-semibold text-zinc-900">
                                                {Number(order.product_price).toLocaleString()} <span className="text-xs font-normal text-zinc-400">RWF</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-medium text-zinc-500 bg-zinc-50 border border-zinc-100 px-2 py-1 rounded-lg">
                                                    {order.payment_method}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus.mutate({ id: order.id, status: e.target.value })}
                                                    className="text-xs border border-zinc-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 font-medium text-zinc-700"
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

                {/* ── AUDIT LOGS ── */}
                {tab === 'logs' && (
                    <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-zinc-100 flex items-center gap-2">
                            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                                <Shield className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-zinc-900">Audit Trail</h2>
                                <p className="text-xs text-zinc-400">Every admin action recorded</p>
                            </div>
                        </div>
                        <div className="divide-y divide-zinc-50">
                            {logs.length === 0 && (
                                <div className="px-6 py-12 text-center">
                                    <ClipboardList className="h-8 w-8 text-zinc-200 mx-auto mb-3" />
                                    <p className="text-zinc-400 text-sm">No admin actions recorded yet.</p>
                                </div>
                            )}
                            {logs.map((log: any) => (
                                <div key={log.id} className="px-6 py-4 flex items-start gap-4 hover:bg-zinc-50 transition-colors">
                                    <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <ClipboardList className="h-3.5 w-3.5 text-zinc-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-zinc-900">
                                            <span className="font-semibold">{log.admin_name}</span>
                                            <span className="text-zinc-400"> performed </span>
                                            <span className="font-mono text-xs bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-lg">{log.action}</span>
                                            <span className="text-zinc-400"> on </span>
                                            <span className="font-medium text-zinc-700">{log.target_type}</span>
                                        </p>
                                        {log.details && <p className="text-xs text-zinc-400 mt-1">{log.details}</p>}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 flex-shrink-0 bg-zinc-50 px-2.5 py-1 rounded-lg">
                                        <Clock className="h-3 w-3" />
                                        {new Date(log.created_at).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── REVENUE ── */}
                {tab === 'revenue' && revenue && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-zinc-100">
                                <h2 className="font-semibold text-zinc-900">Sales by Category</h2>
                                <p className="text-xs text-zinc-400 mt-0.5">From delivered orders only</p>
                            </div>
                            <div className="divide-y divide-zinc-50">
                                {revenue.by_category.length === 0 && (
                                    <div className="px-6 py-12 text-center">
                                        <TrendingUp className="h-8 w-8 text-zinc-200 mx-auto mb-3" />
                                        <p className="text-zinc-400 text-sm">No delivered orders yet.</p>
                                    </div>
                                )}
                                {revenue.by_category.map((row: any, i: number) => (
                                    <div key={row.category} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-zinc-300 w-5">#{i + 1}</span>
                                            <span className="font-semibold text-zinc-900">{row.category}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-zinc-900">{Number(row.revenue).toLocaleString()} <span className="text-xs font-normal text-zinc-400">RWF</span></p>
                                            <p className="text-xs text-zinc-400">{row.sales} sales</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-zinc-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-zinc-100">
                                <h2 className="font-semibold text-zinc-900">Daily Revenue</h2>
                                <p className="text-xs text-zinc-400 mt-0.5">Last 30 days</p>
                            </div>
                            <div className="divide-y divide-zinc-50 max-h-96 overflow-y-auto">
                                {revenue.daily.length === 0 && (
                                    <div className="px-6 py-12 text-center">
                                        <TrendingUp className="h-8 w-8 text-zinc-200 mx-auto mb-3" />
                                        <p className="text-zinc-400 text-sm">No revenue data yet.</p>
                                    </div>
                                )}
                                {revenue.daily.map((row: any) => (
                                    <div key={row.date} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                                        <span className="text-sm text-zinc-600">{new Date(row.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                                        <div className="text-right">
                                            <p className="font-bold text-zinc-900">{Number(row.revenue).toLocaleString()} <span className="text-xs font-normal text-zinc-400">RWF</span></p>
                                            <p className="text-xs text-zinc-400">{row.order_count} orders</p>
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