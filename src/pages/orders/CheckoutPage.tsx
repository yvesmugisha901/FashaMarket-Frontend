import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import Navbar from '@/components/Navbar'
import AgreementModal from '@/components/AgreementModal'
import { productsApi } from '@/api/products'
import { ordersApi } from '@/api/orders'
import type { PaymentMethod } from '@/types'

const AGREEMENT_TEMPLATE = (productTitle: string, price: number) => `
PURCHASE AGREEMENT — FashaMarket

Product: ${productTitle}
Price: ${price.toLocaleString()} RWF

By confirming this order, you (the Buyer) agree to the following:

1. PRODUCT CONDITION
   The product is sold in the condition described on the listing page. FashaMarket has verified the listing but is not responsible for undisclosed defects.

2. RETURN POLICY
   Returns are accepted within 48 hours of delivery if the product significantly differs from its description. The buyer must report the issue through the platform.

3. DELIVERY TIMELINE
   Delivery will be completed within 3 business days from order confirmation. A delivery agent will contact you via phone.

4. PAYMENT
   Payment is due at checkout (Mobile Money) or at delivery (Cash on Delivery). Failure to pay on delivery may result in account suspension.

5. DISPUTE RESOLUTION
   Any disputes must be raised through FashaMarket's support team within 72 hours of delivery.

By clicking "Confirm Order" you acknowledge that you have read and agree to these terms.
`.trim()

export default function CheckoutPage() {
    const { productId } = useParams<{ productId: string }>()
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD')
    const [showAgreement, setShowAgreement] = useState(false)
    const [orderId, setOrderId] = useState<string | null>(null)

    const { data: product, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => productsApi.getById(productId!),
        enabled: !!productId,
    })

    const createOrder = useMutation({
        mutationFn: ordersApi.create,
        onSuccess: (order) => {
            setOrderId(order.id)
            setShowAgreement(true)
        },
    })

    const signAgreement = useMutation({
        mutationFn: ordersApi.signAgreement,
        onSuccess: () => navigate(`/orders/${orderId}`),
    })

    if (isLoading) return <div className="flex h-screen items-center justify-center text-gray-400">Loading...</div>
    if (!product) return null

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-lg mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

                <div className="card p-6 space-y-6">
                    {/* Product summary */}
                    <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {product.images[0] && <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{product.title}</p>
                            <p className="text-sm text-gray-500">{product.seller_name}</p>
                            <p className="font-bold text-gray-900 mt-1">{Number(product.price).toLocaleString()} RWF</p>
                        </div>
                    </div>

                    {/* Payment method */}
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">Payment Method</p>
                        <div className="space-y-2">
                            {(['COD', 'MOBILE_MONEY'] as PaymentMethod[]).map((m) => (
                                <label key={m} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value={m}
                                        checked={paymentMethod === m}
                                        onChange={() => setPaymentMethod(m)}
                                        className="text-brand-600"
                                    />
                                    <span className="text-sm font-medium">
                                        {m === 'COD' ? 'Cash on Delivery' : 'Mobile Money (MTN / Airtel)'}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {createOrder.isError && (
                        <p className="text-sm text-red-500">Failed to place order. Try again.</p>
                    )}

                    <button
                        onClick={() => createOrder.mutate({ product_id: product.id, payment_method: paymentMethod })}
                        disabled={createOrder.isPending}
                        className="btn-primary w-full py-3"
                    >
                        {createOrder.isPending ? 'Processing...' : 'Proceed to Agreement'}
                    </button>
                </div>
            </div>

            {showAgreement && orderId && (
                <AgreementModal
                    agreementText={AGREEMENT_TEMPLATE(product.title, Number(product.price))}
                    onAccept={() => signAgreement.mutate(orderId)}
                    onDecline={() => {
                        setShowAgreement(false)
                        setOrderId(null)
                    }}
                    isLoading={signAgreement.isPending}
                />
            )}
        </div>
    )
}