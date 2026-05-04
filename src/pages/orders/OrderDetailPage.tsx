import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    CheckCircle, Clock, Truck, Package, XCircle,
    FileText, ArrowLeft, Copy, AlertCircle, Phone
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/context/AuthContext'
import api from '@/api/axios'

export default function OrderDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { user } = useAuth()
    const qc = useQueryClient()
    const [paymentRef, setPaymentRef] = useState('')
    const [showAgreement, setShowAgreement] = useState(false)
    const [copied, setCopied] = useState(false)

    const { data: order, isLoading } = useQuery({
        queryKey: ['order', id],
        queryFn: async () => (await api.get(`/orders/${id}`)).data.data,
        enabled: !!id,
        refetchInterval: 30_000,
    })

    const signMutation = useMutation({
        mutationFn: () => api.post(`/orders/${id}/sign`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['order', id] }),
    })

    const paymentMutation = useMutation({
        mutationFn: () => api.post(`/orders/${id}/payment-proof`, { payment_reference: paymentRef }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['order', id] })
            setPaymentRef('')
        },
    })

    const markShippedMutation = useMutation({
        mutationFn: () => api.post(`/orders/${id}/mark-shipped`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['order', id] }),
    })

    const confirmReceivedMutation = useMutation({
        mutationFn: () => api.post(`/orders/${id}/confirm-received`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['order', id] }),
    })

    const cancelMutation = useMutation({
        mutationFn: () => api.post(`/orders/${id}/cancel`),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['order', id] }),
    })

    const copyOrderId = () => {
        navigator.clipboard.writeText(order?.id?.slice(0, 8).toUpperCase())
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (isLoading) return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />
            <div className="max-w-lg mx-auto px-4 py-12 space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-2xl border border-zinc-100 h-28 animate-pulse" />
                ))}
            </div>
        </div>
    )

    if (!order) return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />
            <div className="max-w-lg mx-auto px-4 py-12 text-center">
                <p className="text-zinc-500">Order not found.</p>
                <Link to="/dashboard" className="text-brand-600 hover:underline mt-2 block">Back to dashboard</Link>
            </div>
        </div>
    )

    const isMobileMoney = order.payment_method === 'MOBILE_MONEY' || order.payment_method === 'MOMO'
    const isCOD = order.payment_method === 'COD'
    const isBuyer = order.user_id === user?.id
    const isSeller = order.seller_id === user?.id
    const buyerSigned = !!order.buyer_signed_at
    const awaitingConfirmation = order.status === 'AWAITING_CONFIRMATION'
    const isPaid = ['PAID', 'SHIPPED', 'DELIVERED'].includes(order.status)
    const isShipped = ['SHIPPED', 'DELIVERED'].includes(order.status)
    const isDelivered = order.status === 'DELIVERED'
    const isCancelled = order.status === 'CANCELLED'

    const STEPS = isMobileMoney ? [
        { label: 'Order Placed', done: true },
        { label: 'Agreement Signed', done: buyerSigned },
        { label: 'Payment Submitted', done: awaitingConfirmation || isPaid },
        { label: 'Payment Confirmed', done: isPaid },
        { label: 'Seller Shipped', done: isShipped },
        { label: 'Delivered', done: isDelivered },
    ] : [
        { label: 'Order Placed', done: true },
        { label: 'Agreement Signed', done: buyerSigned },
        { label: 'Seller Shipped', done: isShipped },
        { label: 'Delivered', done: isDelivered },
    ]

    const currentStep = STEPS.filter(s => s.done).length - 1

    return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />

            <div className="max-w-lg mx-auto px-4 py-8 space-y-5">

                <Link to="/dashboard"
                    className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 transition-colors w-fit">
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                </Link>

                {/* Order Header */}
                <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                    <div className="flex items-start justify-between mb-5">
                        <div>
                            <p className="text-xs text-zinc-400 uppercase tracking-wide font-medium mb-1">Order</p>
                            <div className="flex items-center gap-2">
                                <p className="font-mono font-black text-zinc-900 text-xl">
                                    #{order.id?.slice(0, 8).toUpperCase()}
                                </p>
                                <button onClick={copyOrderId}
                                    className="p-1.5 text-zinc-300 hover:text-zinc-600 rounded-lg hover:bg-zinc-50 transition-all">
                                    <Copy className="h-3.5 w-3.5" />
                                </button>
                                {copied && <span className="text-xs text-green-600 font-semibold">Copied!</span>}
                            </div>
                            <p className="text-xs text-zinc-400 mt-1">
                                {new Date(order.created_at).toLocaleDateString('en-US', {
                                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                })}
                            </p>
                        </div>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${isDelivered ? 'bg-green-100 text-green-700' :
                            isCancelled ? 'bg-red-100 text-red-700' :
                                isShipped ? 'bg-violet-100 text-violet-700' :
                                    isPaid ? 'bg-blue-100 text-blue-700' :
                                        awaitingConfirmation ? 'bg-orange-100 text-orange-700' :
                                            'bg-amber-100 text-amber-700'
                            }`}>
                            {isCancelled ? 'Cancelled' :
                                isDelivered ? 'Delivered' :
                                    isShipped ? 'Shipped' :
                                        isPaid ? 'Paid' :
                                            awaitingConfirmation ? 'Awaiting Confirmation' :
                                                'Pending'}
                        </span>
                    </div>

                    {/* Product */}
                    <div className="flex items-center gap-4 pt-5 border-t border-zinc-100">
                        <div className="w-16 h-16 bg-zinc-100 rounded-xl overflow-hidden flex-shrink-0">
                            {order.product_images?.[0] && (
                                <img src={order.product_images[0]} alt={order.product_title}
                                    className="w-full h-full object-cover" loading="lazy" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-zinc-900 truncate">{order.product_title}</p>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                {isMobileMoney ? '📱 Mobile Money' : '💵 Cash on Delivery'}
                            </p>
                            <p className="text-xs mt-1">
                                {isBuyer && <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">You're the Buyer</span>}
                                {isSeller && <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">You're the Seller</span>}
                            </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className="font-black text-zinc-900 text-lg">
                                {Number(order.product_price).toLocaleString()}
                            </p>
                            <p className="text-xs text-zinc-400">RWF</p>
                        </div>
                    </div>
                </div>

                {/* Cancelled */}
                {isCancelled && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-center gap-3">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-red-700">Order Cancelled</p>
                            <p className="text-xs text-red-500 mt-0.5">This order has been cancelled. Stock has been restored.</p>
                        </div>
                    </div>
                )}

                {/* Progress */}
                {!isCancelled && (
                    <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                        <h2 className="font-bold text-zinc-900 mb-5">Order Progress</h2>
                        <div className="space-y-3">
                            {STEPS.map((step, i) => (
                                <div key={step.label} className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${step.done ? 'bg-zinc-900 text-white' :
                                        i === currentStep + 1 ? 'bg-zinc-100 text-zinc-400 ring-2 ring-zinc-200' :
                                            'bg-zinc-50 text-zinc-300'
                                        }`}>
                                        {step.done ? <CheckCircle className="h-4 w-4" /> : i + 1}
                                    </div>
                                    <p className={`text-sm font-medium flex-1 ${step.done ? 'text-zinc-900' : 'text-zinc-400'}`}>
                                        {step.label}
                                    </p>
                                    {step.done && i === currentStep && (
                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                    )}
                                    {!step.done && i === currentStep + 1 && (
                                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── BUYER ACTIONS ── */}

                {/* Cancel Order — only when PENDING and not yet signed */}
                {isBuyer && order.status === 'PENDING' && !buyerSigned && !isCancelled && (
                    <div className="bg-white rounded-2xl border border-red-100 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-zinc-900 text-sm">Want to cancel?</p>
                                <p className="text-xs text-zinc-400 mt-0.5">Only possible before signing the agreement.</p>
                            </div>
                            <button
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to cancel this order?')) {
                                        cancelMutation.mutate()
                                    }
                                }}
                                disabled={cancelMutation.isPending}
                                className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center gap-2 flex-shrink-0"
                            >
                                <XCircle className="h-4 w-4" />
                                {cancelMutation.isPending ? 'Cancelling...' : 'Cancel Order'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Sign Agreement */}
                {isBuyer && !buyerSigned && !isCancelled && (
                    <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
                                <FileText className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-zinc-900">Sign Purchase Agreement</h2>
                                <p className="text-xs text-zinc-400">Required before payment</p>
                            </div>
                        </div>
                        {order.agreement_text && (
                            <button
                                onClick={() => setShowAgreement(!showAgreement)}
                                className="text-xs text-zinc-500 hover:text-zinc-900 underline mb-3 block"
                            >
                                {showAgreement ? 'Hide agreement' : 'Read agreement'}
                            </button>
                        )}
                        {showAgreement && (
                            <pre className="text-xs text-zinc-600 bg-zinc-50 rounded-xl p-4 whitespace-pre-wrap font-mono leading-relaxed mb-4 max-h-44 overflow-y-auto border border-zinc-100">
                                {order.agreement_text}
                            </pre>
                        )}
                        <button
                            onClick={() => signMutation.mutate()}
                            disabled={signMutation.isPending}
                            className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 text-sm"
                        >
                            {signMutation.isPending ? 'Signing...' : 'I Agree — Sign Agreement'}
                        </button>
                    </div>
                )}

                {/* Agreement signed */}
                {isBuyer && buyerSigned && !isPaid && !awaitingConfirmation && (
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-green-800">Agreement Signed</p>
                            <p className="text-xs text-green-600 mt-0.5">
                                Signed on {new Date(order.buyer_signed_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                )}

                {/* Mobile Money payment */}
                {isBuyer && buyerSigned && isMobileMoney && order.status === 'PENDING' && (
                    <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                        <h2 className="font-bold text-zinc-900 mb-1">Pay via Mobile Money</h2>
                        <p className="text-sm text-zinc-500 mb-5">
                            Send exactly <span className="font-black text-zinc-900">
                                {Number(order.product_price).toLocaleString()} RWF
                            </span> to:
                        </p>
                        <div className="bg-zinc-900 rounded-xl p-5 mb-5 text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <Phone className="h-4 w-4 text-zinc-400" />
                                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide">MTN Mobile Money</p>
                            </div>
                            <p className="text-3xl font-black text-white tracking-widest mt-1">0784 559 922</p>
                            <p className="text-xs text-zinc-500 mt-2">Name: FashaMarket Rwanda</p>
                        </div>
                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-5 flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-700">
                                After sending, enter the <strong>Transaction ID</strong> from your MoMo SMS below.
                                Admin will verify within 24 hours.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-semibold text-zinc-700 block mb-1.5">
                                    MoMo Transaction ID
                                </label>
                                <input
                                    type="text"
                                    value={paymentRef}
                                    onChange={(e) => setPaymentRef(e.target.value)}
                                    placeholder="e.g. 1234567890"
                                    className="w-full px-3.5 py-2.5 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 bg-zinc-50 font-mono"
                                />
                            </div>
                            <button
                                onClick={() => paymentMutation.mutate()}
                                disabled={!paymentRef.trim() || paymentMutation.isPending}
                                className="w-full bg-zinc-900 hover:bg-zinc-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                            >
                                {paymentMutation.isPending ? 'Submitting...' : 'Submit Payment Reference'}
                            </button>
                        </div>
                    </div>
                )}

                {/* COD Info */}
                {isBuyer && buyerSigned && isCOD && order.status === 'PENDING' && (
                    <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                        <h2 className="font-bold text-zinc-900 mb-2">Cash on Delivery</h2>
                        <p className="text-sm text-zinc-500 mb-4">
                            You will pay <span className="font-black text-zinc-900">
                                {Number(order.product_price).toLocaleString()} RWF
                            </span> in cash when you receive the item.
                        </p>
                        <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 space-y-2 text-sm text-zinc-600">
                            <p>✅ Agreement signed — waiting for seller to ship</p>
                            <p>🚚 You'll be notified when your item is on the way</p>
                            <p>💵 Pay the delivery person upon receipt</p>
                            <p>📦 Confirm delivery on this page once received</p>
                        </div>
                    </div>
                )}

                {/* Awaiting payment confirmation */}
                {isBuyer && awaitingConfirmation && (
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                        <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-bold text-orange-800">Payment Under Review</h3>
                                <p className="text-sm text-orange-700 mt-1">
                                    Your transaction ID <span className="font-mono font-bold bg-orange-100 px-1.5 py-0.5 rounded">
                                        {order.payment_reference}
                                    </span> has been submitted. Our admin will verify within 24 hours.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payment confirmed waiting for ship */}
                {isBuyer && isPaid && !isShipped && (
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-blue-800">Payment Confirmed!</p>
                            <p className="text-xs text-blue-600 mt-0.5">
                                Seller has been notified and is preparing your item.
                            </p>
                        </div>
                    </div>
                )}

                {/* Item shipped */}
                {isBuyer && isShipped && !isDelivered && (
                    <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5 flex items-center gap-3">
                        <Truck className="h-5 w-5 text-violet-600 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-violet-800">Your Item is on the Way!</p>
                            <p className="text-xs text-violet-600 mt-0.5">Expected delivery in 1-2 business days.</p>
                        </div>
                    </div>
                )}

                {/* Confirm Received */}
                {isBuyer && isShipped && !isDelivered && (
                    <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                                <Package className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-zinc-900">Confirm Delivery</h2>
                                <p className="text-xs text-zinc-400">Only confirm after physically receiving your item</p>
                            </div>
                        </div>
                        <p className="text-sm text-zinc-500 mb-4">
                            Have you received your item in good condition? This action is final and releases payment to the seller.
                        </p>
                        <button
                            onClick={() => confirmReceivedMutation.mutate()}
                            disabled={confirmReceivedMutation.isPending}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                        >
                            <CheckCircle className="h-4 w-4" />
                            {confirmReceivedMutation.isPending ? 'Confirming...' : 'Yes, I Received My Item'}
                        </button>
                    </div>
                )}

                {/* ── SELLER ACTIONS ── */}

                {/* Waiting for payment */}
                {isSeller && !isPaid && !isCancelled && (
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex items-center gap-3">
                        <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-amber-800">Waiting for Payment</p>
                            <p className="text-xs text-amber-700 mt-0.5">
                                {awaitingConfirmation
                                    ? 'Buyer has submitted payment — admin is verifying.'
                                    : 'Waiting for buyer to complete payment.'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Mark as Shipped */}
                {isSeller && order.status === 'PAID' && (
                    <div className="bg-white rounded-2xl border border-zinc-100 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center">
                                <Truck className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-zinc-900">Mark as Shipped</h2>
                                <p className="text-xs text-zinc-400">Payment confirmed — ship the item within 2 business days</p>
                            </div>
                        </div>
                        <p className="text-sm text-zinc-500 mb-4">
                            Once you've handed the item to a courier or delivered it, tap below to notify the buyer.
                        </p>
                        <button
                            onClick={() => markShippedMutation.mutate()}
                            disabled={markShippedMutation.isPending}
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                        >
                            <Truck className="h-4 w-4" />
                            {markShippedMutation.isPending ? 'Updating...' : 'Item Shipped — Notify Buyer'}
                        </button>
                    </div>
                )}

                {/* Seller shipped waiting */}
                {isSeller && isShipped && !isDelivered && (
                    <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5 flex items-center gap-3">
                        <Truck className="h-5 w-5 text-violet-600 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-violet-800">Item Shipped</p>
                            <p className="text-xs text-violet-600 mt-0.5">
                                Waiting for buyer to confirm receipt.
                            </p>
                        </div>
                    </div>
                )}

                {/* Commission breakdown for seller */}
                {isSeller && isDelivered && order.commission_amount && (
                    <div className="bg-white rounded-2xl border border-zinc-100 p-5">
                        <h3 className="font-bold text-zinc-900 mb-3 text-sm">Payment Breakdown</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">Sale price</span>
                                <span className="font-semibold text-zinc-900">{Number(order.product_price).toLocaleString()} RWF</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">FashaMarket commission (10%)</span>
                                <span className="font-semibold text-red-500">- {Number(order.commission_amount).toLocaleString()} RWF</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2 border-t border-zinc-100">
                                <span className="font-bold text-zinc-900">You receive</span>
                                <span className="font-black text-green-600">{Number(order.seller_amount).toLocaleString()} RWF</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── DELIVERED ── */}
                {isDelivered && (
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
                        <Package className="h-12 w-12 text-green-500 mx-auto mb-3" />
                        <h3 className="font-black text-green-800 text-lg">Order Complete!</h3>
                        <p className="text-sm text-green-700 mt-1">
                            {isBuyer
                                ? 'You confirmed delivery. Thank you for shopping on FashaMarket!'
                                : 'Buyer confirmed delivery. Your payment will be processed shortly.'}
                        </p>
                        {isBuyer && (
                            <Link to="/products"
                                className="inline-flex items-center gap-2 mt-4 bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-green-700 transition-all">
                                Shop Again
                            </Link>
                        )}
                    </div>
                )}

                <Link to="/dashboard"
                    className="flex items-center justify-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 py-3 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 transition-all">
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                </Link>
            </div>
        </div>
    )
}