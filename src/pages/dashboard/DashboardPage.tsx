import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
    Plus, Trash2, BadgeCheck, Clock, XCircle,
    CheckCircle, Search, Package, ShoppingCart,
    TrendingUp, ArrowRight, Eye
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/context/AuthContext'
import { ordersApi } from '@/api/orders'
import { productsApi } from '@/api/products'
import api from '@/api/axios'

const STATUS_STYLE: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-700',
    APPROVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
    SOLD: 'bg-zinc-100 text-zinc-600',
}

const ORDER_STATUS_STYLE: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-700',
    PAID: 'bg-blue-100 text-blue-700',
    SHIPPED: 'bg-violet-100 text-violet-700',
    DELIVERED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
}

const STATUS_ICON: Record<string, React.ReactNode> = {
    PENDING: <Clock className="h-3 w-3" />,
    APPROVED: <CheckCircle className="h-3 w-3" />,
    REJECTED: <XCircle className="h-3 w-3" />,
    SOLD: <BadgeCheck className="h-3 w-3" />,
}

export default function DashboardPage() {
    const { user } = useAuth()
    const qc = useQueryClient()
    const isSeller = user?.role === 'SELLER'

    const { data: orders = [], isLoading: loadingOrders } = useQuery({
        queryKey: ['my-orders'],
        queryFn: ordersApi.myOrders,
    })
    const { data: sellerOrders = [], isLoading: loadingSellerOrders } = useQuery({
        queryKey: ['seller-orders'],
        queryFn: async () => (await api.get('/orders/seller')).data.data,
        enabled: isSeller,
    })

    const { data: myProducts = [], isLoading: loadingProducts } = useQuery({
        queryKey: ['my-products'],
        queryFn: productsApi.myListings,
        enabled: isSeller,
    })

    const deleteProduct = useMutation({
        mutationFn: productsApi.delete,
        onSuccess: () => qc.invalidateQueries({ queryKey: ['my-products'] }),
    })

    const handleDelete = (id: string) => {
        if (confirm('Delete this listing?')) deleteProduct.mutate(id)
    }

    const deliveredOrders = orders.filter((o: any) => o.status === 'DELIVERED')
    const pendingOrders = orders.filter((o: any) => o.status === 'PENDING')
    const shippedOrders = orders.filter((o: any) => o.status === 'SHIPPED')
    const approvedProducts = myProducts.filter((p: any) => p.status === 'APPROVED')
    const pendingProducts = myProducts.filter((p: any) => p.status === 'PENDING')

    const confirmCash = useMutation({
        mutationFn: (id: string) => api.post(`/orders/${id}/confirm-cash`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['seller-orders'] }),
    })

    return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />

            {/* Page header */}
            <div className="bg-white border-b border-zinc-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-white font-black text-lg">
                                {user?.name[0].toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
                                    Welcome back, {user?.name.split(' ')[0]}
                                </h1>
                                <p className="text-sm text-zinc-400 mt-0.5">
                                    {isSeller ? 'Seller Dashboard' : 'Buyer Dashboard'} · {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                        </div>
                        {isSeller ? (
                            <Link to="/sell"
                                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm">
                                <Plus className="h-4 w-4" />
                                New Listing
                            </Link>
                        ) : (
                            <Link to="/products"
                                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm">
                                <Search className="h-4 w-4" />
                                Browse Products
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl border border-zinc-100 p-5">
                        <div className="w-9 h-9 bg-zinc-100 rounded-xl flex items-center justify-center mb-3">
                            <ShoppingCart className="h-4 w-4 text-zinc-600" />
                        </div>
                        <p className="text-2xl font-black text-zinc-900">{orders.length}</p>
                        <p className="text-xs text-zinc-400 mt-1">Total Orders</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-zinc-100 p-5">
                        <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
                            <Clock className="h-4 w-4 text-amber-500" />
                        </div>
                        <p className="text-2xl font-black text-amber-600">{pendingOrders.length}</p>
                        <p className="text-xs text-zinc-400 mt-1">Pending</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-zinc-100 p-5">
                        <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center mb-3">
                            <TrendingUp className="h-4 w-4 text-violet-500" />
                        </div>
                        <p className="text-2xl font-black text-violet-600">{shippedOrders.length}</p>
                        <p className="text-xs text-zinc-400 mt-1">Shipped</p>
                    </div>
                    <div className="bg-white rounded-2xl border border-zinc-100 p-5">
                        <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center mb-3">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-2xl font-black text-green-600">{deliveredOrders.length}</p>
                        <p className="text-xs text-zinc-400 mt-1">Delivered</p>
                    </div>
                </div>

                {/* Seller extra stats */}
                {isSeller && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-zinc-900 rounded-2xl p-5">
                            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                                <Package className="h-4 w-4 text-white" />
                            </div>
                            <p className="text-2xl font-black text-white">{myProducts.length}</p>
                            <p className="text-xs text-zinc-400 mt-1">Total Listings</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-zinc-100 p-5">
                            <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center mb-3">
                                <BadgeCheck className="h-4 w-4 text-green-500" />
                            </div>
                            <p className="text-2xl font-black text-green-600">{approvedProducts.length}</p>
                            <p className="text-xs text-zinc-400 mt-1">Live Listings</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-zinc-100 p-5">
                            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
                                <Clock className="h-4 w-4 text-amber-500" />
                            </div>
                            <p className="text-2xl font-black text-amber-600">
                                {sellerOrders.filter((o: any) => o.status === 'PENDING' || o.status === 'AWAITING_CONFIRMATION').length}
                            </p>
                            <p className="text-xs text-zinc-400 mt-1">Pending Orders</p>
                        </div>
                        <div className="bg-white rounded-2xl border border-zinc-100 p-5">
                            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                                <TrendingUp className="h-4 w-4 text-blue-500" />
                            </div>
                            <p className="text-2xl font-black text-blue-600">
                                {sellerOrders.filter((o: any) => ['PAID', 'SHIPPED', 'DELIVERED'].includes(o.status)).length}
                            </p>
                            <p className="text-xs text-zinc-400 mt-1">Sales</p>
                        </div>
                    </div>
                )}
                {/* Seller Listings */}
                {isSeller && (
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-bold text-zinc-900">My Listings</h2>
                            {pendingProducts.length > 0 && (
                                <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2.5 py-1 rounded-full">
                                    {pendingProducts.length} pending review
                                </span>
                            )}
                        </div>

                        {loadingProducts && (
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white rounded-2xl border border-zinc-100 p-4 animate-pulse h-20" />
                                ))}
                            </div>
                        )}

                        {!loadingProducts && myProducts.length === 0 && (
                            <div className="bg-white rounded-2xl border border-zinc-100 p-10 text-center">
                                <Package className="h-10 w-10 text-zinc-200 mx-auto mb-3" />
                                <p className="text-zinc-500 font-medium">No listings yet</p>
                                <p className="text-zinc-400 text-sm mt-1">Start selling by creating your first listing</p>
                                <Link to="/sell"
                                    className="inline-flex items-center gap-2 mt-4 bg-zinc-900 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-zinc-700 transition-all">
                                    <Plus className="h-4 w-4" /> Create Listing
                                </Link>
                            </div>
                        )}

                        <div className="space-y-3">
                            {myProducts.map((product: any) => (
                                <div key={product.id}
                                    className="bg-white rounded-2xl border border-zinc-100 p-4 flex items-center gap-4 hover:shadow-sm transition-all">
                                    <div className="w-14 h-14 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                                        {product.images?.[0] ? (
                                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Package className="h-5 w-5 text-zinc-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-zinc-900 truncate">{product.title}</p>
                                        <p className="text-sm text-zinc-400 mt-0.5">{Number(product.price).toLocaleString()} RWF</p>
                                    </div>
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${STATUS_STYLE[product.status]}`}>
                                        {STATUS_ICON[product.status]}
                                        {product.status}
                                    </span>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        <Link to={`/products/${product.id}`}
                                            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg transition-all"
                                            title="View listing">
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                        {product.status === 'PENDING' && (
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                disabled={deleteProduct.isPending}
                                                className="p-2 text-zinc-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                title="Delete listing">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Orders */}
                <section>

                    {/* Seller — Incoming Orders */}
                    {isSeller && (
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-bold text-zinc-900">Incoming Orders</h2>
                                {sellerOrders.filter((o: any) => o.status === 'AWAITING_CONFIRMATION').length > 0 && (
                                    <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2.5 py-1 rounded-full animate-pulse">
                                        {sellerOrders.filter((o: any) => o.status === 'AWAITING_CONFIRMATION').length} awaiting payment confirmation
                                    </span>
                                )}
                            </div>

                            {loadingSellerOrders && (
                                <div className="space-y-3">
                                    {[1, 2].map(i => (
                                        <div key={i} className="bg-white rounded-2xl border border-zinc-100 p-4 animate-pulse h-20" />
                                    ))}
                                </div>
                            )}

                            {!loadingSellerOrders && sellerOrders.length === 0 && (
                                <div className="bg-white rounded-2xl border border-zinc-100 p-8 text-center">
                                    <ShoppingCart className="h-8 w-8 text-zinc-200 mx-auto mb-3" />
                                    <p className="text-zinc-500 font-medium">No orders yet</p>
                                    <p className="text-zinc-400 text-sm mt-1">Orders for your products will appear here</p>
                                </div>
                            )}

                            <div className="space-y-3">
                                {sellerOrders.map((order: any) => (
                                    <div key={order.id}
                                        className="bg-white rounded-2xl border border-zinc-100 p-4 hover:shadow-sm transition-all">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-zinc-900 truncate">{order.product_title}</p>
                                                <p className="text-xs text-zinc-400 mt-0.5">
                                                    {new Date(order.created_at).toLocaleDateString('en-US', {
                                                        month: 'short', day: 'numeric', year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="font-black text-zinc-900">
                                                    {Number(order.product_price).toLocaleString()} <span className="text-xs font-normal text-zinc-400">RWF</span>
                                                </p>
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'PAID' ? 'bg-blue-100 text-blue-700' :
                                                        order.status === 'SHIPPED' ? 'bg-violet-100 text-violet-700' :
                                                            order.status === 'AWAITING_CONFIRMATION' ? 'bg-orange-100 text-orange-700' :
                                                                order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                                                    'bg-amber-100 text-amber-700'
                                                    }`}>
                                                    {order.status === 'AWAITING_CONFIRMATION' ? 'Payment Submitted' : order.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Payment info */}
                                        {order.status === 'AWAITING_CONFIRMATION' && (
                                            <div className="mt-3 pt-3 border-t border-zinc-100 bg-amber-50 rounded-xl p-3">
                                                <p className="text-xs text-amber-700 font-medium">
                                                    ⏳ Buyer submitted payment — waiting for admin confirmation
                                                </p>
                                            </div>
                                        )}

                                        {order.status === 'PAID' && (
                                            <div className="mt-3 pt-3 border-t border-zinc-100 bg-blue-50 rounded-xl p-3">
                                                <p className="text-xs text-blue-700 font-medium">
                                                    ✅ Payment confirmed — please ship within 2 business days
                                                </p>
                                            </div>
                                        )}

                                        {/* COD — seller confirms cash received */}
                                        {order.payment_method === 'COD' && order.status === 'PENDING' && order.agreement_signed && (
                                            <div className="mt-3 pt-3 border-t border-zinc-100">
                                                <p className="text-xs text-zinc-500 mb-2">
                                                    💵 Cash on Delivery — confirm when buyer pays you in cash
                                                </p>
                                                <button
                                                    onClick={() => confirmCash.mutate(order.id)}
                                                    disabled={confirmCash.isPending}
                                                    className="w-full text-xs bg-green-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                                >
                                                    {confirmCash.isPending ? 'Confirming...' : '✓ Confirm Cash Received'}
                                                </button>
                                            </div>
                                        )}

                                        {order.status === 'DELIVERED' && (
                                            <div className="mt-3 pt-3 border-t border-zinc-100">
                                                <p className="text-xs text-green-600 font-semibold">
                                                    💰 You receive: {Number(order.seller_amount || order.product_price * 0.9).toLocaleString()} RWF
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </section>

                {/* Orders */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base font-bold text-zinc-900">My Orders</h2>
                        {orders.length > 0 && (
                            <span className="text-xs text-zinc-400">{orders.length} total</span>
                        )}
                    </div>

                    {loadingOrders && (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-2xl border border-zinc-100 p-4 animate-pulse h-20" />
                            ))}
                        </div>
                    )}

                    {!loadingOrders && orders.length === 0 && (
                        <div className="bg-white rounded-2xl border border-zinc-100 p-10 text-center">
                            <ShoppingCart className="h-10 w-10 text-zinc-200 mx-auto mb-3" />
                            <p className="text-zinc-500 font-medium">No orders yet</p>
                            <p className="text-zinc-400 text-sm mt-1">Browse products and place your first order</p>
                            <Link to="/products"
                                className="inline-flex items-center gap-2 mt-4 bg-zinc-900 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-zinc-700 transition-all">
                                <Search className="h-4 w-4" /> Browse Products
                            </Link>
                        </div>
                    )}

                    <div className="space-y-3">
                        {orders.map((order: any) => (
                            <Link key={order.id} to={`/orders/${order.id}`}
                                className="bg-white rounded-2xl border border-zinc-100 p-4 flex items-center gap-4 hover:shadow-sm hover:border-zinc-200 transition-all block">
                                <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <ShoppingCart className="h-5 w-5 text-zinc-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-zinc-900 truncate">{order.product_title}</p>
                                    <p className="text-xs text-zinc-400 mt-0.5">
                                        {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="font-bold text-zinc-900 text-sm">
                                        {Number(order.product_price).toLocaleString()} <span className="text-xs font-normal text-zinc-400">RWF</span>
                                    </p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold mt-1 ${ORDER_STATUS_STYLE[order.status] || 'bg-zinc-100 text-zinc-600'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <ArrowRight className="h-4 w-4 text-zinc-300 flex-shrink-0" />
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}