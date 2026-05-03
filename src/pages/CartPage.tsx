// frontend/src/pages/CartPage.tsx

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    ShoppingCart, Trash2, ArrowRight, Package,
    BadgeCheck, Loader2, ShoppingBag,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import { useCart } from '@/context/CartContext'
import { useMutation } from '@tanstack/react-query'
import { ordersApi } from '@/api/orders'
import type { PaymentMethod } from '@/types'

const CONDITION_COLOR: Record<string, string> = {
    NEW: 'bg-green-100 text-green-700',
    LIKE_NEW: 'bg-blue-100 text-blue-700',
    GOOD: 'bg-yellow-100 text-yellow-700',
    FAIR: 'bg-zinc-100 text-zinc-600',
}

const CONDITION_LABEL: Record<string, string> = {
    NEW: 'New',
    LIKE_NEW: 'Like New',
    GOOD: 'Good',
    FAIR: 'Fair',
}

export default function CartPage() {
    const { items, loading, removeFromCart, clearCart, count } = useCart()
    const navigate = useNavigate()
    const [removingId, setRemovingId] = useState<string | null>(null)
    const [orderingId, setOrderingId] = useState<string | null>(null)
    const [paymentMethod, setPaymentMethod] = useState<Record<string, PaymentMethod>>({})

    const handleRemove = async (product_id: string) => {
        setRemovingId(product_id)
        await removeFromCart(product_id)
        setRemovingId(null)
    }

    const orderMutation = useMutation({
        mutationFn: ({ product_id, method }: { product_id: string; method: PaymentMethod }) =>
            ordersApi.create({ product_id, payment_method: method }),
        onSuccess: (data, vars) => {
            removeFromCart(vars.product_id)
            navigate(`/orders/${data.id}`)
        },
    })

    const handleOrder = async (product_id: string) => {
        const method: PaymentMethod = paymentMethod[product_id] || 'MOMO'
        setOrderingId(product_id)
        try {
            await orderMutation.mutateAsync({ product_id, method })
        } finally {
            setOrderingId(null)
        }
    }

    // ✅ Only count orderable items in the total (exclude sold out)
    const orderableItems = items.filter(
        (i) => i.product_status !== 'SOLD' && (i.stock_quantity ?? 1) > 0
    )
    const soldOutItems = items.filter(
        (i) => i.product_status === 'SOLD' || (i.stock_quantity ?? 1) <= 0
    )
    const total = orderableItems.reduce((sum, i) => sum + Number(i.price), 0)

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50">
                <Navbar />
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-10">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-zinc-900 text-white p-2 rounded-xl">
                            <ShoppingCart className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Your Cart</h1>
                            <p className="text-sm text-zinc-500">
                                {count === 0
                                    ? 'No items'
                                    : `${count} item${count > 1 ? 's' : ''} saved`}
                            </p>
                        </div>
                    </div>

                    {count > 0 && (
                        <button
                            onClick={clearCart}
                            className="text-xs text-zinc-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                            Clear all
                        </button>
                    )}
                </div>

                {/* ✅ Sold-out warning banner — shows when any cart item is unavailable */}
                {soldOutItems.length > 0 && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-4 flex items-start gap-3">
                        <span className="text-red-500 text-lg leading-none">⚠️</span>
                        <div>
                            <p className="text-sm font-semibold text-red-800">
                                {soldOutItems.length} item{soldOutItems.length > 1 ? 's' : ''} in your cart{' '}
                                {soldOutItems.length > 1 ? 'are' : 'is'} no longer available
                            </p>
                            <p className="text-xs text-red-600 mt-0.5">
                                These items have been sold. Remove them to keep your cart clean.
                            </p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {count === 0 && (
                    <div className="bg-white rounded-2xl border border-zinc-100 p-16 text-center">
                        <ShoppingBag className="h-12 w-12 text-zinc-200 mx-auto mb-4" />
                        <h2 className="text-lg font-semibold text-zinc-900 mb-1">Your cart is empty</h2>
                        <p className="text-sm text-zinc-400 mb-6">
                            Browse products and tap the cart icon to save items here.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-zinc-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-zinc-700 transition-colors"
                        >
                            Browse Products
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                )}

                {/* Cart Items */}
                {count > 0 && (
                    <div className="space-y-4">
                        {items.map((item) => {
                            // ✅ Out of stock = status SOLD OR stock_quantity is 0
                            const isOutOfStock =
                                item.product_status === 'SOLD' ||
                                (item.stock_quantity !== undefined && item.stock_quantity <= 0)

                            // ✅ Low stock warning (3 or fewer left)
                            const isLowStock =
                                !isOutOfStock &&
                                item.stock_quantity !== undefined &&
                                item.stock_quantity <= 3

                            const isOrdering = orderingId === item.product_id
                            const isRemoving = removingId === item.product_id

                            return (
                                <div
                                    key={item.cart_item_id}
                                    className={`bg-white rounded-2xl border p-4 transition-all ${isOutOfStock
                                        ? 'border-red-100 bg-red-50/30 opacity-75'
                                        : 'border-zinc-100'
                                        }`}
                                >
                                    <div className="flex gap-4">
                                        {/* Image */}
                                        <Link
                                            to={`/products/${item.product_id}`}
                                            className="flex-shrink-0"
                                        >
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-100">
                                                {item.images[0] ? (
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.title}
                                                        className={`w-full h-full object-cover ${isOutOfStock ? 'grayscale' : ''
                                                            }`}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Package className="h-6 w-6 text-zinc-300" />
                                                    </div>
                                                )}

                                                {/* ✅ Sold Out overlay on image */}
                                                {isOutOfStock && (
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
                                                        <span className="text-white text-[9px] font-black uppercase tracking-wider text-center leading-tight px-1">
                                                            Sold Out
                                                        </span>
                                                    </div>
                                                )}

                                                {/* ✅ Low stock badge on image */}
                                                {isLowStock && (
                                                    <div className="absolute top-1 left-1 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                                                        {item.stock_quantity} left
                                                    </div>
                                                )}
                                            </div>
                                        </Link>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <Link
                                                    to={`/products/${item.product_id}`}
                                                    className="font-semibold text-sm text-zinc-900 hover:underline line-clamp-2 leading-tight"
                                                >
                                                    {item.title}
                                                </Link>
                                                <button
                                                    onClick={() => handleRemove(item.product_id)}
                                                    disabled={isRemoving}
                                                    className="text-zinc-300 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
                                                >
                                                    {isRemoving ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Trash2 className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>

                                            <div className="flex items-center gap-2 mt-1.5">
                                                <span
                                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CONDITION_COLOR[item.condition]
                                                        }`}
                                                >
                                                    {CONDITION_LABEL[item.condition]}
                                                </span>
                                                <span className="text-xs text-zinc-400 truncate flex items-center gap-1">
                                                    {item.seller_verified && (
                                                        <BadgeCheck className="h-3 w-3 text-blue-500" />
                                                    )}
                                                    {item.seller_name}
                                                </span>
                                            </div>

                                            <p className="font-bold text-zinc-900 mt-1.5">
                                                {Number(item.price).toLocaleString()} RWF
                                            </p>

                                            {/* ✅ Sold out state — show message + remove prompt */}
                                            {isOutOfStock ? (
                                                <div className="mt-2 flex items-center justify-between gap-2">
                                                    <p className="text-xs text-red-500 font-semibold">
                                                        ✕ No longer available
                                                    </p>
                                                    <button
                                                        onClick={() => handleRemove(item.product_id)}
                                                        disabled={isRemoving}
                                                        className="text-xs text-red-400 hover:text-red-600 font-semibold underline transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    {/* ✅ Low stock warning text */}
                                                    {isLowStock && (
                                                        <p className="text-xs text-amber-600 font-semibold mt-1.5">
                                                            ⚠️ Only {item.stock_quantity} remaining — order soon!
                                                        </p>
                                                    )}

                                                    {/* Payment method + Order button */}
                                                    <div className="flex items-center gap-2 mt-3">
                                                        <select
                                                            value={paymentMethod[item.product_id] || 'MOMO'}
                                                            onChange={(e) =>
                                                                setPaymentMethod((prev) => ({
                                                                    ...prev,
                                                                    [item.product_id]: e.target
                                                                        .value as PaymentMethod,
                                                                }))
                                                            }
                                                            className="text-xs border border-zinc-200 rounded-lg px-2 py-1.5 bg-zinc-50 text-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                                                        >
                                                            <option value="MOMO">Mobile Money</option>
                                                            <option value="BANK_TRANSFER">Bank Transfer</option>
                                                            <option value="COD">Cash on Delivery</option>
                                                            <option value="CARD">Card</option>
                                                        </select>

                                                        <button
                                                            onClick={() => handleOrder(item.product_id)}
                                                            disabled={isOrdering}
                                                            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                                                        >
                                                            {isOrdering ? (
                                                                <>
                                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                                    Ordering...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <ArrowRight className="h-3.5 w-3.5" />
                                                                    Order Now
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        {/* ✅ Total — only counts orderable items */}
                        <div className="bg-white rounded-2xl border border-zinc-100 p-5">
                            <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-zinc-500">
                                    Subtotal ({orderableItems.length} orderable item
                                    {orderableItems.length !== 1 ? 's' : ''})
                                </span>
                                <span className="font-black text-zinc-900 text-lg">
                                    {total.toLocaleString()} RWF
                                </span>
                            </div>
                            {soldOutItems.length > 0 && (
                                <p className="text-xs text-red-400 mt-1">
                                    {soldOutItems.length} sold-out item
                                    {soldOutItems.length > 1 ? 's' : ''} excluded from total
                                </p>
                            )}
                            <p className="text-xs text-zinc-400 mt-2">
                                Each item is ordered individually. Select payment method per item above.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}