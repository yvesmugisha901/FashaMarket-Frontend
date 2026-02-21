import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, Clock, Truck, Package, XCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { ordersApi } from '@/api/orders'
import type { OrderStatus } from '@/types'

const STATUS_STEPS: OrderStatus[] = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED']

const STATUS_ICON: Record<OrderStatus, React.ReactNode> = {
    PENDING: <Clock className="h-5 w-5" />,
    PAID: <CheckCircle2 className="h-5 w-5" />,
    SHIPPED: <Truck className="h-5 w-5" />,
    DELIVERED: <Package className="h-5 w-5" />,
    CANCELLED: <XCircle className="h-5 w-5" />,
}

export default function OrderDetailPage() {
    const { id } = useParams<{ id: string }>()

    const { data: order, isLoading } = useQuery({
        queryKey: ['order', id],
        queryFn: () => ordersApi.getById(id!),
        enabled: !!id,
        refetchInterval: 30_000, // refresh every 30s
    })

    if (isLoading) return <div className="flex h-screen items-center justify-center text-gray-400">Loading...</div>
    if (!order) return null

    const currentStep = STATUS_STEPS.indexOf(order.status as OrderStatus)

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-lg mx-auto px-4 py-10 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
                    <p className="text-sm text-gray-500 mt-1">Placed {new Date(order.created_at).toLocaleDateString()}</p>
                </div>

                {/* Status tracker */}
                {order.status !== 'CANCELLED' && (
                    <div className="card p-6">
                        <p className="text-sm font-medium text-gray-700 mb-4">Order Status</p>
                        <div className="flex items-center gap-0">
                            {STATUS_STEPS.map((step, i) => {
                                const done = i <= currentStep
                                return (
                                    <div key={step} className="flex items-center flex-1 last:flex-none">
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                      ${done ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                                        </div>
                                        <div className="text-xs text-center mt-1 absolute hidden">{step}</div>
                                        {i < STATUS_STEPS.length - 1 && (
                                            <div className={`flex-1 h-0.5 mx-1 ${i < currentStep ? 'bg-brand-600' : 'bg-gray-200'}`} />
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-between mt-2">
                            {STATUS_STEPS.map((step) => (
                                <span key={step} className="text-xs text-gray-500 capitalize">{step.toLowerCase()}</span>
                            ))}
                        </div>
                    </div>
                )}

                {order.status === 'CANCELLED' && (
                    <div className="card p-5 border-red-200 bg-red-50 flex items-center gap-3 text-red-600">
                        <XCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm font-medium">This order has been cancelled.</p>
                    </div>
                )}

                {/* Order details */}
                <div className="card p-6 space-y-3">
                    <h2 className="font-semibold text-gray-900">Order Details</h2>
                    <div className="text-sm space-y-2 text-gray-600">
                        <div className="flex justify-between">
                            <span>Product</span>
                            <span className="font-medium text-gray-900">{order.product_title}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Amount</span>
                            <span className="font-medium text-gray-900">{Number(order.product_price).toLocaleString()} RWF</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Payment</span>
                            <span>{order.payment_method === 'COD' ? 'Cash on Delivery' : 'Mobile Money'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Agreement</span>
                            <span className={order.agreement_signed ? 'text-brand-600 font-medium' : 'text-gray-400'}>
                                {order.agreement_signed ? 'Signed ✓' : 'Pending'}
                            </span>
                        </div>
                    </div>
                </div>

                <Link to="/dashboard" className="btn-secondary w-full py-2.5 text-center block">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    )
}