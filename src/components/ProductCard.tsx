import { Link } from 'react-router-dom'
import { BadgeCheck, Package } from 'lucide-react'
import type { Product } from '@/types'

const CONDITION_LABEL: Record<Product['condition'], string> = {
    NEW: 'New',
    LIKE_NEW: 'Like New',
    GOOD: 'Good',
    FAIR: 'Fair',
}

const CONDITION_COLOR: Record<Product['condition'], string> = {
    NEW: 'bg-green-100 text-green-700',
    LIKE_NEW: 'bg-blue-100 text-blue-700',
    GOOD: 'bg-yellow-100 text-yellow-700',
    FAIR: 'bg-zinc-100 text-zinc-600',
}

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const isSoldOut = product.stock_quantity !== undefined && product.stock_quantity <= 0
    const isLowStock = product.stock_quantity !== undefined && product.stock_quantity > 0 && product.stock_quantity <= 3

    return (
        <Link
            to={`/products/${product.id}`}
            className={`bg-white rounded-2xl border overflow-hidden block group transition-all duration-200 ${isSoldOut
                ? 'border-zinc-100 opacity-60 cursor-pointer'
                : 'border-zinc-100 hover:border-zinc-200 hover:shadow-md'
                }`}
        >
            {/* Image */}
            <div className="aspect-square bg-zinc-100 overflow-hidden relative">
                {product.images[0] ? (
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className={`w-full h-full object-cover transition-transform duration-200 ${isSoldOut ? 'grayscale' : 'group-hover:scale-105'
                            }`}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">
                        No image
                    </div>
                )}

                {/* Sold Out overlay */}
                {isSoldOut && (
                    <div className="absolute inset-0 bg-zinc-900/50 flex items-center justify-center">
                        <span className="bg-white text-zinc-900 font-bold text-xs px-3 py-1.5 rounded-full tracking-wide uppercase">
                            Sold Out
                        </span>
                    </div>
                )}

                {/* Stock badge */}
                {!isSoldOut && product.stock_quantity !== undefined && (
                    <div className="absolute top-2 left-2">
                        {isLowStock ? (
                            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                Only {product.stock_quantity} left
                            </span>
                        ) : (
                            <span className="bg-zinc-900/70 text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Package className="h-2.5 w-2.5" />
                                {product.stock_quantity} in stock
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-3 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-medium text-sm leading-tight line-clamp-2 ${isSoldOut ? 'text-zinc-400' : 'text-zinc-900'
                        }`}>
                        {product.title}
                    </h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${isSoldOut ? 'bg-zinc-100 text-zinc-400' : CONDITION_COLOR[product.condition]
                        }`}>
                        {CONDITION_LABEL[product.condition]}
                    </span>
                </div>

                <p className={`font-bold text-sm ${isSoldOut ? 'text-zinc-400' : 'text-zinc-900'}`}>
                    {Number(product.price).toLocaleString()} RWF
                </p>

                <div className="flex items-center gap-1 text-xs text-zinc-400">
                    {product.seller_verified && (
                        <BadgeCheck className="h-3.5 w-3.5 text-brand-500 flex-shrink-0" />
                    )}
                    <span className="truncate">{product.seller_name}</span>
                </div>
            </div>
        </Link>
    )
}