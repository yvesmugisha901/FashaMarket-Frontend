import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { BadgeCheck, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { productsApi } from '@/api/products'
import { useAuth } from '@/context/AuthContext'
import ReviewSection from '@/components/ReviewSection'

const CONDITION_LABEL: Record<string, string> = {
    NEW: 'New',
    LIKE_NEW: 'Like New',
    GOOD: 'Good',
    FAIR: 'Fair',
}

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { isAuthenticated } = useAuth()

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['product', id],
        queryFn: () => productsApi.getById(id!),
        enabled: !!id,
    })

    if (isLoading) return <div className="flex h-screen items-center justify-center text-gray-400">Loading...</div>
    if (isError || !product) return <div className="flex h-screen items-center justify-center text-red-500">Product not found.</div>

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-8">
                <Link to="/products" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6">
                    <ArrowLeft className="h-4 w-4" />
                    Back to products
                </Link>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                        {product.images[0] ? (
                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                        <div>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category_name}</span>
                            <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.title}</h1>
                        </div>

                        <p className="text-3xl font-bold text-gray-900">
                            {Number(product.price).toLocaleString()} <span className="text-lg font-normal text-gray-500">RWF</span>
                        </p>

                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="badge bg-gray-100 text-gray-600">
                                Condition: {CONDITION_LABEL[product.condition]}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            {product.seller_verified && <BadgeCheck className="h-4 w-4 text-brand-500" />}
                            <span>Sold by <strong>{product.seller_name}</strong></span>
                            {product.seller_verified && <span className="text-brand-600 text-xs font-medium">Verified Seller</span>}
                        </div>

                        <p className="text-gray-600 leading-relaxed">{product.description}</p>

                        {isAuthenticated ? (
                            <Link
                                to={`/checkout/${product.id}`}
                                className="btn-primary w-full py-3 text-center block"
                            >
                                Buy Now
                            </Link>
                        ) : (
                            <Link to="/login" className="btn-primary w-full py-3 text-center block">
                                Log in to Buy
                            </Link>
                        )}

                        <p className="text-xs text-gray-400 text-center">
                            A digital agreement will be required before your order is confirmed.
                        </p>
                        {/* Reviews */}
                        <div className="mt-12 max-w-2xl">
                            <ReviewSection productId={product.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}