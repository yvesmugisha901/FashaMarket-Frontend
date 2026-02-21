import { Link } from 'react-router-dom'
import { BadgeCheck } from 'lucide-react'
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
    FAIR: 'bg-gray-100 text-gray-600',
}

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    return (
        <Link to={`/products/${product.id}`} className="card hover:shadow-md transition-shadow duration-150 block overflow-hidden group">
            {/* Image */}
            <div className="aspect-square bg-gray-100 overflow-hidden">
                {product.images[0] ? (
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No image
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">
                        {product.title}
                    </h3>
                    <span className={`badge whitespace-nowrap ${CONDITION_COLOR[product.condition]}`}>
                        {CONDITION_LABEL[product.condition]}
                    </span>
                </div>

                <p className="font-semibold text-gray-900">
                    {Number(product.price).toLocaleString()} RWF
                </p>

                <div className="flex items-center gap-1 text-xs text-gray-500">
                    {product.seller_verified && (
                        <BadgeCheck className="h-3.5 w-3.5 text-brand-500" />
                    )}
                    <span>{product.seller_name}</span>
                </div>
            </div>
        </Link>
    )
}