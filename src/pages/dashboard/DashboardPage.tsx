import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Plus, Trash2, BadgeCheck, Clock, XCircle, CheckCircle, Search } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/context/AuthContext'
import { ordersApi } from '@/api/orders'
import { productsApi } from '@/api/products'

const STATUS_STYLE: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    APPROVED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
    SOLD: 'bg-gray-100 text-gray-600',
}

const STATUS_ICON: Record<string, React.ReactNode> = {
    PENDING: <Clock className="h-3.5 w-3.5" />,
    APPROVED: <CheckCircle className="h-3.5 w-3.5" />,
    REJECTED: <XCircle className="h-3.5 w-3.5" />,
    SOLD: <BadgeCheck className="h-3.5 w-3.5" />,
}

export default function DashboardPage() {
    const { user } = useAuth()
    const qc = useQueryClient()
    const isSeller = user?.role === 'SELLER'

    const { data: orders = [], isLoading: loadingOrders } = useQuery({
        queryKey: ['my-orders'],
        queryFn: ordersApi.myOrders,
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name}</p>
                    </div>
                    {isSeller ? (
                        <Link to="/sell" className="btn-primary flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            New Listing
                        </Link>
                    ) : (
                        <Link to="/products" className="btn-primary flex items-center gap-2">
                            <Search className="h-4 w-4" />
                            Browse Products
                        </Link>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="card p-4 text-center">
                        <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                        <p className="text-xs text-gray-500 mt-1">Total Orders</p>
                    </div>
                    <div className="card p-4 text-center">
                        <p className="text-2xl font-bold text-yellow-600">
                            {orders.filter((o: any) => o.status === 'PENDING').length}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Pending</p>
                    </div>
                    <div className="card p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">
                            {orders.filter((o: any) => o.status === 'SHIPPED').length}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Shipped</p>
                    </div>
                    <div className="card p-4 text-center">
                        <p className="text-2xl font-bold text-green-600">
                            {orders.filter((o: any) => o.status === 'DELIVERED').length}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Delivered</p>
                    </div>
                </div>
                {isSeller && (
                    <>
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-bold text-brand-600">{myProducts.length}</p>
                            <p className="text-xs text-gray-500 mt-1">My Listings</p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-bold text-yellow-600">
                                {myProducts.filter((p: any) => p.status === 'PENDING').length}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Pending Review</p>
                        </div>
                    </>
                )}
            </div>

            {/* Seller Listings */}
            {isSeller && (
                <section>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">My Listings</h2>

                    {loadingProducts && <p className="text-sm text-gray-400">Loading...</p>}

                    {!loadingProducts && myProducts.length === 0 && (
                        <div className="card p-8 text-center text-gray-400">
                            <p>No listings yet.</p>
                            <Link to="/sell" className="btn-primary mt-4 inline-block">
                                Create First Listing
                            </Link>
                        </div>
                    )}

                    <div className="space-y-3">
                        {myProducts.map((product: any) => (
                            <div key={product.id} className="card p-4 flex items-center gap-4">
                                {/* Image */}
                                <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {product.images?.[0] ? (
                                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                                            No img
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{product.title}</p>
                                    <p className="text-sm text-gray-500">{Number(product.price).toLocaleString()} RWF</p>
                                </div>

                                {/* Status badge */}
                                <span className={`badge flex items-center gap-1 ${STATUS_STYLE[product.status]}`}>
                                    {STATUS_ICON[product.status]}
                                    {product.status}
                                </span>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="text-xs text-brand-600 hover:underline"
                                    >
                                        View
                                    </Link>
                                    {product.status === 'PENDING' && (
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            disabled={deleteProduct.isPending}
                                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                            title="Delete listing"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* My Orders */}
            <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">My Orders</h2>

                {loadingOrders && <p className="text-sm text-gray-400">Loading...</p>}

                {!loadingOrders && orders.length === 0 && (
                    <div className="card p-8 text-center text-gray-400">
                        <p>No orders yet.</p>
                        <Link to="/products" className="btn-primary mt-4 inline-block">
                            Browse Products
                        </Link>
                    </div>
                )}

                <div className="space-y-3">
                    {orders.map((order: any) => (
                        <Link
                            key={order.id}
                            to={`/orders/${order.id}`}
                            className="card p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                        >
                            <div>
                                <p className="font-medium text-gray-900">{order.product_title}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                    {Number(order.product_price).toLocaleString()} RWF
                                </p>
                                <span className={`badge text-xs mt-1 ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                        order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' :
                                            'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>

    )
}