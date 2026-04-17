// frontend/src/pages/products/ProductDetailPage.tsx

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { BadgeCheck, ArrowLeft, ChevronLeft, ChevronRight, ShoppingCart, Check, Loader2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { productsApi } from '@/api/products'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import ReviewSection from '@/components/ReviewSection'
import SEO from '@/components/SEO'

const CONDITION_LABEL: Record<string, { label: string; color: string }> = {
    NEW: { label: 'New', color: 'bg-green-100 text-green-700' },
    LIKE_NEW: { label: 'Like New', color: 'bg-blue-100 text-blue-700' },
    GOOD: { label: 'Good', color: 'bg-amber-100 text-amber-700' },
    FAIR: { label: 'Fair', color: 'bg-zinc-100 text-zinc-600' },
}

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { isAuthenticated, user } = useAuth()
    const { isInCart, addToCart, removeFromCart } = useCart()
    const [imgIndex, setImgIndex] = useState(0)
    const [cartLoading, setCartLoading] = useState(false)

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['product', id],
        queryFn: () => productsApi.getById(id!),
        enabled: !!id,
    })

    if (isLoading) return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="aspect-square bg-zinc-100 rounded-2xl animate-pulse" />
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-8 bg-zinc-100 rounded-xl animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    if (isError || !product) return (
        <div className="min-h-screen bg-zinc-50">
            <Navbar />
            <div className="flex items-center justify-center h-64">
                <p className="text-red-500">Product not found.</p>
            </div>
        </div>
    )

    const images = product.images?.length ? product.images : []
    const condition = CONDITION_LABEL[product.condition] || { label: product.condition, color: 'bg-zinc-100 text-zinc-600' }

    const isOwnProduct = user?.role === 'SELLER' && product.seller_id === user?.id
    const isSeller = user?.role === 'SELLER'
    const isBuyer = isAuthenticated && !isSeller
    const inCart = isInCart(product.id)

    const handleCartClick = async () => {
        setCartLoading(true)
        try {
            if (inCart) {
                await removeFromCart(product.id)
            } else {
                await addToCart(product.id)
            }
        } finally {
            setCartLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50">
            <SEO
                title={product.title}
                description={`${product.title} — ${product.condition} condition. ${product.description?.slice(0, 120)}. Buy now on FashaMarket Rwanda.`}
                image={product.images?.[0]}
                url={`https://fashamarket.rw/products/${product.id}`}
                type="product"
                price={product.price}
                keywords={`${product.title}, buy ${product.category_name} Rwanda, second hand ${product.category_name} Kigali`}
            />
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-8">
                <Link to="/products"
                    className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to products
                </Link>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Images */}
                    <div className="space-y-3">
                        <div className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden relative group">
                            {images[imgIndex] ? (
                                <img
                                    src={images[imgIndex]}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-300 text-sm">
                                    No image
                                </div>
                            )}

                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setImgIndex(i => Math.max(0, i - 1))}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setImgIndex(i => Math.min(images.length - 1, i + 1))}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="flex gap-2">
                                {images.map((img: string, i: number) => (
                                    <button
                                        key={img}
                                        onClick={() => setImgIndex(i)}
                                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === imgIndex ? 'border-zinc-900' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-5">
                        <div>
                            <span className="text-xs text-zinc-400 uppercase tracking-widest font-medium">
                                {product.category_name}
                            </span>
                            <h1 className="text-2xl font-black text-zinc-900 mt-1 tracking-tight">
                                {product.title}
                            </h1>
                        </div>

                        <p className="text-4xl font-black text-zinc-900">
                            {Number(product.price).toLocaleString()}
                            <span className="text-lg font-normal text-zinc-400 ml-1">RWF</span>
                        </p>

                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${condition.color}`}>
                                {condition.label}
                            </span>
                        </div>

                        {/* Seller */}
                        <div className="flex items-center gap-2 bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-3">
                            <div className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                                {product.seller_name?.[0]?.toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-zinc-900 truncate">{product.seller_name}</p>
                                <p className="text-xs text-zinc-400">Seller</p>
                            </div>
                            {product.seller_verified && (
                                <div className="flex items-center gap-1 text-xs text-brand-600 font-semibold flex-shrink-0">
                                    <BadgeCheck className="h-4 w-4" />
                                    Verified
                                </div>
                            )}
                        </div>

                        <p className="text-zinc-600 leading-relaxed text-sm">{product.description}</p>

                        {/* Action buttons */}
                        <div className="space-y-3">
                            {!isAuthenticated && (
                                <Link to="/login"
                                    className="bg-zinc-900 hover:bg-zinc-700 text-white font-semibold w-full py-3.5 rounded-xl transition-all text-sm text-center block">
                                    Log in to Buy
                                </Link>
                            )}

                            {isAuthenticated && isOwnProduct && (
                                <div className="bg-zinc-50 border border-zinc-200 rounded-xl py-3.5 text-center">
                                    <p className="text-sm text-zinc-500 font-medium">This is your listing</p>
                                </div>
                            )}

                            {isAuthenticated && isSeller && !isOwnProduct && (
                                <div className="bg-amber-50 border border-amber-100 rounded-xl py-3.5 text-center">
                                    <p className="text-sm text-amber-700 font-medium">
                                        Sellers cannot purchase products. Switch to a buyer account.
                                    </p>
                                </div>
                            )}

                            {isBuyer && (
                                <div className="flex gap-2">
                                    {/* Add to Cart */}
                                    <button
                                        onClick={handleCartClick}
                                        disabled={cartLoading}
                                        className={`flex items-center justify-center gap-2 flex-1 py-3.5 rounded-xl border font-semibold text-sm transition-all disabled:opacity-50 ${inCart
                                            ? 'border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-700'
                                            : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-900'
                                            }`}
                                    >
                                        {cartLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : inCart ? (
                                            <><Check className="h-4 w-4" /> In Cart</>
                                        ) : (
                                            <><ShoppingCart className="h-4 w-4" /> Add to Cart</>
                                        )}
                                    </button>

                                    {/* Buy Now */}
                                    <Link
                                        to={`/checkout/${product.id}`}
                                        className="flex items-center justify-center flex-1 bg-zinc-900 hover:bg-zinc-700 text-white font-bold py-3.5 rounded-xl transition-all text-sm"
                                    >
                                        Buy Now
                                    </Link>
                                </div>
                            )}

                            <p className="text-xs text-zinc-400 text-center">
                                A digital agreement will be required before your order is confirmed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="mt-12 max-w-2xl">
                    <ReviewSection productId={product.id} />
                </div>
            </div>
        </div>
    )
}